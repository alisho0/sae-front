import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { loginUser } from '../store/slices/authSlice'
import { getRoleRoute, getUserRole } from '../utils/auth'

function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, user, isLoading, error } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  useEffect(() => {
    if (isAuthenticated && user) {
      const targetRoute = getRoleRoute(getUserRole(user))
      navigate(targetRoute, { replace: true })
    }
  }, [isAuthenticated, user, navigate])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const resultAction = await dispatch(loginUser(formData))

    if (loginUser.fulfilled.match(resultAction) && resultAction.payload?.token) {
      const nextUser = resultAction.payload.user || user
      const route = getRoleRoute(getUserRole(nextUser))
      navigate(route, { replace: true })
    }
  }

  if (isAuthenticated && user) {
    return <Navigate to={getRoleRoute(getUserRole(user))} replace />
  }

  return (
    <section className="mx-auto max-w-md">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Acceso</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">Iniciar sesión</h1>
        <p className="mt-2 text-slate-600">Ingresa tus credenciales para entrar al sistema.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label htmlFor="username" className="mb-1 block text-sm font-medium text-slate-700">
              Nombre de usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-sky-500"
              placeholder="CUE"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-sky-500"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-sky-600 px-4 py-3 font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-sky-300"
          >
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default LoginPage
