export function getPriorityText(priorityName) {
  if (!priorityName) return ''
  return String(priorityName).toUpperCase()
}

export function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return ''

  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return 'Today'
  if (diffDays === 2) return 'Yesterday'
  if (diffDays <= 7) return `${diffDays - 1} days ago`

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
  })
}


