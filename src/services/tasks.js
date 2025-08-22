import instance from './axios'

const TASK_API = {
  get: async () => {
    const res = await instance.get('/todos')
    return res.data
  },

  getTask: async (task) => {
    const res = await instance.get(`/todos/${task.id}`)
    return res.data
  },

  post: async (task) => {
    const res = await instance.post(`/todos`, {
      title: task.title,
      description: task.description,
      status: task.status,
      priorityId: task.priorityId,
      index: task.index,
      userId: task.userId,
    })
    return res.data
  },

  put: async (task) => {
    const res = await instance.put(`/todos/${task.id}`, {
      title: task.title,
      description: task.description,
      status: task.status,
      priorityId: task.priorityId,
      index: task.index,
      userId: task.userId,
    })
    return res.data
  },

  delete: async (id) => {
    const res = await instance.delete(`/todos/${id}`)
    return res.data
  },
}

export default TASK_API
