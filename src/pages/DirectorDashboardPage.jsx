import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { openModal } from '../store/slices/modalSlice'
import { getAlumnosByEscuelaId, updateAsistencia } from '../store/slices/alumnosSlice'
import { traerEscuelaPorId } from '../store/slices/escuelasSlice'
import { getEscuelaIdFromUser } from '../utils/auth'

function DirectorDashboardPage() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const escuelaId = getEscuelaIdFromUser(user)
  const {
    items: alumnos
  } = useSelector((state) => state.alumnos)
  const totalAlumnos = alumnos.length
  const asistencia = alumnos.filter((alumno) => alumno.cumpleAsistencia).length
  const closed = asistencia >= 3

  useEffect(() => {
    if (!escuelaId) return

    dispatch(traerEscuelaPorId(escuelaId))
    dispatch(getAlumnosByEscuelaId(escuelaId))
  }, [dispatch, escuelaId])
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Director</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Dashboard del director</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Alumnos cargados</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{totalAlumnos}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Cumplen 80% de asistencia</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{asistencia}</p>
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
            onClick={() => dispatch(openModal({ type: 'crearAlumno', payload: null }))}
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
                <th className="px-4 py-3">Fecha de nacimiento</th>
                <th className="px-4 py-3">Curso</th>
                <th className="px-4 py-3">Localidad</th>
                <th className="px-4 py-3">80% asistencia</th>
                <th className="px-4 py-3">Acción</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((a) => {
                const formattedDate = a.nacimiento ? new Date(a.nacimiento).toLocaleDateString('es-AR') : 'N/A';
                return (
                <tr key={a.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 text-slate-800">{a.nombre}</td>
                  <td className="px-4 py-3 text-slate-800">{a.apellido}</td>
                  <td className="px-4 py-3 text-slate-800">{a.dni}</td>
                  <td className="px-4 py-3 text-slate-800">{formattedDate}</td>
                  <td className="px-4 py-3 text-slate-800">{a.curso}</td>
                  <td className="px-4 py-3 text-slate-800">{a.localidad}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(
                          updateAsistencia({
                            id: a.id,
                            cumpleAsistencia: !a.cumpleAsistencia,
                          }),
                        )
                      }
                      className={`rounded-full px-3 py-1 text-xs font-semibold cursor-pointer transition ${a.cumpleAsistencia ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'}`}
                    >
                      {a.cumpleAsistencia ? 'Sí' : 'No'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(openModal({ type: 'editarAlumno', payload: a }))
                      }
                      className="text-sm cursor-pointer hover:bg-sky-300/30 px-2 py-1 rounded-2xl transition font-semibold text-sky-700 hover:text-sky-900"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default DirectorDashboardPage
