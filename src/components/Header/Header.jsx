import { Button, Layout } from 'antd'

import './Header.scss'
import { Flex } from 'antd'
import { Typography } from 'antd'
import {
  CalendarOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'

import { Popover } from 'antd'
import { Calendar } from 'antd'

const { Header: AntHeader } = Layout

function Header({ collapsed, setCollapsed }) {
  return (
    <AntHeader className="app-header">
      <Flex
        align="center"
        gap="middle"
        justify="space-between"
        style={{ width: '100%' }}
      >
        <Button
          type="default"
          className="btn-collapse"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
        <Flex align="center" gap="middle">
          <Popover
            content={
              <div className="wrapper__calendar">
                <Calendar fullscreen={false} />
              </div>
            }
            trigger="hover"
            placement="bottomLeft"
          >
            <Button type="default" size="large">
              <CalendarOutlined style={{ fontSize: 20 }} />
            </Button>
          </Popover>
          <Flex align="center" gap={8} justify="start">
            <Flex justify="center" align="center" gap={8}>
              <Flex vertical>
                <Typography.Text strong>
                  {new Date().toLocaleString('en-US', { weekday: 'long' })}
                </Typography.Text>
                <Typography.Text strong style={{ color: '#ef1e56' }}>
                  {new Date().toLocaleDateString()}
                </Typography.Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </AntHeader>
  )
}

export default Header
