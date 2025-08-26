import { useState, useRef } from 'react'


const useTasks = () => {
  const formikRef = useRef()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const openModalAddTask = () => {
    if (formikRef.current) {
      formikRef.current.resetForm()
    }
    setEditingTask(null)
    setIsModalVisible(true)
  }

  const openModalUpdateTask = (task) => {
    setEditingTask(task || null)
    setIsModalVisible(true)
  }

  const cancelModalTask = () => {
    setIsModalVisible(false)
    setEditingTask(null)
  }

  const visibleModalTask = (isVisible) => {
    setIsModalVisible(isVisible)
  }

  return {
    openModalAddTask,
    openModalUpdateTask,
    cancelModalTask,
    isModalVisible,
    editingTask,
    formikRef,
    visibleModalTask,
  }
}

export default useTasks
