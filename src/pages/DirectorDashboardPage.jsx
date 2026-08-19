import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { openModal } from '../store/slices/modalSlice'
import { getAlumnosByEscuelaId, updateAsistencia } from '../store/slices/alumnosSlice'
import { traerEscuelaPorId } from '../store/slices/escuelasSlice'
import { getEscuelaIdFromUser } from '../utils/auth'

function DirectorDashboardPage() {
  const dispatch = useDispatch()
  const { escuela } = useSelector((state) => state.escuelas)
  const user = useSelector((state) => state.auth.user)
  const escuelaId = getEscuelaIdFromUser(user)
  const { items: alumnos } = useSelector((state) => state.alumnos)
  const asistenciaCompletada = Boolean(escuela?.asistenciaCompletada)
  const totalAlumnos = alumnos.length
  const asistencia = alumnos.filter((alumno) => alumno.cumpleAsistencia).length

  useEffect(() => {
    if (!escuelaId) return

    dispatch(traerEscuelaPorId(escuelaId))
    dispatch(getAlumnosByEscuelaId(escuelaId))
  }, [dispatch, escuelaId])

  return (
    <section className="space-y-6 px-1 sm:px-0">
      <div>
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Director</p>
        <h1 className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold text-slate-900">Dashboard</h1>
        {asistenciaCompletada && (
          <p className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs sm:text-sm text-emerald-800">
            La asistencia de esta escuela ya fue finalizada. El listado está en modo solo lectura.
          </p>
        )}
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
          <p className="text-xs sm:text-sm text-slate-500">Alumnos cargados</p>
          <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-semibold text-slate-900">{totalAlumnos}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
          <p className="text-xs sm:text-sm text-slate-500">Cumplen 80% de asistencia</p>
          <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-semibold text-slate-900">{asistencia}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm sm:col-span-2 md:col-span-1">
          <p className="text-xs sm:text-sm text-slate-500">Asistencia cerrada</p>
          <p
            className={`mt-1 sm:mt-2 text-xl sm:text-2xl font-semibold ${asistenciaCompletada ? 'text-emerald-600' : 'text-amber-600'}`}
          >
            {asistenciaCompletada ? 'Sí' : 'No'}
          </p>
        </div>
      </div>

      <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Listado de alumnos</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {asistenciaCompletada
                ? 'Consulta de alumnos registrados.'
                : 'Panel de seguimiento del director.'}
            </p>
          </div>
          {!asistenciaCompletada && (
            <button
              type="button"
              onClick={() => dispatch(openModal({ type: 'crearAlumno', payload: null }))}
              className="w-full sm:w-auto text-center rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              Agregar alumno nuevo
            </button>
          )}
        </div>

        {/* Vista en Tarjetas para pantallas móviles (< sm) */}
        <div className="space-y-3 sm:hidden">
          {alumnos.length === 0 ? (
            <p className="py-6 text-center text-xs text-slate-500">No hay alumnos cargados.</p>
          ) : (
            alumnos.map((a) => {
              const formattedDate = a.nacimiento
                ? new Date(a.nacimiento).toLocaleDateString('es-AR')
                : 'N/A'

              return (
                <div key={a.id} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-slate-900 text-sm">
                        {a.nombre} {a.apellido}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        DNI: {a.dni} | Curso: {a.curso}
                      </p>
                    </div>
                    {!asistenciaCompletada && (
                      <button
                        type="button"
                        onClick={() => dispatch(openModal({ type: 'editarAlumno', payload: a }))}
                        className="rounded-xl px-2.5 py-1 text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-200 transition hover:bg-sky-100 shrink-0"
                      >
                        Editar
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-2 border-t border-slate-200/60 text-slate-600">
                    <div>
                      <span>Nac: {formattedDate}</span>
                      {a.localidad && <span className="ml-2 text-slate-500">• {a.localidad}</span>}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500 font-medium">80% Asist:</span>
                      {asistenciaCompletada ? (
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${a.cumpleAsistencia ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}
                        >
                          {a.cumpleAsistencia ? 'Sí' : 'No'}
                        </span>
                      ) : (
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
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold cursor-pointer transition ${a.cumpleAsistencia ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'}`}
                        >
                          {a.cumpleAsistencia ? 'Sí' : 'No'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Tabla tradicional para pantallas medianas y grandes (≥ sm) */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Apellido</th>
                <th className="px-4 py-3">DNI</th>
                <th className="px-4 py-3">Fecha de nacimiento</th>
                <th className="px-4 py-3">Curso</th>
                <th className="px-4 py-3">Localidad</th>
                <th className="px-4 py-3">Cumple el 80% de asistencia</th>
                {!asistenciaCompletada && <th className="px-4 py-3">Acción</th>}
              </tr>
            </thead>
            <tbody>
              {alumnos.map((a) => {
                const formattedDate = a.nacimiento
                  ? new Date(a.nacimiento).toLocaleDateString('es-AR')
                  : 'N/A'

                return (
                  <tr key={a.id} className="border-t border-slate-100">
                    <td className="px-4 py-3 text-slate-800">{a.nombre}</td>
                    <td className="px-4 py-3 text-slate-800">{a.apellido}</td>
                    <td className="px-4 py-3 text-slate-800">{a.dni}</td>
                    <td className="px-4 py-3 text-slate-800">{formattedDate}</td>
                    <td className="px-4 py-3 text-slate-800">{a.curso}</td>
                    <td className="px-4 py-3 text-slate-800">{a.localidad}</td>
                    <td className="px-4 py-3">
                      {asistenciaCompletada ? (
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${a.cumpleAsistencia ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}
                        >
                          {a.cumpleAsistencia ? 'Sí' : 'No'}
                        </span>
                      ) : (
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
                      )}
                    </td>
                    {!asistenciaCompletada && (
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(openModal({ type: 'editarAlumno', payload: a }))
                          }
                          className="rounded-2xl px-2 py-1 text-sm font-semibold text-sky-700 transition hover:bg-sky-300/30 hover:text-sky-900"
                        >
                          Editar
                        </button>
                      </td>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default DirectorDashboardPage
