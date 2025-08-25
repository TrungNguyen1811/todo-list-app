import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const AuthRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true })
    }
  }, [user, navigate])
  if (!user) return children
}

export default AuthRoute
