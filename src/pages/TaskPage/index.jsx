import React, { useState } from "react";
import { Layout, Space, Typography, Button, Flex, Input, Select } from "antd";
import {
  PicLeftOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import { KanbanBoard } from "@/components/DragAndDrop/KanBanBoard";
import useTasks from "@/hooks/useTasks";
const { Content } = Layout;
const { Title } = Typography;

import ModalTask from "@/pages/TaskPage/components/ModalTask";
import { CardStyled, SelectStyled } from "@/pages/TaskPage/styled";
import { useEffect } from "react";
import { getPrioritiesRequest } from "@/sagas/priorities/prioritiesSlice";
import { useDispatch } from "react-redux";
import { getTasksRequest } from "@/sagas/task/taskSlice";
import { useSelector } from "react-redux";

const TaskPage = () => {
  const dispatch = useDispatch();
  const initialFunction = () => {
    dispatch(getPrioritiesRequest());
  };
  const [filter, setFilter] = useState({ priorityId: 0, keyword: "" });
  const { list: tasks } = useSelector((state) => state.task);

  useEffect(() => {
    initialFunction();
  }, []);

  const {
    openModalAddTask,
    openModalUpdateTask,
    cancelModalTask,
    isModalVisible,
    editingTask,
    formikRef,
    visibleModalTask,
    priorityData,
  } = useTasks();

  // const handleEditTask = (task) => {
  //   openModalUpdateTask(task);
  // };

  const handlePriorityChange = (value) => {
    setFilter((prev) => ({ ...prev, priorityId: value }));
  };

  const handleSearch = (e) => {
    setFilter((prev) => ({ ...prev, keyword: e.target.value }));
  };

  useEffect(() => {
    const params = {};

    if (filter.priorityId) params.priorityId = filter.priorityId;
    if (filter.keyword) params.keyword = filter.keyword;

    const timeout = setTimeout(() => {
      dispatch(getTasksRequest(params));
    }, 500);

    return () => clearTimeout(timeout);
  }, [dispatch, filter]);

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

      <Content>
        <CardStyled
          title="Task List"
          extra={
            <Space>
              <SelectStyled
                options={[
                  {
                    value: 0,
                    label: "All",
                  },
                  ...priorityData,
                ]}
                value={filter.priorityId}
                onChange={handlePriorityChange}
              />
              <Input
                placeholder="Search tasks..."
                allowClear
                prefix={<SearchOutlined />}
                value={filter.keyword}
                onChange={handleSearch}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={openModalAddTask}
                size="middle"
              >
                Add Task
              </Button>
            </Space>
          }
        >
          {tasks.length > 0 ? (
            <KanbanBoard onEditTask={openModalUpdateTask} />
          ) : (
            <Typography.Text type="secondary">Task not found</Typography.Text>
          )}
        </CardStyled>
      </Content>

      <ModalTask
        formikRef={formikRef}
        editingTask={editingTask}
        isModalVisible={isModalVisible}
        cancelModalTask={cancelModalTask}
        setIsModalVisible={visibleModalTask}
      />
    </Layout>
  );
};

export default TaskPage;
