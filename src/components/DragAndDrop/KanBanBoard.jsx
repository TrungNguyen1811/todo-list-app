import { useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import { BoardColumn, BoardContainer } from "./BoardColumn";
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  TouchSensor,
  MouseSensor,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { TaskCard } from "./TaskCard";
import { hasDraggableData, calculateNewIndex } from "./utils";
import { getTasksRequest, updateTaskRequest } from "@/sagas/task/taskSlice";

const defaultCols = [
  {
    id: "incomplete",
    title: "Incomplete",
  },
  {
    id: "inprogress",
    title: "In Progress",
  },
  {
    id: "completed",
    title: "Completed",
  },
];



export function KanbanBoard() {
  const dispatch = useDispatch();
  const { list: tasks, loading } = useSelector((state) => state.task);
  
  const [columns, setColumns] = useState(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    }),
  );

  // Fetch tasks on component mount
  useEffect(() => {
    dispatch(getTasksRequest());
  }, [dispatch]);



  // // Show loading state
  // if (loading) {
  //   return <div>Loading tasks...</div>;
  // }

  // Show empty state if no tasks
  if (!tasks || tasks.length === 0) {
    return <div>No tasks found. Please add some tasks.</div>;
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <BoardContainer>
        <SortableContext items={columnsId}>
          {columns.map((col) => (
            <BoardColumn
              key={col.id}
              column={col}
              tasks={tasks.filter((task) => task.status === col.id)}
            />
          ))}            
        </SortableContext>
      </BoardContainer>

      {"document" in window &&
        createPortal(
          <DragOverlay>
            {activeColumn && (
              <BoardColumn
                isOverlay
                column={activeColumn}
                tasks={tasks.filter(
                  (task) => task.status === activeColumn.id
                )}
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
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (!hasDraggableData(active)) return;

    const activeData = active.data.current;

    if (activeId === overId) return;

    const isActiveAColumn = activeData?.type === "Column";
    if (!isActiveAColumn) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    if (!hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    const isActiveATask = activeData?.type === "Task";
    const isOverATask = overData?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      const activeTask = tasks.find((t) => t.id === activeId);
      const overTask = tasks.find((t) => t.id === overId);

      if (!activeTask || !overTask) return;

      const isCrossColumn = activeTask.status !== overTask.status;

      // Build target column task list (sorted, excluding the active task)
      const targetColumnId = isCrossColumn ? overTask.status : activeTask.status;
      const targetColumnTasks = tasks
        .filter((t) => t.status === targetColumnId && t.id !== activeTask.id)
        .sort((a, b) => a.index - b.index);

      const overPos = targetColumnTasks.findIndex((t) => t.id === overTask.id);

      // Decide placement relative to the over task
      let prevTask = null;
      let nextTask = null;

      if (!isCrossColumn && activeTask.index < overTask.index) {
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
        ...activeTask,
        status: targetColumnId,
        index: newIndex,
      };
      
      dispatch(updateTaskRequest({ values: updatedTask }));
    }

    const isOverAColumn = overData?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      const activeTask = tasks.find((t) => t.id === activeId);
      if (!activeTask) return;

      // Append to end of the target column
      const targetColumnTasks = tasks
        .filter((t) => t.status === overId && t.id !== activeTask.id)
        .sort((a, b) => a.index - b.index);

      const prevTask = targetColumnTasks[targetColumnTasks.length - 1] || null;
      const nextTask = null;
      const newIndex = calculateNewIndex(prevTask, nextTask);

      const updatedTask = { ...activeTask, status: overId, index: newIndex };
      dispatch(updateTaskRequest({ values: updatedTask }));
    }
  }
}