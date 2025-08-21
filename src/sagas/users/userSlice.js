import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    listUser: [],
    user: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    getUsersRequest: (state) => {
      state.loading = true;
    },
    getUsersSuccess: (state, action) => {
      state.loading = false;
      state.listUser = action.payload;
    },
    getUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createUserRequest: (state) => {
      state.loading = true;
    },
    createUserSuccess: (state, action) => {
      state.loading = false;
      state.listUser.push(action.payload);
      state.success = true;
      state.error = null;
    },
    createUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    signInRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
    },

    resetUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  getUsersRequest,
  getUsersSuccess,
  getUsersFailure,
  createUserRequest,
  createUserSuccess,
  createUserFailure,
  signInRequest,
  signInSuccess,
  signInFailure,
  resetUserState,
} = userSlice.actions;
export default userSlice.reducer;
