import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, Button, Tag, Drawer } from "antd";
import "./TaskCard.scss";
import { ArrowsAltOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';
import { useState } from "react";

export function TaskCard({ task, isOverlay }) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen)

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    attributes: {
      roleDescription: "Task",
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const getDraggingClass = () => {
    if (isOverlay) return "task-card--overlay";
    if (isDragging) return "task-card--dragging";
    return "";
  };

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`task-card task-card__drag-handle ${getDraggingClass()}`}
      size="small"
      {...attributes}
      {...listeners}
      onClick={(e)=> {
        handleClick()
      }}
    >
      <div className="task-card__content">
        <p className='task-card__title'>
          {task.title}
        </p>
        <p className='task-card__description'>{task.description}</p>
        <div className='task-card__footer'>
          <Avatar
              style={{ backgroundColor: "#ff6867", verticalAlign: "middle" }}
              size="medium"
              gap={2}
            >
              {"Đ"}
          </Avatar>
          <p className='task-card__time'>
            {new Date(task.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: '2-digit',
            })}
          </p>
        </div>
      </div>
      <TaskDetailDrawer task={task} open={isOpen} onClose={() => {
        setIsOpen(false)
      }} />
    </Card>
  );
}

export function TaskDetailDrawer({ task, open, onClose }) {
  const handleClose =()=> {
    onClose()
  }

  return (
    <Drawer
      title="Task Detail"
      open={open}
      onClose={handleClose}
      onClick={(e) => {
        e.stopPropagation()
      }}
      width={500}
    >
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      
    </Drawer>
  );
}