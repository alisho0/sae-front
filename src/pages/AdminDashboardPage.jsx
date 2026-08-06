const stats = [
  { label: 'Escuelas cargadas', value: '12', detail: 'Total activo' },
  { label: 'Escuelas con asistencia cerrada', value: '8', detail: '66% del total' },
  { label: 'Escuelas sin cerrar', value: '4', detail: 'Requieren seguimiento' },
]

const quickLinks = [
  { title: 'Gestión de alumnos', description: 'Administrar alumnado de todas las escuelas.', to: '/admin/alumnos' },
  { title: 'Gestión de escuelas', description: 'Ver datos y estado de cada escuela.', to: '/admin/escuelas' },
  { title: 'Carga de Excel', description: 'Importar información nueva en un solo paso.', to: '/admin/excel' },
]

function AdminDashboardPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">Administrador</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Dashboard general</h1>
        <p className="mt-3 text-slate-600">Resumen operativo de escuelas y estados de asistencia.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{item.value}</p>
            <p className="mt-2 text-sm text-slate-500">{item.detail}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Acceso rápido</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {quickLinks.map((link) => (
            <a key={link.title} href={link.to} className="rounded-2xl border border-slate-200 p-4 transition hover:border-violet-400 hover:bg-violet-50">
              <h3 className="font-semibold text-slate-900">{link.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{link.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AdminDashboardPage
