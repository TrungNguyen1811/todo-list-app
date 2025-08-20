import { useNavigate } from "react-router-dom";

import { Layout, Menu, Button } from "antd";
import {
  BarChartOutlined,
  CalendarOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";

import "./Sidebar.scss";

const { Sider: AntSidebar } = Layout;

const sidebarList = [
  {
    key: "/",
    label: "Dashboard",
    icon: <BarChartOutlined style={{ fontSize: 20 }} />,
  },
  {
    key: "/tasks",
    label: "Tasks",
    icon: <ScheduleOutlined style={{ fontSize: 20 }} />,
  },
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  return (
    <AntSidebar
      className="sidebar"
      width={260}
      collapsed={collapsed}
      onCollapse={setCollapsed}
    >
      <div className="sidebar__logo">
        <CalendarOutlined
          className={`sidebar__logo-icon ${collapsed ? "collapsed" : ""}`}
        />
        {!collapsed && "TodoApp"}
      </div>
      <Menu
        theme="light"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={sidebarList}
        onClick={(info) => {
          navigate(info.key);
        }}
      />
    </AntSidebar>
  );
};

export default Sidebar;
