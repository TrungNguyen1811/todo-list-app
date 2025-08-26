import { useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";

const useTasks = () => {
  const formikRef = useRef();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const { listPriorities } = useSelector((state) => state.priorities);

  const openModalAddTask = () => {
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
    setEditingTask(null);
    setIsModalVisible(true);
  };

  const openModalUpdateTask = () => {
    setIsModalVisible(true);
  };

  const cancelModalTask = () => {
    setIsModalVisible(false);
    setEditingTask(null);
  };

  const visibleModalTask = (isVisible) => {
    setIsModalVisible(isVisible);
  };

  let priorityData = listPriorities.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return {
    openModalAddTask,
    openModalUpdateTask,
    cancelModalTask,
    isModalVisible,
    editingTask,
    formikRef,
    visibleModalTask,
    priorityData,
  };
};

export default useTasks;
