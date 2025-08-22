// src/features/task/taskSlice.js
import { createSlice } from '@reduxjs/toolkit'

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    list: [],
    task: null,
    loading: false,
    error: null,
    actionLoading: false,
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
      state.error = null
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
      state.actionLoading = true
    },
    addTaskSuccess: (state) => {
      state.actionLoading = false
    },
    addTaskFailure: (state, action) => {
      state.actionLoading = false
      state.error = action.payload
    },

    updateTaskRequest: (state) => {
      state.actionLoading = true
    },
    updateTaskSuccess: (state, action) => {
      state.actionLoading = false
      const updated = action.payload
      if (!updated) return
      const indexInList = state.list.findIndex((t) => t.id === updated.id)
      if (indexInList !== -1) {
        state.list[indexInList] = updated
      }
      if (state.task && state.task.id === updated.id) {
        state.task = updated
      }
    },
    updateTaskFailure: (state, action) => {
      state.actionLoading = false
      state.error = action.payload
    },

    // deleteTask
    deleteTaskRequest: (state) => {
      state.actionLoading = true
    },
    deleteTaskSuccess: (state) => {
      state.actionLoading = false
    },
    deleteTaskFailure: (state, action) => {
      state.actionLoading = false
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
  clearError,
} = taskSlice.actions
export default taskSlice.reducer
