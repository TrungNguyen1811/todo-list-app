import { Button, Layout } from "antd";

import "./Header.scss";
import Navbar from "@/components/Navbar/Navbar";
import { Flex } from "antd";
import { Typography } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Input } from "antd";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

function Header({ collapsed, setCollapsed }) {
  return (
    <AntHeader className="app-header">
      <Flex
        align="center"
        gap="middle"
        justify="space-between"
        style={{ width: "100%" }}
      >
        <Button
          type="default"
          className="btn-collapse"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
        <Flex align="center" gap={8} justify="start">
          <Flex justify="center" align="center" gap={8}>
            <Flex vertical>
              <Typography.Text>
                {new Date().toLocaleString("en-US", { weekday: "long" })}
              </Typography.Text>
              <Typography.Text strong style={{ color: "#3e3232" }}>
                {new Date().toLocaleDateString()}
              </Typography.Text>
            </Flex>
            <Avatar
              style={{ backgroundColor: "#ff6867", verticalAlign: "middle" }}
              size="large"
              gap={10}
            >
              {"Đ"}
            </Avatar>
          </Flex>
        </Flex>
      </Flex>
    </AntHeader>
  );
}

export default Header;
