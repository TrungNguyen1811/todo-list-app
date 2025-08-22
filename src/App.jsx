import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router.jsx'
import { ConfigProvider } from 'antd'
import MessageListener from './components/MessageListener'

function App() {
  return (
    <ConfigProvider
      theme={{
        cssVar: true,
        token: {
          colorPrimary: '#0463e8',
          colorComplete: '#52c41a',
          colorInProgress: '#faad14',
          colorInComplete: '#f5222d',
        },
        components: {
          Menu: {
            itemHeight: 48,
            itemPaddingInline: 24,
            fontSize: 16,
            iconSize: 18,
          },
        },
      }}
    >
      <RouterProvider router={router} />
      <MessageListener />
    </ConfigProvider>
  )
}

export default App
