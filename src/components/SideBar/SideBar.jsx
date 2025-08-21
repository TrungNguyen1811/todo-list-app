import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  BarChartOutlined,
  CalendarOutlined,
  LogoutOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { signOut } from "@/sagas/users/userSlice";

import "./Sidebar.scss";

const { Sider: AntSidebar } = Layout;

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleMenuClick = ({ key }) => {
    if (key === "signout") {
      dispatch(signOut());
      navigate("/sign-in");
    } else {
      navigate(key);
    }
  };

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
    {
      type: "divider",
    },
    {
      key: "signout",
      label: "Sign out",
      icon: <LogoutOutlined style={{ fontSize: 20 }} />,
    },
  ];

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
        mode="inline"
        selectedKeys={[location.pathname]}
        items={sidebarList}
        onClick={handleMenuClick}
      />
    </AntSidebar>
  );
};

export default Sidebar;
