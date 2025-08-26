import { useCallback } from "react"
import { hasDraggableData, calculateNewIndex } from "../utils"
import { updateTaskOptimistic, updateTaskRequest, clearOlderList } from "@/sagas/task/taskSlice"

const getTasksByStatus = (tasks) => {
  return tasks.reduce((group, task) => {
    const key = task.status
    if (!group[key]) group[key] = []
    group[key].push(task)
    return group
  }, {})
}

const getTargetColumnTasks = (tasks, status, excludeId) => {
  return tasks
    .filter((t) => t.status === status && t.id !== excludeId)
    .sort((a, b) => a.index - b.index)
}

export function useKanbanDnD({ tasks, dispatch, previewOverride, setPreviewOverride, lastAppliedRef }) {
  const onDragStart = useCallback((event) => {
    if (!hasDraggableData(event.active)) return
  }, [])

  const onDragEnd = useCallback((event) => {
    const { active, over } = event
    if (!over || !hasDraggableData(active)) {
      setPreviewOverride(null)
      return
    }

    const activeData = active.data.current
    if (activeData?.type === "Task") {
      if (previewOverride && previewOverride.id === active.id) {
        const baseTask = tasks.find((t) => t.id === active.id)
        if (baseTask) {
          const values = { ...baseTask, status: previewOverride.status, index: previewOverride.index }
          dispatch(updateTaskOptimistic(values))
          dispatch(updateTaskRequest({
            values,
            meta: {
              callback: () => dispatch(clearOlderList()),
            },
          }))
        }
      }
      lastAppliedRef.current.clear()
      setPreviewOverride(null)
    }
  }, [dispatch, tasks, previewOverride, setPreviewOverride, lastAppliedRef])

  const handleDragOver = useCallback((event) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id
    if (activeId === overId) return
    if (!hasDraggableData(active) || !hasDraggableData(over)) return

    const activeData = active.data.current
    const overData = over.data.current

    const isActiveATask = activeData?.type === "Task"
    const isOverATask = overData?.type === "Task"
    if (!isActiveATask) return

    if (isActiveATask && isOverATask) {
      const activeTaskInStore = tasks.find((t) => t.id === activeId)
      const overTask = tasks.find((t) => t.id === overId)
      if (!activeTaskInStore || !overTask) return

      const originalActiveTask = active.data.current.task
      const isCrossColumn = originalActiveTask.status !== overTask.status
      const targetColumnId = isCrossColumn ? overTask.status : activeTaskInStore.status
      const targetColumnTasks = getTargetColumnTasks(tasks, targetColumnId, activeTaskInStore.id)
      const overPos = targetColumnTasks.findIndex((t) => t.id === overTask.id)

      let prevTask = null
      let nextTask = null
      if (!isCrossColumn && activeTaskInStore.index < overTask.index) {
        prevTask = overTask
        nextTask = targetColumnTasks[overPos + 1] || null
      } else {
        prevTask = targetColumnTasks[overPos - 1] || null
        nextTask = overTask
      }

      const newIndex = calculateNewIndex(prevTask, nextTask)
      const updatedTask = { ...activeTaskInStore, status: targetColumnId, index: newIndex }
      if (updatedTask.status !== activeTaskInStore.status || updatedTask.index !== activeTaskInStore.index) {
        const fingerprint = `${updatedTask.status}:${updatedTask.index}`
        const prev = lastAppliedRef.current.get(updatedTask.id)
        if (prev !== fingerprint) {
          lastAppliedRef.current.set(updatedTask.id, fingerprint)
          setPreviewOverride((prevState) => {
            if (
              prevState &&
              prevState.id === updatedTask.id &&
              prevState.status === updatedTask.status &&
              prevState.index === updatedTask.index
            ) {
              return prevState
            }
            return { id: updatedTask.id, status: updatedTask.status, index: updatedTask.index }
          })
        }
      }
    }

    const isOverAColumn = overData?.type === "Column"
    if (isActiveATask && isOverAColumn) {
      const activeTaskInStore = tasks.find((t) => t.id === activeId)
      if (!activeTaskInStore) return

      const originalActiveTask = active.data.current.task
      if (originalActiveTask.status !== overId) {
        const targetColumnTasks = getTargetColumnTasks(tasks, overId, activeTaskInStore.id)
        const prevTask = targetColumnTasks[targetColumnTasks.length - 1] || null
        const nextTask = null
        const newIndex = calculateNewIndex(prevTask, nextTask)
        const updatedTask = { ...activeTaskInStore, status: overId, index: newIndex }
        if (updatedTask.status !== activeTaskInStore.status || updatedTask.index !== activeTaskInStore.index) {
          const fingerprint = `${updatedTask.status}:${updatedTask.index}`
          const prev = lastAppliedRef.current.get(updatedTask.id)
          if (prev !== fingerprint) {
            lastAppliedRef.current.set(updatedTask.id, fingerprint)
            setPreviewOverride((prevState) => {
              if (
                prevState &&
                prevState.id === updatedTask.id &&
                prevState.status === updatedTask.status &&
                prevState.index === updatedTask.index
              ) {
                return prevState
              }
              return { id: updatedTask.id, status: updatedTask.status, index: updatedTask.index }
            })
          }
        }
      }
    }
  }, [tasks, lastAppliedRef, setPreviewOverride])

  return { onDragStart, onDragEnd, handleDragOver }
}


