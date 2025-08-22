import React, { useState, useEffect } from "react";
import {
  Layout,
  Card,
  Space,
  Typography,
  Button,
  Table,
  Modal,
  Form,
  Input,
  Select,
  ColorPicker,
  Popconfirm,
  Tooltip,
  Badge,
} from "antd";
import {
  PicLeftOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { Flex } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import FormItem from "antd/es/form/FormItem";
import { useRef } from "react";
import { KanbanBoard } from '@/components/DragAndDrop/KanBanBoard';
import { addTaskRequest, deleteTaskRequest, getTasksRequest, updateTaskRequest } from '@/sagas/task/taskSlice';
import { getPrioritiesRequest } from '@/sagas/priorities/prioritiesSlice';
import { calculateNewIndex } from '@/utils/createIndex';
const { Content } = Layout;
const { Title, Text } = Typography;

import "./index.scss";


const TaskPage = () => {
  const dispatch = useDispatch();
  const formikRef = useRef();
  const { list, loading, actionLoading } = useSelector(
    (state) => state.task
  );

  const { listPriorities  } = useSelector(
      (state) => state.priorities
  );

  const { user  } = useSelector(
      (state) => state.user
  );


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [status, setStatus] = useState(null)

  const statusData = [
    { value: 'incomplete', label: 'incomplete' }, 
    { value: 'inprogress', label: 'inprogress'}, 
    { value: 'completed', label: 'completed' }
  ];

  const priorityData = listPriorities.map((item) => ({
    value: item.id,
    label: item.name
  }));

  const newIndex = calculateNewIndex(list, status); 

  useEffect(() => {
    dispatch(getTasksRequest());
    dispatch(getPrioritiesRequest());
  }, [dispatch]);

  const handleAddTask = () => {
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
    setEditingTask(null);
    setIsModalVisible(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalVisible(true);
  };

  const handleDeleteTask = (taskId) => {
    dispatch(
      deleteTaskRequest({
        id: taskId,
        meta: {
          callback: () => {
            dispatch(getTasksRequest());
          },
        },
      })
    );
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingTask(null);
  };

  const submitForm = (values) => {
    if (editingTask) {
      dispatch(
        updateTaskRequest({
          values: { ...values, id: editingTask.id, userId: user.id, index: newIndex},
          meta: {
            callback: () => {
              setIsModalVisible(false);
              dispatch(getTasksRequest());
            },
          },
        })
      );
    } else {
      dispatch(
        addTaskRequest({
          values: {...values, userId: user.id, index: newIndex},
          meta: {
            callback: () => {
              setIsModalVisible(false);
              dispatch(getTasksRequest());
            },
          },
        })
      );
    }
  };


  return (
    <Layout style={{ minHeight: "100vh" }} className="dashboard">
      <Flex className="dashboard-header">
        <Title level={2} className="dashboard-title">
          <Space>
            <PicLeftOutlined />
            Task Management
          </Space>
        </Title>
      </Flex>

      <Content className="">
        <Card
          title="Task List"
          className="task-management-card"
          extra={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddTask}
              size="middle"
            >
              Add Task
            </Button>
          }
        >
          <KanbanBoard />
        </Card>
      </Content>

      <Modal
        title={editingTask ? "Edit Task" : "Add New Task"}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
        width={600}
      >
        <Formik
          innerRef={formikRef}
          enableReinitialize
          initialValues={{
            title: editingTask ? editingTask.title : "",
            description: editingTask ? editingTask.description : "",
            status: editingTask ? editingTask.status : "",
            priorityId: editingTask ? editingTask.priorityId : "",
          }}
          validationSchema={Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
            status: Yup.string().required('Status is required'),
            priorityId: Yup.string().required('Priority is required'),
          })}
          onSubmit={submitForm}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <Form onFinish={handleSubmit} labelCol={{ span: 4 }} noValidate>
              <FormItem
                required
                label="Tile"
                help={errors.title && touched.title && errors.title}
                validateStatus={errors.title && touched.title ? "error" : ""}
              >
                <Input
                  type="title"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
              </FormItem>

              <FormItem
                required
                label="Description"
                help={
                  errors.description &&
                  touched.description &&
                  errors.description
                }
                validateStatus={
                  errors.description && touched.description ? "error" : ""
                }
              >
                <Input
                  type="description"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
              </FormItem>

              <FormItem
                required
                label="Status"
                help={errors.status && touched.status && errors.status}
                validateStatus={errors.status && touched.status ? "error" : ""}
              >
                <Select
                  name='status'
                  value={values.status}
                  style={{ width: 120 }}
                  onChange={(status) => {
                    setFieldValue('status', status)
                    setStatus(status)
                  }}
                  options={statusData}
                />
              </FormItem>

              <FormItem
                required
                label="Priority"
                help={errors.priorityId && touched.priorityId && errors.priorityId}
                validateStatus={errors.priorityId && touched.priorityId ? "error" : ""}
              >
                <Select
                  name='priorityId'
                  value={values.priorityId}
                  style={{ width: 120 }}
                  onChange={(priorityId) => {
                    setFieldValue('priorityId', priorityId)
                  }}
                  options={priorityData}
                />
              </FormItem>

              <Form.Item label={null}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={actionLoading}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </Modal>
    </Layout>
  );
};

export default TaskPage;
