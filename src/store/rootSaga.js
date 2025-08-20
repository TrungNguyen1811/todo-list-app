import { all } from 'redux-saga/effects'
import taskSaga from '../sagas/task/taskSaga'

// Root saga
function* rootSaga() {
  yield all([taskSaga()])
}

export default rootSaga
