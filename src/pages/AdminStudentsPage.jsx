import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAlumnos } from "../store/slices/alumnosSlice";
import { useState } from "react";

function AdminStudentsPage() {

  const [pages, setPages] = useState(0);
  const {
  items: alumnos,
  page,
  totalPages,
  loading
} = useSelector((state) => state.alumnos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAlumnos(pages));
  }, [dispatch, pages]);



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
                <th className="px-4 py-3">Nacimiento</th>
                <th className="px-4 py-3">Localidad</th>
                <th className="px-4 py-3">Curso</th>
                <th className="px-4 py-3">Cumple 80% asistencia</th>
                <th className="px-4 py-3">Acción</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-4 py-6 text-center text-slate-500">
                    No hay alumnos cargados.
                  </td>
                </tr>
              ) : (
                alumnos.map((a) => (
                  <tr key={a.id} className="border-t border-slate-100">
                    <td className="px-4 py-3 text-slate-800">{a.nombre}</td>
                    <td className="px-4 py-3 text-slate-800">{a.apellido}</td>
                    <td className="px-4 py-3 text-slate-800">{a.dni}</td>
                    <td className="px-4 py-3 text-slate-800">{a.nacimiento ?? "Sin fecha"}</td>
                    <td className="px-4 py-3 text-slate-800">{a.localidad}</td>
                    <td className="px-4 py-3 text-slate-800">{a.curso}</td>
                    <td className="px-4 py-3 text-slate-800">{a.cumpleAsistencia ? "Sí" : "No"}</td>
                    <td className="px-4 py-3">
                      <button className="text-sm font-semibold text-violet-700 hover:text-violet-900">Editar</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setPages((prev) => prev - 1)}
              disabled={page === 0}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Anterior
            </button>

            <span className="text-sm text-slate-600">
              Página <span className="font-semibold">{page + 1}</span> de{" "}
              <span className="font-semibold">{totalPages}</span>
            </span>

            <button
              onClick={() => setPages((prev) => prev + 1)}
              disabled={page >= totalPages - 1}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Siguiente →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminStudentsPage
