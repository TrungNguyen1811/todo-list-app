import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, Tag, Avatar, Tooltip } from "antd";
import "./TaskCard.scss";
import { ClockCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { formatDate, getPriorityText } from "@/utils/taskHelpers";

export function TaskCard({ task, isOverlay, onEdit }) {
  const { user } = useSelector((state) => state.user);

  // Avoid registering overlay cards as sortable to prevent extra re-renders/loops
  const sortableProps = isOverlay
    ? {
        setNodeRef: undefined,
        attributes: {},
        listeners: {},
        transform: null,
        transition: undefined,
        isDragging: false,
      }
    : useSortable({
        id: task.id,
        data: {
          type: "Task",
          task,
        },
        attributes: {
          roleDescription: "Task",
        },
      });

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = sortableProps;

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const getDraggingClass = () => {
    if (isOverlay) return "task-card--overlay";
    if (isDragging) return "task-card--dragging";
    return "";
  };

  const handleCardClick = (e) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (onEdit) onEdit(task);
  };

  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
        className={`task-card task-card__drag-handle ${getDraggingClass()}`}
        size="small"
        data-priority={task.priorities.name?.toLowerCase()}
        {...attributes}
        {...listeners}
        onClick={handleCardClick}
      >
        <div className="task-card__content">
          <div className="task-card__header">
            <div className="task-card__priority-section">
              <Tag
                color={task?.priorities?.color}
                className="task-card__priority-tag"
              >
                {getPriorityText(task?.priorities?.name || "")}
              </Tag>
            </div>
          </div>

          <div className="task-card__body">
            <h4 className="task-card__title">
              {task.title.length > 20
                ? `${task.title.substring(0, 26)}...`
                : task.title}
            </h4>
            {task.description && (
              <p className="task-card__description">
                {task.description.length > 100
                  ? `${task.description.substring(0, 100)}...`
                  : task.description}
              </p>
            )}
          </div>

          <div className="task-card__footer">
            <div className="task-card__user-info">
              <Tooltip
                title={
                  user ? `${user.firstName} ${user.lastName}` : "Unknown User"
                }
              >
                <Avatar
                  style={{ backgroundColor: "#ff6867" }}
                  size="small"
                  icon={<UserOutlined />}
                >
                  {user && user?.lastName?.at(0)?.toUpperCase()}
                </Avatar>
              </Tooltip>
            </div>

            <div className="task-card__meta">
              <Tooltip
                title={new Date(task.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              >
                <span className="task-card__time">
                  <ClockCircleOutlined className="task-card__time-icon" />
                  {formatDate(task.createdAt)}
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
