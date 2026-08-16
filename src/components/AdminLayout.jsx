import { NavLink } from 'react-router-dom'
import LogoutButton from './LogoutButton'

const links = [
  { to: '/admin/dashboard', label: 'Dashboard general' },
  { to: '/admin/alumnos', label: 'Gestión de alumnos' },
  { to: '/admin/escuelas', label: 'Gestión de escuelas' },
  { to: '/admin/excel', label: 'Carga de Excel' },
]

function AdminLayout({ children }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
      <aside className="flex w-full shrink-0 flex-col bg-slate-900 p-6 text-slate-50 lg:w-64 lg:min-h-screen">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Panel</p>
          <h2 className="mt-2 text-xl font-semibold">Administrador</h2>
          <p className="mt-2 text-sm text-slate-400">Acceso a las operaciones del sistema.</p>
        </div>

        <nav className="flex-1 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-sky-500 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t border-slate-700 pt-6">
        <LogoutButton
          showFinalizarAsistencia={false}
          className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
        />
        </div>
      </aside>

      <div className="flex-1 overflow-auto bg-slate-50 p-8">{children}</div>
    </div>
  )
}

export default AdminLayout
