import { combineReducers } from "redux";
import taskReducer from "@/sagas/task/taskSlice";
import userReducer from "@/sagas/users/userSlice";

const rootReducer = combineReducers({
  task: taskReducer,
  user: userReducer,
});

export default rootReducer;
