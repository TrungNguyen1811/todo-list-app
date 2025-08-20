// src/features/task/taskSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react'

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
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

    updateTaskRequest: (state) => {
      state.loading = true
    },
    updateTaskSuccess: (state, action) => {
      state.loading = false
      state.list = state.list.map((task) =>
        task.id === action.payload.id ? action.payload : task
      )
    },
    updateTaskFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

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
