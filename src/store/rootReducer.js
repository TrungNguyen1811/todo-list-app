import { combineReducers } from 'redux'
import taskReducer from '@/sagas/task/taskSlice'
import userReducer from '@/sagas/users/userSlice'
import prioritiesSlice from '@/sagas/priorities/prioritiesSlice'
import appMessageSlice from '@/sagas/appMessage/appMessageSlice'

const rootReducer = combineReducers({
  task: taskReducer,
  user: userReducer,
  priorities: prioritiesSlice,
  appMessage: appMessageSlice,
})

export default rootReducer
