import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import './Navbar.scss'

const items = [
  { key: '1', label: 'Home' },
  { key: '2', label: 'About' },
  { key: '3', label: 'Contact' },
]

function Navbar() {
  return (
    <Menu
      mode='horizontal'
      items={items}
      className='app-nav'
      selectable={false}
    />
  )
}

export default Navbar
