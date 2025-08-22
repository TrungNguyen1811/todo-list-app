import { useDispatch } from 'react-redux'
import { deleteTaskRequest } from '../../../sagas/task/taskSlice'
import { Button } from 'antd'

export default function TaskItem({ task, onEdit }) {
  const dispatch = useDispatch()

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <Button onClick={() => dispatch(deleteTaskRequest(task.id))}>Delete</Button>
      <Button onClick={() => onEdit(task)}>Edit</Button>
    </div>
  )
}