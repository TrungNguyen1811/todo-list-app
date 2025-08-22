import { takeEvery, call, put } from "redux-saga/effects";

import {
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
} from "./prioritiesSlice";

import PRIORITY_API from "@/services/priority";
import { showMessage } from "../appMessage/appMessageSlice";

function* handleGetPriorities() {
  try {
    const priorities = yield call(PRIORITY_API.get);
    yield put(getPrioritiesSuccess(priorities));
  } catch (error) {
    yield put(getPrioritiesFailure(error.message));
  }
}

function* handleAddPriority(action) {
  try {
    const { values, meta } = action.payload;
    const newPriority = yield call(PRIORITY_API.post, values);
    yield put(addPrioritySuccess(newPriority));
    yield put(showMessage.success("Priority added successfully"));
    if (meta?.callback) {
      yield call(meta.callback);
    }
  } catch (error) {
    yield put(addPriorityFailure(error.message));
    yield put(showMessage.error(error.message));
  }
}

function* handleUpdatePriority(action) {
  try {
    const { values, meta } = action.payload;
    const newTask = yield call(PRIORITY_API.put, values);
    yield put(showMessage.success("Priority updated successfully"));
    yield put(updatePrioritySuccess(newTask));
    if (meta?.callback) {
      yield call(meta.callback);
    }
  } catch (error) {
    yield put(updatePriorityFailure(error.message));
    yield put(showMessage.error(error.message));
  }
}

function* handleDeletePriority(action) {
  try {
    const { meta, id } = action.payload;
    const newTask = yield call(PRIORITY_API.delete, id);
    yield put(showMessage.success("Priority deleted successfully"));
    yield put(deletePrioritySuccess(newTask));
    if (meta?.callback) {
      yield call(meta.callback);
    }
  } catch (error) {
    yield put(deletePriorityFailure(error.message));
    yield put(showMessage.error(error.message));
  }
}

export default function* prioritiesSaga() {
  yield takeEvery(getPrioritiesRequest.type, handleGetPriorities);
  yield takeEvery(addPriorityRequest.type, handleAddPriority);
  yield takeEvery(updatePriorityRequest.type, handleUpdatePriority);
  yield takeEvery(deletePriorityRequest.type, handleDeletePriority);
}
