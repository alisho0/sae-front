const schools = [
  { id: 1, name: 'Escuela Norte', cue: '70012345', closed: true },
  { id: 2, name: 'Escuela Sur', cue: '70012346', closed: false },
  { id: 3, name: 'Escuela Oeste', cue: '70012347', closed: true },
]

function AdminSchoolsPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">Administrador</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Gestión de escuelas</h1>
        <p className="mt-3 text-slate-600">Listado de escuelas con su estado de cierre de asistencia.</p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">CUE</th>
                <th className="px-4 py-3">Cerró listado</th>
              </tr>
            </thead>
            <tbody>
              {schools.map((school) => (
                <tr key={school.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 text-slate-800">{school.name}</td>
                  <td className="px-4 py-3 text-slate-800">{school.cue}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${school.closed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {school.closed ? 'Sí' : 'No'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default AdminSchoolsPage
