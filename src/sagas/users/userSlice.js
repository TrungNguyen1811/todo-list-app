import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    listUser: [],
    loading: false,
    error: null,
  },
  reducers: {
    getUserInfoRequest: (state) => {
      state.loading = true;
    },
    getUserInfoSuccess: (state, action) => {
      state.loading = false;
      state.listUser = action.payload;
    },
    getUserInfoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createUserRequest: (state) => {
      state.loading = true;
    },
    createUserSuccess: (state, action) => {
      state.loading = false;
      state.listUser.push(action.payload);
    },
    createUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoFailure,
  createUserRequest,
  createUserSuccess,
  createUserFailure,
} = userSlice.actions;
export default userSlice.reducer;
