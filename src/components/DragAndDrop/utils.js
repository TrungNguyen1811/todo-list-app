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
    const gap = (nextTask.index - prevTask.index) / 2
    return prevTask.index + gap
  }
}

