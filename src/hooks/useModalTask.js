import { useMemo } from "react";
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";

import { STATUS_OPTION } from "@/constants/status";
import {
  addTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from "@/sagas/task/taskSlice";
import { calculateNewIndex } from "@/utils/createIndex";

const useModalTask = ({
  formikRef,
  editingTask,
  isModalVisible,
  setIsModalVisible,
}) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { list, submitLoading, deleteLoading } = useSelector(
    (state) => state.task
  );
  const { listPriorities } = useSelector((state) => state.priorities);

  const modalTitle = editingTask ? "Edit Task" : "Add Task";

  // --- Derived data ---
  const priorityData = useMemo(
    () => listPriorities.map((item) => ({ value: item.id, label: item.name })),
    [listPriorities]
  );

  const initialValues = useMemo(
    () => ({
      title: editingTask?.title || "",
      description: editingTask?.description || "",
      status: editingTask?.status || STATUS_OPTION?.[0]?.value || "incomplete",
      priorityId: editingTask?.priorityId || priorityData?.at(-1)?.value || "",
    }),
    [editingTask, priorityData]
  );

  const validationSchema = useMemo(
    () =>
      Yup.object({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        status: Yup.string().required("Status is required"),
        priorityId: Yup.string().required("Priority is required"),
      }),
    []
  );

  // --- Callbacks ---
  const afterActionTask = useCallback(() => {
    setIsModalVisible(false);
    dispatch(getTasksRequest());
  }, [setIsModalVisible]);

  const submitForm = useCallback(
    async (values) => {
      const newIndex = calculateNewIndex(list, values.status);

      if (editingTask) {
        dispatch(
          updateTaskRequest({
            values: {
              ...values,
              id: editingTask.id,
              userId: user.id,
              index: editingTask.index,
            },
            meta: { callback: afterActionTask },
          })
        );
      } else {
        dispatch(
          addTaskRequest({
            values: { ...values, userId: user.id, index: newIndex },
            meta: { callback: afterActionTask },
          })
        );
      }
    },
    [dispatch, editingTask, list, user.id, afterActionTask]
  );

  const customOnChange = useCallback(
    (fieldName, setFieldValue) => (value) => {
      setFieldValue(fieldName, value);
    },
    []
  );

  const handleDeleteTask = useCallback(
    (taskId) => {
      dispatch(
        deleteTaskRequest({
          id: taskId,
          meta: { callback: afterActionTask },
        })
      );
    },
    [dispatch, afterActionTask]
  );

  // --- Effects ---
  useEffect(() => {
    if (!isModalVisible && formikRef?.current) {
      formikRef.current.resetForm();
    }
  }, [isModalVisible, formikRef]);

  // --- Return ---
  return {
    modalTitle,
    initialValues,
    validationSchema,
    submitLoading,
    deleteLoading,
    priorityData,
    customOnChange,
    submitForm,
    handleDeleteTask,
  };
};

export default useModalTask;
