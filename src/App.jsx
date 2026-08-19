import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import AdminLayout from "./components/AdminLayout";
import LogoutButton from "./components/LogoutButton";
import EditarAlumnoModal from "./components/EditarAlumnoModal";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RoleSelectionPage from "./pages/RoleSelectionPage";
import DirectorDashboardPage from "./pages/DirectorDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminStudentsPage from "./pages/AdminStudentsPage";
import AdminSchoolsPage from "./pages/AdminSchoolsPage";
import AdminExcelPage from "./pages/AdminExcelPage";
import { getRoleRoute, getUserRole } from "./utils/auth";
import { FaSchool } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";

function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  const currentRole = getUserRole(user);

  if (allowedRoles && !allowedRoles.includes(currentRole)) {
    return <Navigate to={getRoleRoute(currentRole)} replace />;
  }

  return <Outlet />;
}

function ContentWrapper({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <div className="flex min-h-0 flex-1 flex-col">{children}</div>;
  }

  return <main className="mx-auto max-w-7xl flex-1 px-6 py-8">{children}</main>;
}

function AppRoutes() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const defaultRoute = isAuthenticated
    ? getRoleRoute(getUserRole(user))
    : "/login";

  return (
    <Routes>
      <Route path="/" element={<Navigate to={defaultRoute} replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/roles" element={<RoleSelectionPage />} />
      <Route path="/home" element={<HomePage />} />

      <Route element={<ProtectedRoute allowedRoles={["DIRECTOR"]} />}>
        <Route path="/director/dashboard" element={<DirectorDashboardPage />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
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
                      <h2 className="text-2xl font-semibold text-slate-900">
                        Página no encontrada
                      </h2>
                      <p className="mt-2 text-slate-600">
                        La ruta del administrador no existe.
                      </p>
                    </div>
                  }
                />
              </Routes>
            </AdminLayout>
          }
        />
      </Route>

      <Route
        path="*"
        element={
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">
              Página no encontrada
            </h2>
            <p className="mt-2 text-slate-600">La ruta que buscas no existe.</p>
          </div>
        }
      />
    </Routes>
  );
}

function DirectorNav() {
  const { escuela } = useSelector((state) => state.escuelas);

  return (
    <nav className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex flex-col sm:flex-row max-w-7xl items-center justify-between px-4 sm:px-6 py-3 gap-3">
        <div className="flex items-center gap-3 justify-center sm:justify-start w-full sm:w-auto">
          {escuela?.nombre && (
            <div className="flex text-base sm:text-lg md:text-xl items-center gap-2 sm:gap-2.5 px-2 sm:px-3 py-1">
              <span className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white font-bold text-lg sm:text-xl shadow-sm">
                <FaSchool />
              </span>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="font-semibold text-slate-800 text-sm sm:text-base md:text-lg">
                  {escuela.nombre}
                </span>
                <TbPointFilled className="hidden sm:inline-block text-xs sm:text-sm text-slate-400" />
                {escuela.cue && (
                  <span className="rounded-md items-center justify-center bg-sky-100 px-2 py-0.5 text-xs sm:text-sm font-medium text-sky-700">
                    CUE: {escuela.cue}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto">
          <LogoutButton
            showFinalizarAsistencia
            className="rounded-xl px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
          />
        </div>
      </div>
    </nav>
  );
}

function AppShell() {
  const location = useLocation();
  const isDirectorRoute = location.pathname.startsWith("/director");

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800">
      {isDirectorRoute && <DirectorNav />}
      <EditarAlumnoModal />
      <ContentWrapper>
        <AppRoutes />
      </ContentWrapper>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
