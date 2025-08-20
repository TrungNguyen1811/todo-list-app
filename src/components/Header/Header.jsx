import { Layout } from 'antd'

import './Header.scss'
import Navbar from '@/components/Navbar/Navbar'

const { Header: AntHeader } = Layout

function Header() {
  return (
    <AntHeader className='app-header'>
      <div className='app-header__logo'>MyLogo</div>
      <Navbar />
    </AntHeader>
  )
}

export default Header
