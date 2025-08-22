import { useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
  BarChartOutlined,
  CalendarOutlined,
  PicLeftOutlined,
  LogoutOutlined,
  ScheduleOutlined,
  UserOutlined,
} from '@ant-design/icons'

import { useDispatch } from 'react-redux'
import { signOut } from '@/sagas/users/userSlice'

import './Sidebar.scss'
import { Avatar } from 'antd'
import { Flex } from 'antd'
import { Typography } from 'antd'
import { useSelector } from 'react-redux'

const { Sider: AntSidebar } = Layout

const Sidebar = ({ collapsed, setCollapsed }) => {
  const { user } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const handleMenuClick = ({ key }) => {
    if (key === 'signout') {
      dispatch(signOut())
      localStorage.removeItem('user')
      navigate('/sign-in')
    } else {
      navigate(key)
    }
  }

  const sidebarList = [
    {
      key: '/',
      label: 'Dashboard',
      icon: <BarChartOutlined style={{ fontSize: 20 }} />,
    },
    {
      key: '/tasks',
      label: 'Tasks',
      icon: <ScheduleOutlined style={{ fontSize: 20 }} />,
    },
    {
      key: '/priority',
      label: 'Priority',
      icon: <PicLeftOutlined style={{ fontSize: 20 }} />,
    },
    {
      type: 'divider',
    },
    {
      key: 'signout',
      label: 'Sign out',
      icon: <LogoutOutlined style={{ fontSize: 20 }} />,
    },
  ]

  return (
    <AntSidebar
      className="sidebar"
      width={260}
      collapsed={collapsed}
      onCollapse={setCollapsed}
    >
      <div className="sidebar__logo">
        <CalendarOutlined
          className={`sidebar__logo-icon ${collapsed ? 'collapsed' : ''}`}
        />
        {!collapsed && 'TodoApp'}
      </div>
      <Flex
        align="start"
        gap={8}
        className={`sidebar__user ${collapsed ? 'collapsed' : ''}`}
      >
        <Avatar
          size={48}
          icon={<span>{user && user?.lastName.at(0).toUpperCase()}</span>}
          className="sidebar__avatar"
        />
        {!collapsed && (
          <>
            <Flex vertical justify="center" align="start">
              <Typography.Text strong className="sidebar__name">
                {user && `${user?.firstName} ${user?.lastName}`}
              </Typography.Text>
              <Typography.Text className="sidebar__email">
                {user && user?.email}
              </Typography.Text>
            </Flex>
          </>
        )}
      </Flex>

      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={sidebarList}
        onClick={handleMenuClick}
      />
    </AntSidebar>
  )
}

export default Sidebar
