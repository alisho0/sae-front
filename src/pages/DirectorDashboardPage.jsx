import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../store/slices/modalSlice'
import { updateStudent } from '../store/slices/alumnosSlice'

function DirectorDashboardPage() {
  const dispatch = useDispatch()
  const students = useSelector((state) => state.alumnos)
  const totalStudents = students.length
  const attendance80 = students.filter((student) => student.attendance).length
  const closed = attendance80 >= 3

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Director</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Dashboard del director</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Alumnos cargados</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{totalStudents}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Cumplen 80% de asistencia</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{attendance80}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Asistencia cerrada</p>
          <p className={`mt-2 text-2xl font-semibold ${closed ? 'text-emerald-600' : 'text-amber-600'}`}>
            {closed ? 'Sí' : 'No'}
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Listado de alumnos</h2>
            <p className="text-sm text-slate-500">Panel de seguimiento del director.</p>
          </div>
          <button
            type="button"
            onClick={() => dispatch(openModal({ type: 'createStudent', payload: null }))}
            className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            Agregar alumno nuevo
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Apellido</th>
                <th className="px-4 py-3">DNI</th>
                <th className="px-4 py-3">Curso</th>
                <th className="px-4 py-3">Fecha de nacimiento</th>
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
                  <td className="px-4 py-3 text-slate-800">{student.course}</td>
                  <td className="px-4 py-3 text-slate-800">{student.birthDate}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(
                          updateStudent({
                            id: student.id,
                            attendance: !student.attendance,
                          }),
                        )
                      }
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition ${student.attendance ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'}`}
                    >
                      {student.attendance ? 'Sí' : 'No'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(openModal({ type: 'editStudent', payload: student }))
                      }
                      className="text-sm font-semibold text-sky-700 hover:text-sky-900"
                    >
                      Editar
                    </button>
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

export default DirectorDashboardPage
