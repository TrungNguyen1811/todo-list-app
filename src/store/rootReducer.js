import { combineReducers } from 'redux'
import taskReducer from '@/sagas/task/taskSlice'

const rootReducer = combineReducers({
  task: taskReducer,
})

export default rootReducer
