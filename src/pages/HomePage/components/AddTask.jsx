import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTaskRequest } from '../../../sagas/task/taskSlice'

import { Modal, Button } from 'antd'
import { Flex } from 'antd'
import TaskFormBase from '../../../components/TaskForm.jsx/TaskFormBase'

export default function AddTask() {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const handleAdd = (values) => {
    dispatch(addTaskRequest(values))
    setOpen(false)
  }

  return (
    <>
     <Flex vertical gap="middle" align="flex-start">
      <Button type="primary" onClick={() => setOpen(true)}>Add Task</Button>

      <Modal
        title="Add Task"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <TaskFormBase
          initialValues={{ title: '', description: '', status: '', priority: '' }}
          onSubmit={handleAdd}
          onCancel={() => setOpen(false)}
        />
      </Modal>
     </Flex>
    </>
  )
}
