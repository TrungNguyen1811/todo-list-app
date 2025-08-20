import { useEffect } from 'react'
import ListTask from './components/ListTask'

import { useDispatch } from 'react-redux';
import { getTasksRequest } from '../../sagas/task/taskSlice';

import NewTask from "@/pages/HomePage/components/NewTask";

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasksRequest());
  }, []);
  return (
    <div>
      <ListTask />
    </div>
  );
}
export default HomePage;
