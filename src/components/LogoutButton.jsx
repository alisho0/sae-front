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

  return (<div>
    <button className={`rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-800 `} onClick={() => alert('Funcionalidad de cierre de asistencia no implementada aún.')}>
      Finalizar asistencia
    </button>
    <button type="button" onClick={handleLogout} className={className}>
      Cerrar sesión
    </button>
  </div>
  )
}

export default LogoutButton
