import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import { BoardColumn, BoardContainer } from "./BoardColumn";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { TaskCard } from "./TaskCard";
import { hasDraggableData } from "./utils";
import {
  getTasksRequest,
  updateTaskRequest,
  updateTaskOptimistic,
  clearOlderList,
} from "@/sagas/task/taskSlice";
import { DEFAULT_COLUMNS } from "@/constants/status";
import { useKanbanSensors } from "./hooks/useKanbanSensors";
import { useKanbanPreview } from "./hooks/useKanbanPreview";
import { useKanbanDnD } from "./hooks/useKanbanDnD";
// ----- Small utilities (local to this file for clarity) -----
const getTasksByStatus = (tasks) => {
  return tasks.reduce((group, task) => {
    const key = task.status;
    if (!group[key]) group[key] = [];
    group[key].push(task);
    return group;
  }, {});
};

const getTargetColumnTasks = (tasks, status, excludeId) => {
  return tasks
    .filter((t) => t.status === status && t.id !== excludeId)
    .sort((a, b) => a.index - b.index);
};

export function KanbanBoard({ onEditTask }) {
  const dispatch = useDispatch();
  const { list: tasks } = useSelector((state) => state.task);
  const columnsId = useMemo(() => DEFAULT_COLUMNS.map((col) => col.id), []);

  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const sensors = useKanbanSensors();
  const {
    previewOverride,
    setPreviewOverride,
    lastAppliedRef,
    tasksWithPreview,
    schedule,
    pendingEventRef,
    rafIdRef,
  } = useKanbanPreview(tasks);

  const tasksByStatus = useMemo(
    () => getTasksByStatus(tasksWithPreview),
    [tasksWithPreview]
  );

  const {
    onDragStart: onDragStartDnD,
    onDragEnd: onDragEndDnD,
    handleDragOver: handleDragOverDnD,
  } = useKanbanDnD({
    tasks,
    dispatch,
    previewOverride,
    setPreviewOverride,
    lastAppliedRef,
  });

  // Fetch tasks on component mount
  useEffect(() => {
    dispatch(getTasksRequest());
  }, []);

  const onDragStart = useCallback(
    (event) => {
      onDragStartDnD(event);
      if (!hasDraggableData(event.active)) return;
      const data = event.active.data.current;
      if (data?.type === "Column") {
        setActiveColumn(data.column);
        return;
      }
      if (data?.type === "Task") {
        setActiveTask(data.task);
        return;
      }
    },
    [onDragStartDnD]
  );

  const onDragOver = useCallback(
    (event) => {
      pendingEventRef.current = event;
      if (rafIdRef.current != null) return;
      // Schedule once per frame
      schedule(() => {
        const pending = pendingEventRef.current;
        pendingEventRef.current = null;
        if (pending) handleDragOverDnD(pending);
      });
    },
    [handleDragOverDnD, schedule, pendingEventRef, rafIdRef]
  );

  // preview cleanup moved inside useKanbanPreview

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEndDnD}
      onDragOver={onDragOver}
    >
      <BoardContainer>
        <SortableContext items={columnsId}>
          {DEFAULT_COLUMNS.length
            ? DEFAULT_COLUMNS.map((col) => (
                <BoardColumn
                  key={col.id}
                  column={col}
                  tasks={tasksByStatus[col.id] || []}
                  onEditTask={onEditTask}
                />
              ))
            : null}
        </SortableContext>
      </BoardContainer>

      {"document" in window &&
        createPortal(
          <DragOverlay>
            {activeColumn && (
              <BoardColumn
                isOverlay
                column={activeColumn}
                tasks={tasksByStatus[activeColumn.id] || []}
              />
            )}
            {activeTask && <TaskCard task={activeTask} isOverlay />}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );

  function onDragStart(event) {
    if (!hasDraggableData(event.active)) return;
    const data = event.active.data.current;
    if (data?.type === "Column") {
      setActiveColumn(data.column);
      return;
    }

    if (data?.type === "Task") {
      setActiveTask(data.task);
      return;
    }
  }

  function onDragEnd(event) {
    const { active, over } = event;
    if (!over) {
      return;
    }

    if (!hasDraggableData(active)) {
      return;
    }

    const activeData = active.data.current;

    // Handle Task dragging
    if (activeData?.type === "Task") {
      if (olderList && olderList.length > 0) {
        const movedTask = tasks.find((task) => {
          const originalTask = olderList.find((t) => t.id === task.id);
          return (
            originalTask &&
            (originalTask.status !== task.status ||
              originalTask.index !== task.index)
          );
        });

        if (movedTask) {
          // Call API to persist the changes
          dispatch(
            updateTaskRequest({
              values: movedTask,
              meta: {
                callback: () => {
                  dispatch(clearOlderList());
                  dispatch(getTasksRequest());
                },
              },
            })
          );
        }
      }
      setActiveColumn(null);
      setActiveTask(null);
    }
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) {
      return;
    }

    if (!hasDraggableData(active) || !hasDraggableData(over)) {
      return;
    }

    const activeData = active.data.current;
    const overData = over.data.current;

    const isActiveATask = activeData?.type === "Task";
    const isOverATask = overData?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      const activeTaskInStore = tasks.find((t) => t.id === activeId);
      const overTask = tasks.find((t) => t.id === overId);

      if (!activeTaskInStore || !overTask) {
        return;
      }

      // Use the original status from drag start to determine cross-column
      const originalActiveTask = active.data.current.task;
      const isCrossColumn = originalActiveTask.status !== overTask.status;

      // Build target column task list (sorted, excluding the active task)
      const targetColumnId = isCrossColumn
        ? overTask.status
        : activeTaskInStore.status;
      const targetColumnTasks = tasks
        .filter(
          (t) => t.status === targetColumnId && t.id !== activeTaskInStore.id
        )
        .sort((a, b) => a.index - b.index);

      const overPos = targetColumnTasks.findIndex((t) => t.id === overTask.id);

      // Decide placement relative to the over task
      let prevTask = null;
      let nextTask = null;

      if (!isCrossColumn && activeTaskInStore.index < overTask.index) {
        // Moving down within same column => place after overTask
        prevTask = overTask;
        nextTask = targetColumnTasks[overPos + 1] || null;
      } else {
        // Cross column, or moving up => place before overTask
        prevTask = targetColumnTasks[overPos - 1] || null;
        nextTask = overTask;
      }

      const newIndex = calculateNewIndex(prevTask, nextTask);
      const updatedTask = {
        ...activeTaskInStore,
        status: targetColumnId,
        index: newIndex,
      };

      // Guard against redundant dispatches on hover: only dispatch when something actually changes
      if (
        updatedTask.status !== activeTaskInStore.status ||
        updatedTask.index !== activeTaskInStore.index
      ) {
        dispatch(updateTaskOptimistic(updatedTask));
      }
    }

    const isOverAColumn = overData?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      const activeTaskInStore = tasks.find((t) => t.id === activeId);
      if (!activeTaskInStore) {
        return;
      }

      // Determine cross column using the original status from drag start
      const originalActiveTask = active.data.current.task;
      // Only proceed if target column actually differs from current store value
      if (originalActiveTask.status !== overId) {
        const targetColumnTasks = tasks
          .filter((t) => t.status === overId && t.id !== activeTaskInStore.id)
          .sort((a, b) => a.index - b.index);

        const prevTask =
          targetColumnTasks[targetColumnTasks.length - 1] || null;
        const nextTask = null;
        const newIndex = calculateNewIndex(prevTask, nextTask);

        const updatedTask = {
          ...activeTaskInStore,
          status: overId,
          index: newIndex,
        };
        if (
          updatedTask.status !== activeTaskInStore.status ||
          updatedTask.index !== activeTaskInStore.index
        ) {
          dispatch(updateTaskOptimistic(updatedTask));
        }
      }
    }
  }
}
