import { getTasksRequest } from '@/sagas/task/taskSlice'
import { theme } from 'antd'
import { useCallback } from 'react'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const useDashboard = () => {
  const { list: tasks, loading } = useSelector((state) => state.task)
  const dispatch = useDispatch()
  const {
    token: { colorComplete, colorInProgress, colorInComplete },
  } = theme.useToken()

  const getListTask = useCallback(() => {
    dispatch(getTasksRequest())
  }, [dispatch])

  const { todayTasks, allStats } = useMemo(() => {
    const todayTasks = tasks.filter((task) => {
      const today = new Date().toLocaleDateString()
      return (
        task?.createdAt &&
        new Date(task.createdAt).toLocaleDateString() === today
      )
    })

    const total = tasks.length
    const completed = tasks.filter((task) => task.status === 'completed').length
    const inProgress = tasks.filter(
      (task) => task.status === 'inprogress'
    ).length
    const inComplete = tasks.filter(
      (task) => task.status === 'incomplete'
    ).length
    const overdue = tasks.filter(
      (task) =>
        new Date(task.dueDate) < new Date() && task.status !== 'completed'
    ).length

    const allStats = { total, completed, inProgress, inComplete, overdue }

    return { todayTasks, allStats }
  }, [tasks])

  const todayStats = useMemo(() => {
    const total = todayTasks.length
    const completed = todayTasks.filter(
      (task) => task.status === 'completed'
    ).length
    const inProgress = todayTasks.filter(
      (task) => task.status === 'inprogress'
    ).length
    const inComplete = todayTasks.filter(
      (task) => task.status === 'incomplete'
    ).length
    return {
      total,
      completed,
      inProgress,
      inComplete,
      completedPercent: total > 0 ? Math.round((completed / total) * 100) : 0,
      inProgressPercent: total > 0 ? Math.round((inProgress / total) * 100) : 0,
      inCompletePercent: total > 0 ? Math.round((inComplete / total) * 100) : 0,
    }
  }, [todayTasks])

  return {
    todayTasks,
    todayStats,
    allStats,
    loading,
    colorComplete,
    colorInProgress,
    colorInComplete,
    getListTask,
  }
}

export default useDashboard
