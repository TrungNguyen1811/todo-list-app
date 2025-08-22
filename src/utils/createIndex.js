export function calculateNewIndex(tasks, status) {
  const filteredTasks = tasks.filter((task) => task.status === status)

  if (filteredTasks.length === 0) {
    return 0
  }

  const maxIndex = Math.max(...filteredTasks.map((task) => task.index || 0))

  return maxIndex + 1000
}
