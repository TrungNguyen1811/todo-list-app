import { DragOutlined } from '@ant-design/icons'
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Badge, Button, Card } from 'antd'
import './TaskCard.scss'

export function TaskCard({ task, isOverlay }) {
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
    }
  })

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  }

  let cardClass = "task-card"
  if (isOverlay) cardClass += " drag-overlay"
  else if (isDragging) cardClass += " drag-over"

  return (
    <Card ref={setNodeRef} style={style} className={cardClass}>
      <div className="task-card__header">
        <Button
          {...attributes}
          {...listeners}
          className="task-card__drag-btn"
        >
          <span className="sr-only">Move task</span>
          <DragOutlined />
        </Button>
        <Badge className="task-card__badge">Task</Badge>
      </div>
      <div className="task-card__content">
        {task.description}
      </div>
    </Card>
  )
}
