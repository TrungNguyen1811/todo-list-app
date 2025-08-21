import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useDndContext } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import { TaskCard } from "./TaskCard";
import { DragOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";

import "./Board.scss"; 

export function BoardColumn({ column, tasks, isOverlay }) {
  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } =
    useSortable({
      id: column.id,
      data: { type: "Column", column },
      attributes: { roleDescription: `Column: ${column.title}` },
    });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`board-column ${
        isOverlay ? "drag-overlay" : isDragging ? "drag-over" : ""
      }`}
    >
      <div className="board-column-header">
        <Button
          {...attributes}
          {...listeners}
          className="drag-button"
        >
          <span className="sr-only">{`Move column: ${column.title}`}</span>
          <DragOutlined />
        </Button>
        <span className="title">{column.title}</span>
      </div>

      <div className="board-tasks">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </Card>
  );
}

export function BoardContainer({ children }) {
  const dndContext = useDndContext();

  return (
    <div
      className={`board-container ${
        dndContext.active ? "drag-active" : "drag-default"
      }`}
    >
      <div className="board-columns">{children}</div>
    </div>
  );
}
