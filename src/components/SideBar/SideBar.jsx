import { Layout, Menu, Button } from 'antd'
import {
  AppstoreOutlined,
  FilterOutlined,
  PlusOutlined,
  ProjectOutlined,
} from '@ant-design/icons'

import './Sidebar.scss'

const { Sider: AntSidebar } = Layout

const Sidebar = () => {
  return (
    <AntSidebar className='sidebar' width={220}>
      <div className='sidebar__logo'>TodoApp</div>

      {/* Boards */}
      <Menu mode='inline' defaultSelectedKeys={['1']} items={[]}>
        {/* <Menu.SubMenu key='boards' icon={<ProjectOutlined />} title='Boards' }> */}
      
        {/* </Menu.SubMenu> */}

        {/* Filters */}
        {/* <Menu.SubMenu key='filters' icon={<FilterOutlined />} title='Filters' items={[]}> */}
      
        {/* </Menu.SubMenu> */}
      </Menu>

      {/* Add Task button */}
      {/* <div className='sidebar__actions'>
        <Button type='primary' icon={<PlusOutlined />} block>
          Add Task
        </Button>
      </div> */}
    </AntSidebar>
  )
}

export default Sidebar
