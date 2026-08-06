import { NavLink } from 'react-router-dom'

const links = [
  { to: '/admin/dashboard', label: 'Dashboard general' },
  { to: '/admin/alumnos', label: 'Gestión de alumnos' },
  { to: '/admin/escuelas', label: 'Gestión de escuelas' },
  { to: '/admin/excel', label: 'Carga de Excel' },
]

function AdminLayout({ children }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="rounded-3xl border border-slate-200 bg-slate-900 p-5 text-slate-50 shadow-sm">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Panel</p>
          <h2 className="mt-2 text-xl font-semibold">Administrador</h2>
          <p className="mt-2 text-sm text-slate-400">Acceso a las operaciones del sistema.</p>
        </div>

        <nav className="space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
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
      </aside>

      <div>{children}</div>
    </div>
  )
}

export default AdminLayout
