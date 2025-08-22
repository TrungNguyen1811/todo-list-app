import React from 'react'
import {
  Layout,
  Card,
  List,
  Progress,
  Tag,
  Space,
  Row,
  Col,
  Statistic,
  Typography,
} from 'antd'
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  CalendarOutlined,
  BarChartOutlined,
  FireOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons'

import './Dashboard.scss'
import { Flex } from 'antd'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getTasksRequest } from '@/sagas/task/taskSlice'
import { PRIORITY_COLOR, STATUS_COLOR, STATUS_TEXT } from '@/constants/status'
import { useMemo } from 'react'
import { Spin } from 'antd'
import { theme } from 'antd'
import { Empty } from 'antd'
const { Content } = Layout
const { Title, Text } = Typography

const Dashboard = () => {
  const { list: tasks, loading } = useSelector((state) => state.task)
  const dispatch = useDispatch()
  const {
    token: { colorComplete, colorInProgress, colorInComplete },
  } = theme.useToken()
  useEffect(() => {
    dispatch(getTasksRequest())
  }, [dispatch])

  const { todayTasks, allStats } = useMemo(() => {
    const todayTasks = tasks.filter((task) => {
      const today = new Date().toLocaleDateString()
      return (
        task?.createdAt &&
        new Date(task.createdAt).toLocaleDateString() === today
      )
    })

    const total = tasks.length
    const completed = tasks.filter((task) => task.status === 'completed').length
    const inProgress = tasks.filter(
      (task) => task.status === 'inprogress'
    ).length
    const inComplete = tasks.filter(
      (task) => task.status === 'incomplete'
    ).length
    const overdue = tasks.filter(
      (task) =>
        new Date(task.dueDate) < new Date() && task.status !== 'completed'
    ).length

    const allStats = { total, completed, inProgress, inComplete, overdue }

    return { todayTasks, allStats }
  }, [tasks])

  const todayStats = useMemo(() => {
    const total = todayTasks.length
    const completed = todayTasks.filter(
      (task) => task.status === 'completed'
    ).length
    const inProgress = todayTasks.filter(
      (task) => task.status === 'inprogress'
    ).length
    const inComplete = todayTasks.filter(
      (task) => task.status === 'incomplete'
    ).length
    return {
      total,
      completed,
      inProgress,
      inComplete,
      completedPercent: total > 0 ? Math.round((completed / total) * 100) : 0,
      inProgressPercent: total > 0 ? Math.round((inProgress / total) * 100) : 0,
      inCompletePercent: total > 0 ? Math.round((inComplete / total) * 100) : 0,
    }
  }, [todayTasks])
  return (
    <Layout style={{ minHeight: '100vh' }} className="dashboard">
      <Flex className="dashboard-header">
        <Title level={2} className="dashboard-title">
          <Space>
            <BarChartOutlined />
            Dashboard
          </Space>
        </Title>
      </Flex>
      <Spin size="default" spinning={loading}>
        <Content className="dashboard-content">
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Card>
                <Statistic
                  title="Total Tasks"
                  value={allStats.total}
                  prefix={<BarChartOutlined />}
                  valueStyle={{ color: '#1890ff', fontWeight: 'bold' }}
                  suffix="tasks"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Card>
                <Statistic
                  title="Completed"
                  value={allStats.completed}
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: colorComplete, fontWeight: 'bold' }}
                  suffix="tasks"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Card>
                <Statistic
                  title="In Complete"
                  value={allStats.inComplete}
                  prefix={<MinusCircleOutlined />}
                  valueStyle={{ color: colorInComplete, fontWeight: 'bold' }}
                  suffix="tasks"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Card>
                <Statistic
                  title="In Progress"
                  value={allStats.inProgress}
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{ color: colorInProgress, fontWeight: 'bold' }}
                  suffix="tasks"
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} lg={8}>
              <Card
                title={
                  <Space>
                    <CalendarOutlined />
                    Today's Progress
                  </Space>
                }
                style={{ height: '100%' }}
              >
                <div className="today-progress">
                  <Progress
                    type="circle"
                    percent={todayStats.completedPercent}
                    format={(percent) => `${percent}%`}
                    size={120}
                    strokeColor={colorComplete}
                  />
                  <Text className="today-progress__text">
                    {todayStats.total} Tasks Today
                  </Text>
                </div>

                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <div className="today-progress__stat">
                      <Text>Completed</Text>
                      <Text strong>{todayStats.completed}</Text>
                    </div>
                    <Progress
                      percent={todayStats.completedPercent}
                      strokeColor={colorComplete}
                      showInfo={false}
                    />
                  </div>
                  <div>
                    <div className="today-progress__stat">
                      <Text>In Progress</Text>
                      <Text strong>{todayStats.inProgress}</Text>
                    </div>
                    <Progress
                      percent={todayStats.inProgressPercent}
                      strokeColor={colorInProgress}
                      showInfo={false}
                    />
                  </div>
                  <div>
                    <div className="today-progress__stat">
                      <Text>In Complete</Text>
                      <Text strong>{todayStats.inComplete}</Text>
                    </div>
                    <Progress
                      percent={todayStats.inCompletePercent}
                      strokeColor={colorInComplete}
                      showInfo={false}
                    />
                  </div>
                </Space>
              </Card>
            </Col>

            <Col xs={24} lg={16}>
              <Card
                title={
                  <Space>
                    <FireOutlined />
                    Today's Tasks
                  </Space>
                }
                className="task-card"
              >
                {todayTasks.length === 0 ? (
                  <div className="task-card__empty">
                    <Empty description="No tasks scheduled for today!" />
                  </div>
                ) : (
                  <List
                    size="small"
                    dataSource={todayTasks}
                    className="task-list"
                    renderItem={(task) => (
                      <List.Item className="task-item">
                        <List.Item.Meta
                          className="task-item__meta"
                          avatar={
                            <Tag
                              className="task-item__status-tag"
                              color={STATUS_COLOR?.[task.status] || 'default'}
                              icon={
                                task.status === 'completed' ? (
                                  <CheckCircleOutlined className="task-item__status-icon" />
                                ) : task.status === 'inprogress' ? (
                                  <ClockCircleOutlined classID="task-item__status-icon" />
                                ) : (
                                  <ExclamationCircleOutlined className="task-item__status-icon" />
                                )
                              }
                            />
                          }
                          title={
                            <Flex gap={6}>
                              <Text
                                style={{
                                  fontSize: '14px',
                                  textDecoration:
                                    task.status === 'completed'
                                      ? 'line-through'
                                      : 'none',
                                  opacity:
                                    task.status === 'completed' ? 0.6 : 1,
                                }}
                                ellipsis={{ tooltip: task.title }}
                              >
                                {task?.title}
                              </Text>
                              <Tag color={task?.priorities?.color || 'default'}>
                                {task?.priorities?.name &&
                                  task.priorities.name.toUpperCase()}
                              </Tag>
                              <Tag
                                size="small"
                                color={STATUS_COLOR?.[task.status] || 'default'}
                              >
                                {STATUS_TEXT?.[task.status] || task.status}
                              </Tag>
                            </Flex>
                          }
                          description={<Text>{task?.description}</Text>}
                        />
                      </List.Item>
                    )}
                  />
                )}
              </Card>
            </Col>
          </Row>
        </Content>
      </Spin>
    </Layout>
  )
}

export default Dashboard
