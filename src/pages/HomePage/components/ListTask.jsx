import { useSelector } from 'react-redux'
import { useState } from 'react'

import TaskItem from './TaskItem'
import AddTask from './AddTask'
import EditTask from './EditTask'

export default function ListTask() {
  const tasks = useSelector(state => state.task.list)
  const [editingTask, setEditingTask] = useState(null)

  return (
    <div>
      <AddTask />
       <EditTask task={editingTask} onClose={() => setEditingTask(null)} />
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onEdit={(task) => setEditingTask(task)} />
      ))}
    </div>
  )
}
