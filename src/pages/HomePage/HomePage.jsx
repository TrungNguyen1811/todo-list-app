import { useEffect } from "react";
import ListTask from "./components/ListTask";

import { useDispatch } from "react-redux";
import { getTasksRequest } from "../../sagas/task/taskSlice";

import './HomePage.scss'
import AddTask from '@/pages/HomePage/components/AddTask';

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasksRequest());
  }, []);
  return (
    <div className='home  '>
      <div className='home__header'>
        <h3>Task</h3>
        <AddTask /> 
      </div>
      <ListTask />
    </div>
  );
}
export default HomePage;
