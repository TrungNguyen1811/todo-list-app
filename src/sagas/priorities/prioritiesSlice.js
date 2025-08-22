import { createSlice } from "@reduxjs/toolkit";

const prioritiesSlice = createSlice({
  name: "priorities",
  initialState: {
    listPriorities: [],
    priority: null,
    loading: false,
    actionLoading: false,
    error: null,
  },
  reducers: {
    getPrioritiesRequest: (state) => {
      state.loading = true;
    },
    getPrioritiesSuccess: (state, action) => {
      state.loading = false;
      state.listPriorities = action.payload;
    },
    getPrioritiesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addPriorityRequest: (state) => {
      state.actionLoading = true;
    },
    addPrioritySuccess: (state) => {
      state.actionLoading = false;
    },
    addPriorityFailure: (state, action) => {
      state.actionLoading = false;
      state.error = action.payload;
    },
    updatePriorityRequest: (state) => {
      state.actionLoading = true;
    },
    updatePrioritySuccess: (state) => {
      state.actionLoading = false;
    },
    updatePriorityFailure: (state, action) => {
      state.actionLoading = false;
      state.error = action.payload;
    },

    deletePriorityRequest: (state) => {
      state.actionLoading = true;
    },
    deletePrioritySuccess: (state) => {
      state.actionLoading = false;
    },
    deletePriorityFailure: (state, action) => {
      state.actionLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getPrioritiesRequest,
  getPrioritiesSuccess,
  getPrioritiesFailure,
  addPriorityRequest,
  addPrioritySuccess,
  addPriorityFailure,
  updatePriorityRequest,
  updatePrioritySuccess,
  updatePriorityFailure,
  deletePriorityRequest,
  deletePrioritySuccess,
  deletePriorityFailure,
} = prioritiesSlice.actions;
export default prioritiesSlice.reducer;
