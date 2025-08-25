import { SortableContext } from "@dnd-kit/sortable";
import { useDndContext, useDroppable } from "@dnd-kit/core";
import { useMemo } from "react";
import { TaskCard } from "./TaskCard";
import { Card } from "antd";
import "./BoardColumn.scss";

export function BoardColumn({ column, tasks, isOverlay, onEditTask }) {
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => a.index - b.index);
  }, [tasks]);

  const tasksIds = useMemo(() => {
    return sortedTasks.map((task) => task.id);
  }, [sortedTasks]);

  const { setNodeRef } = useDroppable({ id: column.id, data: { type: "Column", column } })

  const getDraggingClass = () => {
    if (isOverlay) return "board-column--overlay";
    return "board-column--default";
  };

  return (
    <Card
      ref={setNodeRef}
      className={`board-column ${getDraggingClass()}`}
      size="small"
    >
      <div className="board-column__header">
        <span className="board-column__title"> {column.title}</span>
      </div>
      <div className="board-column__scroll-area">
        <div className="board-column__content">
          <SortableContext items={tasksIds}>
            {sortedTasks.map((task) => (
              <TaskCard key={task.id} task={task} onEdit={onEditTask} />
            ))}
          </SortableContext>
        </div>
      </div>
    </Card>
  );
}

export function BoardContainer({ children }) {
  const dndContext = useDndContext();

  const getDraggingClass = () => {
    return dndContext.active ? "board-container--active" : "board-container--default";
  };

  return (
    <div className={`board-container ${getDraggingClass()}`}>
      <div className="board-container__inner">
        {children}
      </div>
    </div>
  );
}
