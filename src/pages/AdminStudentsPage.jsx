const students = [
  {
    id: 1,
    name: 'Lucía',
    lastName: 'Mendoza',
    dni: '40123466',
    school: 'Escuela Norte',
    course: '4° A',
    attendance: 'Sí',
  },
  {
    id: 2,
    name: 'Carlos',
    lastName: 'Díaz',
    dni: '40123467',
    school: 'Escuela Sur',
    course: '5° B',
    attendance: 'No',
  },
  {
    id: 3,
    name: 'Ana',
    lastName: 'Vega',
    dni: '40123468',
    school: 'Escuela Oeste',
    course: '6° C',
    attendance: 'Sí',
  },
]

function AdminStudentsPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">Administrador</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Gestión de alumnos</h1>
        <p className="mt-3 text-slate-600">Listado general de alumnos para todas las escuelas.</p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Alumnos registrados</h2>
          <button className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700">
            Nuevo alumno
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Apellido</th>
                <th className="px-4 py-3">DNI</th>
                <th className="px-4 py-3">Escuela</th>
                <th className="px-4 py-3">Curso</th>
                <th className="px-4 py-3">80% asistencia</th>
                <th className="px-4 py-3">Acción</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 text-slate-800">{student.name}</td>
                  <td className="px-4 py-3 text-slate-800">{student.lastName}</td>
                  <td className="px-4 py-3 text-slate-800">{student.dni}</td>
                  <td className="px-4 py-3 text-slate-800">{student.school}</td>
                  <td className="px-4 py-3 text-slate-800">{student.course}</td>
                  <td className="px-4 py-3 text-slate-800">{student.attendance}</td>
                  <td className="px-4 py-3">
                    <button className="text-sm font-semibold text-violet-700 hover:text-violet-900">Editar</button>
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

export default AdminStudentsPage
