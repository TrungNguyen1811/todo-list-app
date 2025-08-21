import { put, call, takeEvery } from 'redux-saga/effects'
import {
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
} from './taskSlice'
import TASK_API from '../../services/tasks'

// get all to-do list
function* handleGetTasks() {
  try {
    const getTasks = yield call(TASK_API.get)
    yield put(getTasksSuccess(getTasks))
  } catch (error) {
    yield put(getTasksFailure(error.message))
  }
}

// get task by id
function* handleGetTask() {
  try {
    const getTask = yield call(TASK_API.getTask)
    yield put(getTaskSuccess(getTask))
  } catch (error) {
    yield put(getTaskFailure(error.message))
  }
}

function* handleAddTask(action) {
  try {
    const newTask = yield call(TASK_API.post, action.payload)
    yield put(addTaskSuccess(newTask))
  } catch (error) {
    yield put(addTaskFailure(error.message))
  }
}

function* handleUpdateTask(action) {
  try {
    const newTask = yield call(TASK_API.put, action.payload)
    yield put(updateTaskSuccess(newTask))
  } catch (error) {
    yield put(updateTaskFailure(error.message))
  }
}

function* handleDeleteTask(action) {
  try {
    const newTask = yield call(TASK_API.delete, action.payload)
    yield put(deleteTaskSuccess(newTask))
  } catch (error) {
    yield put(deleteTaskFailure(error.message))
  }
}

export default function* taskSaga() {
  yield takeEvery(getTasksRequest.type, handleGetTasks)
  yield takeEvery(getTaskRequest.type, handleGetTask)
  yield takeEvery(addTaskRequest.type, handleAddTask)
  yield takeEvery(updateTaskRequest.type, handleUpdateTask)
  yield takeEvery(deleteTaskRequest.type, handleDeleteTask)
}
