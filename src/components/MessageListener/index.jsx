import { useEffect } from 'react'
import { message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { clearMessage } from '@/sagas/appMessage/appMessageSlice'

const MessageListener = () => {
  const dispatch = useDispatch()
  const [messageApi, contextHolder] = message.useMessage()

  const msg = useSelector((state) => state.appMessage)

  useEffect(() => {
    if (msg) {
      messageApi.open({
        type: msg.type || 'info',
        content: msg.content,
      })
      dispatch(clearMessage())
    }
  }, [msg, dispatch, messageApi])

  return <>{contextHolder}</>
}

export default MessageListener
