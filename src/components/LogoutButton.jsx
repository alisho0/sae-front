import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../store/slices/authSlice'
import { notifyError, notifySuccess } from '../utils/notifications'
import { finalizarAsistencia } from '../store/slices/escuelasSlice'
import { getEscuelaIdFromUser } from '../utils/auth'

function LogoutButton({ className = '', showFinalizarAsistencia = false }) {
  const { user } = useSelector((state) => state.auth)
  const { escuela } = useSelector((state) => state.escuelas)
  const dispatch = useDispatch()
  const escuelaId = getEscuelaIdFromUser(user)
  const navigate = useNavigate()
  const [showConfirm, setShowConfirm] = useState(false)
  const asistenciaCompletada = Boolean(escuela?.asistenciaCompletada)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login', { replace: true })
  }

  const handleConfirmFinalizarAsistencia = async () => {
    setShowConfirm(false)

    try {
      await dispatch(finalizarAsistencia(escuelaId)).unwrap()
      notifySuccess('La asistencia se cerró correctamente.')
    } catch (error) {
      notifyError(typeof error === 'string' ? error : 'No se pudo cerrar la asistencia.')
    }
  }

  return (
    <>
      <div className={showFinalizarAsistencia ? 'flex items-center gap-3' : undefined}>
        {showFinalizarAsistencia && !asistenciaCompletada && (
          <button
            type="button"
            className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-800"
            onClick={() => setShowConfirm(true)}
          >
            Finalizar asistencia
          </button>
        )}
        <button type="button" onClick={handleLogout} className={className}>
          Cerrar sesión
        </button>
      </div>

      {showConfirm &&
        createPortal(
          <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/70 px-4">
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">Confirmación</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Finalizar asistencia</h2>
              <p className="mt-3 text-sm text-slate-600">
                ¿Estás seguro de que deseas finalizar la asistencia? Esta acción cerrará el período de
                carga y no podrás modificar los registros.
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowConfirm(false)}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmFinalizarAsistencia}
                  className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Sí, finalizar
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}

export default LogoutButton
