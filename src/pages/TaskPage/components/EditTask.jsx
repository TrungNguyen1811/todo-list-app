import { useDispatch } from 'react-redux'
import { updateTaskRequest } from '../../../sagas/task/taskSlice'
import { Modal } from 'antd'
import TaskFormBase from '../../../components/TaskForm.jsx/TaskFormBase'

export default function EditTask({ task, onClose }) {
  const dispatch = useDispatch()

  if (!task) return null 
  const handleUpdate = (values) => {
    dispatch(updateTaskRequest({ id: task.id, ...values }))
    onClose()
  }

  return (
    <Modal
      title="Edit Task"
      open={!!task}
      onCancel={onClose}
      footer={null}
    >
      <TaskFormBase
        initialValues={task}
        onSubmit={handleUpdate}
        onCancel={onClose}
      />
    </Modal>
  )
}
