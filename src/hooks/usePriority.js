import {
  addPriorityRequest,
  deletePriorityRequest,
  getPrioritiesRequest,
  updatePriorityRequest,
} from '@/sagas/priorities/prioritiesSlice'
import { useRef } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const usePriority = () => {
  const formikRef = useRef()
  const dispatch = useDispatch()
  const { listPriorities, loading, actionLoading } = useSelector(
    (state) => state.priorities
  )

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingPriority, setEditingPriority] = useState(null)

  const handleAddPriority = () => {
    if (formikRef.current) {
      formikRef.current.resetForm()
    }
    setEditingPriority(null)
    setIsModalVisible(true)
  }

  const handleEditPriority = (priority) => {
    setEditingPriority(priority)
    setIsModalVisible(true)
  }

  const handleDeletePriority = (priorityId) => {
    dispatch(
      deletePriorityRequest({
        id: priorityId,
        meta: {
          callback: () => {
            dispatch(getPrioritiesRequest())
          },
        },
      })
    )
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
    setEditingPriority(null)
  }

  const submitForm = (values) => {
    if (editingPriority) {
      dispatch(
        updatePriorityRequest({
          values: { ...values, id: editingPriority.id },
          meta: {
            callback: () => {
              setIsModalVisible(false)
              dispatch(getPrioritiesRequest())
            },
          },
        })
      )
    } else {
      dispatch(
        addPriorityRequest({
          values: values,
          meta: {
            callback: () => {
              setIsModalVisible(false)
              dispatch(getPrioritiesRequest())
            },
          },
        })
      )
    }
  }

  const handleGetPriorities = useCallback(() => {
    dispatch(getPrioritiesRequest())
  }, [dispatch])

  return {
    formikRef,
    loading,
    actionLoading,
    listPriorities,
    isModalVisible,
    editingPriority,
    handleAddPriority,
    handleEditPriority,
    handleDeletePriority,
    handleModalCancel,
    submitForm,
    handleGetPriorities,
  }
}

export default usePriority
