function AdminExcelPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">Administrador</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Carga de Excel</h1>
        <p className="mt-3 text-slate-600">Sube un archivo para importar nuevos datos de alumnos.</p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
          <h2 className="text-xl font-semibold text-slate-900">Arrastrá o seleccioná un archivo Excel</h2>
          <p className="mt-2 text-sm text-slate-600">La importación se podrá conectar a la lógica real más adelante.</p>
          <button className="mt-6 rounded-xl bg-violet-600 px-5 py-2.5 font-semibold text-white transition hover:bg-violet-700">
            Seleccionar archivo
          </button>
        </div>
      </div>
    </section>
  )
}

export default AdminExcelPage
