// src/features/task/taskSlice.js
import { createSlice } from '@reduxjs/toolkit'

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    list: [],
    olderList: [],
    task: null,
    loading: false,
    error: null,
    submitLoading: false,
    deleteLoading: false,
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
      state.submitLoading = true
    },
    addTaskSuccess: (state) => {
      state.submitLoading = false
    },
    addTaskFailure: (state, action) => {
      state.submitLoading = false
      state.error = action.payload
    },

    updateTaskRequest: (state) => {
      state.submitLoading = true
    },
    updateTaskSuccess: (state) => {
      state.submitLoading = false
    },
    updateTaskFailure: (state, action) => {
      state.submitLoading = false
      state.error = action.payload
    },

    // Optimistic updates for drag & drop
    updateTaskOptimistic: (state, action) => {
      const updated = action.payload
      if (!updated) return

      // Store original state in olderList for potential rollback (only if empty)
      if (state.olderList.length === 0) {
        state.olderList = [...state.list]
      }

      // Update the main list immediately for UI
      const indexInList = state.list.findIndex((t) => t.id === updated.id)
      if (indexInList !== -1) {
        state.list[indexInList] = updated
      }
    },

    // Rollback optimistic updates if API fails
    rollbackTaskOptimistic: (state) => {
      if (state.olderList.length > 0) {
        state.list = [...state.olderList]
        state.olderList = []
      }
    },

    // Clear olderList after successful API call
    clearOlderList: (state) => {
      state.olderList = []
    },

    // deleteTask
    deleteTaskRequest: (state) => {
      state.deleteLoading = true
    },
    deleteTaskSuccess: (state) => {
      state.deleteLoading = false
    },
    deleteTaskFailure: (state, action) => {
      state.deleteLoading = false
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
  updateTaskOptimistic,
  rollbackTaskOptimistic,
  clearOlderList,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
} = taskSlice.actions
export default taskSlice.reducer
