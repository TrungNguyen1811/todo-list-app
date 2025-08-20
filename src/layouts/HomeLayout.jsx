import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { Outlet } from 'react-router-dom'
import { Flex, Layout } from 'antd'
import Sidebar from '@/components/SideBar/SideBar'

function HomeLayout() {
  return (
    <Flex gap='middle' wrap>
      <Layout>
        <Header />
        <Layout>
          <Sidebar />
          <Outlet />
        </Layout>
        <Footer />
      </Layout>
    </Flex>
  )
}
export default HomeLayout
