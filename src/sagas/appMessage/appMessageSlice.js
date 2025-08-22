import { createSlice } from "@reduxjs/toolkit";

const appMessageSlice = createSlice({
  name: "message",
  initialState: null,
  reducers: {
    showMessage: (state, action) => action.payload,
    clearMessage: () => null,
  },
});

const { showMessage, clearMessage } = appMessageSlice.actions;

showMessage.success = (content) => showMessage({ type: "success", content });
showMessage.info = (content) => showMessage({ type: "info", content });
showMessage.error = (content) => showMessage({ type: "error", content });
showMessage.warning = (content) => showMessage({ type: "warning", content });

export { showMessage, clearMessage };
export default appMessageSlice.reducer;

//  can be use
// showMessage.success("contnet")
//  showMessage.info("message")
//  showMessage.error("message")
//  showMessage.warning("message")

// example yield put(showMessage.success("Priority added successfully"));
