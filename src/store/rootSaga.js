import { all } from 'redux-saga/effects'
import taskSaga from '../sagas/task/taskSaga'
import userSaga from '../sagas/users/userSaga'
import prioritiesSaga from '@/sagas/priorities/prioritiesSaga'

// Root saga
function* rootSaga() {
  yield all([taskSaga(), userSaga(), prioritiesSaga()])
}

export default rootSaga
