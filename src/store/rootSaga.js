import { all } from "redux-saga/effects";
import taskSaga from "../sagas/task/taskSaga";
import userSaga from "../sagas/users/userSaga";

// Root saga
function* rootSaga() {
  yield all([taskSaga(), userSaga()]);
}

export default rootSaga;
