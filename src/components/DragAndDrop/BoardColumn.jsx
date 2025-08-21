import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useDndContext } from "@dnd-kit/core";
import { useMemo } from "react";
import { TaskCard } from "./TaskCard";
import { Card } from "antd";

import "./Board.scss"; 

export function BoardColumn({ column, tasks, }) {
  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);
  const sortedTasks = tasks.slice().sort((a, b) => a.index - b.index);


  const { setNodeRef} =
    useSortable({
      id: column.id,
      data: { type: "Column", column },
      attributes: { roleDescription: `Column: ${column.title}` },
    });


  return (
    <Card
      ref={setNodeRef}
      className={`board-column`}
    >
      <div className="board-column-header">
        <span className="title">{column.title}</span>
      </div>

      <div className="board-tasks">
        <SortableContext items={tasksIds}>
          {sortedTasks.map((task) => (
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
