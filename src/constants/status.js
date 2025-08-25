const STATUS_COLOR = {
  completed: 'success',
  inprogress: 'processing',
  incomplete: 'warning',
}

const STATUS_TEXT = {
  completed: 'Completed',
  inprogress: 'In Progress',
  incomplete: 'In Complete',
}

const STATUS_OPTION = [
  { value: 'incomplete', label: 'Incomplete' },
  { value: 'inprogress', label: 'Inprogress' },
  { value: 'completed', label: 'Completed' },
]

const PRIORITY_COLOR = {
  high: 'red',
  medium: 'orange',
  low: 'green',
}

const DEFAULT_COLUMNS = [
  {
    id: 'incomplete',
    title: 'Incomplete',
  },
  {
    id: 'inprogress',
    title: 'In Progress',
  },
  {
    id: 'completed',
    title: 'Completed',
  },
]

export {
  STATUS_COLOR,
  STATUS_TEXT,
  STATUS_OPTION,
  PRIORITY_COLOR,
  DEFAULT_COLUMNS,
}
