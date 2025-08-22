import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useDndContext } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import { TaskCard } from "./TaskCard";
import { Card, Button, Drawer } from "antd";
import "./BoardColumn.scss";

export function BoardColumn({ column, tasks, isOverlay }) {
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => a.index - b.index);
  }, [tasks]);

  const tasksIds = useMemo(() => {
    return sortedTasks.map((task) => task.id);
  }, [sortedTasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    attributes: {
      roleDescription: `Column: ${column.title}`,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const getDraggingClass = () => {
    if (isOverlay) return "board-column--overlay";
    if (isDragging) return "board-column--dragging";
    return "board-column--default";
  };

  return (
    <Card
      ref={setNodeRef}
      style={style} 
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
              <TaskCard key={task.id} task={task} />
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
