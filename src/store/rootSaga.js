import { all } from 'redux-saga/effects'

// Root saga
function* rootSaga() {
  yield all([
    // Include the authSaga
  ])
}

export default rootSaga
