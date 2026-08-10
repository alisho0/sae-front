import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../store/slices/authSlice'

function LogoutButton({ className = '' }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login', { replace: true })
  }

  return (
    <button type="button" onClick={handleLogout} className={className}>
      Cerrar sesión
    </button>
  )
}

export default LogoutButton
