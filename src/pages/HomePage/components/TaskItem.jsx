import { useDispatch } from 'react-redux'
import { deleteTaskRequest } from '../../../sagas/task/taskSlice'

export default function TaskItem({ task, onEdit }) {
  const dispatch = useDispatch()

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={() => dispatch(deleteTaskRequest(task.id))}>Delete</button>
      <button onClick={() => onEdit(task)}>Edit</button>
    </div>
  )
}