// src/features/task/taskSlice.js
import { createSlice } from '@reduxjs/toolkit'

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    list: [],
    task: null,
    loading: false,
    error: null,
  },
  reducers: {
    // get task lists
    getTasksRequest: (state) => {
      state.loading = true
    },
    getTasksSuccess: (state, action) => {
      state.loading = false
      state.list = action.payload
    },
    getTasksFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    // get task
    getTaskRequest: (state) => {
      state.loading = true
    },
    getTaskSuccess: (state, action) => {
      state.loading = false
      state.task = action.payload
    },
    getTaskFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    // add task
    addTaskRequest: (state) => {
      state.loading = true
    },
    addTaskSuccess: (state, action) => {
      state.loading = false
      state.list.push(action.payload)
    },
    addTaskFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    updateTaskRequest: (state, action) => {
      state.loading = true

      const prevTask = state.list.find((t) => t.id === action.payload.id)
      if (prevTask) {
        action.meta = { prevTask }
      }

      // Cập nhật ngay trong state để UI phản hồi
      state.list = state.list.map((t) =>
        t.id === action.payload.id ? { ...t, ...action.payload } : t
      )
    },
    updateTaskSuccess: (state, action) => {
      state.loading = false
      state.list = state.list.map((t) =>
        t.id === action.payload.id ? action.payload : t
      )
    },
    updateTaskFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      if (action.meta?.prevTask) {
        state.list = state.list.map((t) =>
          t.id === action.meta.prevTask.id ? action.meta.prevTask : t
        )
      }
    },

    // deleteTask
    deleteTaskRequest: (state) => {
      state.loading = true
    },
    deleteTaskSuccess: (state, action) => {
      state.loading = false
      state.list = state.list.filter((task) => task.id !== action.payload.id)
    },
    deleteTaskFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  getTasksRequest,
  getTasksSuccess,
  getTasksFailure,
  getTaskRequest,
  getTaskSuccess,
  getTaskFailure,
  addTaskRequest,
  addTaskSuccess,
  addTaskFailure,
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
} = taskSlice.actions
export default taskSlice.reducer
