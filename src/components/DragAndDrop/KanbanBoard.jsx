import { useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

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
import { calculateNewIndex, hasDraggableData } from "./utils";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { updateTaskRequest } from '@/sagas/task/taskSlice';
import { useDispatch } from 'react-redux';

const defaultCols = [
  {
    id: "incomplete" ,
    title: "Incomplete",
  },
  {
    id: "inprogress" ,
    title: "In progress",
  },
  {
    id: "complete",
    title: "Complete",
  },
]

export function KanbanBoard() {
  const dispatch = useDispatch();
  const reduxTasks = useSelector((state) => state.task.list);

  const [tasks, setTasks] = useState(reduxTasks);
  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    setTasks(prev => {
      if (prev !== reduxTasks) return reduxTasks;
      return prev;
    });
  }, [reduxTasks]);


  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );


  function onDragStart(event) {
    if (!hasDraggableData(event.active)) return;
    setActiveTask(event.active.data.current.task);
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
    if (activeData?.type !== "Task") return;

    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      const activeIndex = newTasks.findIndex((t) => t.id === activeId);
      if (activeIndex === -1) return newTasks;

      const activeTask = { ...newTasks[activeIndex] };

      if (overData?.type === "Task") {
        const overIndex = newTasks.findIndex((t) => t.id === overId);
        if (overIndex === -1) return newTasks;
        const overTask = newTasks[overIndex];

        if (activeTask.status !== overTask.status) {
          activeTask.status = overTask.status;
          newTasks[activeIndex] = activeTask;
        }

        return arrayMove(newTasks, activeIndex, overIndex);
      } else if (overData?.type === "Column") {
        activeTask.status = overId;
        newTasks[activeIndex] = activeTask;
        return newTasks;
      }

      return newTasks;
    });
  }

  // =====================
  // Drag end
  // =====================
  function onDragEnd(event) {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    const overTask = tasks.find((t) => t.id === overId);
    const isOverAColumn = overTask ? false : true;

    let newIndex;

    if (overTask) {
      const tasksInColumn = tasks
        .filter((t) => t.status === overTask.status)
        .sort((a, b) => a.index - b.index);

      const overPos = tasksInColumn.findIndex((t) => t.id === overTask.id);
      const prevTask = tasksInColumn[overPos - 1] || null;
      const nextTask = tasksInColumn[overPos + 1] || null;

      newIndex = calculateNewIndex(prevTask, nextTask);
    } else if (isOverAColumn) {
      const tasksInColumn = tasks
        .filter((t) => t.status === overId)
        .sort((a, b) => a.index - b.index);

      const lastTask = tasksInColumn.slice(-1)[0] || null;
      newIndex = calculateNewIndex(lastTask, null);
    }

    // Gọi API update (optimistic, rollback nếu lỗi)
    const prevTasks = [...tasks]; // lưu state cũ để rollback
    dispatch(
      updateTaskRequest({
        id: activeTask.id,
        status: activeTask.status,
        index: newIndex,
        onError: () => setTasks(prevTasks), // rollback khi API lỗi
      })
    );
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <BoardContainer>
        <SortableContext items={defaultCols.map((c) => c.id)}>
          {defaultCols.map((col) => (
            <BoardColumn
              key={col.id}
              column={col}
              tasks={tasks.filter((t) => t.status === col.id)}
            />
          ))}
        </SortableContext>
      </BoardContainer>

      {typeof document !== "undefined" &&
        createPortal(
          <DragOverlay>
            {activeTask && <TaskCard task={activeTask} isOverlay />}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );
}
