import React from 'react'
import { Layout, Space, Typography, Button } from 'antd'
import { PicLeftOutlined, PlusOutlined } from '@ant-design/icons'

import { Flex } from 'antd'
import { KanbanBoard } from '@/components/DragAndDrop/KanBanBoard'
import useTasks from '@/hooks/useTasks'
const { Content } = Layout
const { Title } = Typography

import ModalTask from '@/pages/TaskPage/components/ModalTask'
import { CardStyled } from '@/pages/TaskPage/styled'
import { useEffect } from 'react'
import { getPrioritiesRequest } from '@/sagas/priorities/prioritiesSlice'
import { useDispatch } from 'react-redux'

const TaskPage = () => {
  const dispatch = useDispatch()
  const initialFunction = () => {
    dispatch(getPrioritiesRequest())
  }
  useEffect(() => {
    initialFunction()
  }, [])
  const { openModalAddTask, openModalUpdateTask, cancelModalTask, isModalVisible, editingTask, formikRef, visibleModalTask } = useTasks()

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
          title='Task List'
          extra={
            <Button
              type='primary'
              icon={<PlusOutlined />}
              onClick={openModalAddTask}
              size='middle'
            >
              Add Task
            </Button>
          }
        >
          <KanbanBoard onEditTask={openModalUpdateTask} />
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
  )
}

export default TaskPage
