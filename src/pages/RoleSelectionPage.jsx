import { Link } from 'react-router-dom'

const roles = [
  {
    title: 'Director',
    description: 'Seguimiento del cumplimiento de asistencia y listado de alumnos.',
    to: '/director/dashboard',
    accent: 'from-sky-500 to-cyan-500',
  },
  {
    title: 'Administrador',
    description: 'Panel general para escuelas, alumnos y carga de información.',
    to: '/admin/dashboard',
    accent: 'from-violet-500 to-fuchsia-500',
  },
]

function RoleSelectionPage() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Selecciona un rol</p>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">Bienvenido al panel del sistema</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-600">
        Elige la vista según el perfil con el que quieras trabajar.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {roles.map((role) => (
          <Link
            key={role.title}
            to={role.to}
            className={`rounded-3xl bg-gradient-to-br ${role.accent} p-[1px] shadow-sm transition hover:scale-[1.01]`}
          >
            <div className="rounded-[calc(1.5rem-1px)] bg-white p-6">
              <h2 className="text-xl font-semibold text-slate-900">{role.title}</h2>
              <p className="mt-3 text-sm text-slate-600">{role.description}</p>
              <span className="mt-4 inline-flex text-sm font-semibold text-sky-700">Ingresar →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default RoleSelectionPage
