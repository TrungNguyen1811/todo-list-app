import { put, call, takeEvery, delay } from 'redux-saga/effects'
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
import { showMessage } from '@/sagas/appMessage/appMessageSlice'

// get all to-do list
function* handleGetTasks() {
  try {
    const getTasks = yield call(TASK_API.get)
    yield put(getTasksSuccess(getTasks))
  } catch (error) {
    yield put(getTasksFailure(error.message || 'Failed to load tasks'))
  }
}

// get task by id
function* handleGetTask() {
  try {
    const getTask = yield call(TASK_API.getTask)
    yield put(getTaskSuccess(getTask))
  } catch (error) {
    yield put(getTaskFailure(error.message || 'Failed to load task'))
  }
}

function* handleAddTask(action) {
  try {
    const { values, meta } = action.payload
    const newTask = yield call(TASK_API.post, values)
    yield put(addTaskSuccess(newTask))
    yield put(showMessage.success('Task added successfully'))
    if (meta?.callback) {
      yield call(meta.callback)
    }
  } catch (error) {
    yield put(addTaskFailure(error.message))
    yield put(showMessage.error(error.message))
  }
}

function* handleUpdateTask(action) {
  try {
    const { values, meta } = action.payload
    const updatedTask = yield call(TASK_API.put, values)
    // ensure we pass the updated entity back
    yield put(updateTaskSuccess(updatedTask))
  } catch (error) {
    yield put(showMessage.error(error.message || 'Failed to update task'))
    yield put(updateTaskFailure(error.message || 'Failed to update task'))

    // Optionally retry the update after a delay
    // yield delay(2000)
    // yield put(updateTaskRequest(action.payload))
  }
}

function* handleDeleteTask(action) {
  try {
    const deletedTask = yield call(TASK_API.delete, action.payload)
    yield put(deleteTaskSuccess(deletedTask))
  } catch (error) {
    yield put(deleteTaskFailure(error.message || 'Failed to delete task'))
  }
}

export default function* taskSaga() {
  yield takeEvery(getTasksRequest.type, handleGetTasks)
  yield takeEvery(getTaskRequest.type, handleGetTask)
  yield takeEvery(addTaskRequest.type, handleAddTask)
  yield takeEvery(updateTaskRequest.type, handleUpdateTask)
  yield takeEvery(deleteTaskRequest.type, handleDeleteTask)
}
