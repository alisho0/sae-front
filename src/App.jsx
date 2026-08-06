import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from './components/AdminLayout'
import HomePage from './pages/HomePage'
import RoleSelectionPage from './pages/RoleSelectionPage'
import DirectorDashboardPage from './pages/DirectorDashboardPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminStudentsPage from './pages/AdminStudentsPage'
import AdminSchoolsPage from './pages/AdminSchoolsPage'
import AdminExcelPage from './pages/AdminExcelPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-800">
        <nav className="border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link to="/" className="text-lg font-semibold text-slate-900">
              SAE Front
            </Link>
            <div className="flex gap-4 text-sm font-medium text-slate-600">
              <Link to="/" className="transition hover:text-slate-900">
                Inicio
              </Link>
              <Link to="/director/dashboard" className="transition hover:text-slate-900">
                Director
              </Link>
              <Link to="/admin/dashboard" className="transition hover:text-slate-900">
                Administrador
              </Link>
            </div>
          </div>
        </nav>

        <main className="mx-auto max-w-7xl px-6 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/roles" element={<RoleSelectionPage />} />
            <Route path="/director/dashboard" element={<DirectorDashboardPage />} />

            <Route
              path="/admin"
              element={<Navigate to="/admin/dashboard" replace />}
            />
            <Route
              path="/admin/*"
              element={
                <AdminLayout>
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboardPage />} />
                    <Route path="alumnos" element={<AdminStudentsPage />} />
                    <Route path="escuelas" element={<AdminSchoolsPage />} />
                    <Route path="excel" element={<AdminExcelPage />} />
                    <Route
                      path="*"
                      element={
                        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                          <h2 className="text-2xl font-semibold text-slate-900">Página no encontrada</h2>
                          <p className="mt-2 text-slate-600">La ruta del administrador no existe.</p>
                        </div>
                      }
                    />
                  </Routes>
                </AdminLayout>
              }
            />

            <Route
              path="*"
              element={
                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                  <h2 className="text-2xl font-semibold text-slate-900">Página no encontrada</h2>
                  <p className="mt-2 text-slate-600">La ruta que buscas no existe.</p>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
