import { useMemo, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { BoardColumn, BoardContainer } from "./BoardColumn";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { TaskCard } from "./TaskCard";
import { hasDraggableData } from "./utils";
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
}
