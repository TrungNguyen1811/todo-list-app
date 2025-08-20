import { takeEvery, call, put } from "redux-saga/effects";

import {
  createUserSuccess,
  createUserFailure,
  createUserRequest,
} from "./userSlice";

import USERS_API from "@/services/users";

function* handleCreateUser(action) {
  try {
    const newUser = yield call(USERS_API.post, action.payload);
    yield put(createUserSuccess(newUser));
  } catch (error) {
    yield put(createUserFailure(error.message));
  }
}

export default function* userSaga() {
  yield takeEvery(createUserRequest.type, handleCreateUser);
}
