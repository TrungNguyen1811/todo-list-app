import { takeEvery, call, put } from 'redux-saga/effects'

import {
  createUserSuccess,
  createUserFailure,
  createUserRequest,
  getUsersSuccess,
  getUsersFailure,
  getUsersRequest,
  signInSuccess,
  signInFailure,
  signInRequest,
} from './userSlice'

import USERS_API from '@/services/users'
import { showMessage } from '../appMessage/appMessageSlice'

function* handleGetUsers() {
  try {
    const users = yield call(USERS_API.getAll)
    yield put(getUsersSuccess(users))
  } catch (error) {
    yield put(getUsersFailure(error.message))
  }
}

function* handleCreateUser(action) {
  try {
    const { values, callback } = action.payload
    const newUser = yield call(USERS_API.post, values)

    yield put(createUserSuccess(newUser))
    yield put(showMessage.success('Sign Up Successfully'))

    if (callback) {
      yield call(callback)
    }
  } catch (error) {
    yield put(createUserFailure(error.message))
    yield put(showMessage.error(`Error: ${error.message}`))
  }
}

function* handleSignIn(action) {
  try {
    const { username, password } = action.payload

    const users = yield call(USERS_API.get)

    const matchedUser = users.find(
      (u) => u.username === username && u.password === password
    )

    if (matchedUser) {
      localStorage.setItem('user', JSON.stringify(matchedUser))
      yield put(signInSuccess(matchedUser))
    } else {
      yield put(signInFailure('Incorrect username or password'))
    }
  } catch (error) {
    yield put(signInFailure(error.message))
  }
}

export default function* userSaga() {
  yield takeEvery(createUserRequest.type, handleCreateUser)
  yield takeEvery(getUsersRequest.type, handleGetUsers)
  yield takeEvery(signInRequest.type, handleSignIn)
}
