export function hasDraggableData(entry) {
  if (!entry) {
    return false
  }

  const data = entry.data.current

  if (data?.type === 'Column' || data?.type === 'Task') {
    return true
  }

  return false
}

export function calculateNewIndex(prevTask, nextTask) {
  if (!prevTask && !nextTask) {
    return 1000
  } else if (!prevTask) {
    return nextTask.index - 1000
  } else if (!nextTask) {
    return prevTask.index + 1000
  } else {
    const prevIndex = typeof prevTask.index === 'number' ? prevTask.index : 0
    const nextIndex = typeof nextTask.index === 'number' ? nextTask.index : prevIndex + 2000
    const gap = Math.floor((nextIndex - prevIndex) / 2)
    // Ensure we always move forward at least by 1 when there is no room between indices
    if (gap <= 0) {
      return prevIndex + 1
    }
    return prevIndex + gap
  }
}

