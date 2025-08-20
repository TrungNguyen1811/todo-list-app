import Header from "@/components/Header/Header";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "@/components/SideBar/SideBar";
import { useState } from "react";

import "./HomeLayout.scss";
import Footer from "@/components/Footer/Footer";

function HomeLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout className="home-layout">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout.Content className="home-layout__content">
          <Outlet />
        </Layout.Content>
        <Footer />
      </Layout>
    </Layout>
  );
}
export default HomeLayout;
