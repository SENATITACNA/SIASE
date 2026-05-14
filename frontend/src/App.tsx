import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import DashboardVigilante from "./pages/DashboardVigilante";
import DashboardAlumno from "./pages/DashboardAlumno";
import QRVigilante from "./pages/QRVigilante";
import QRAlumno from "./pages/QRAlumno";
import AsistenciaAlumno from "./pages/AsistenciaAlumno";
import ProtectedRoute from "./components/ProtectedRoute";
import EscanerAlumno from "./pages/EscanerAlumno";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirección inicial */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas de Vigilante */}
        <Route
          path="/dashboard-vigilante"
          element={
            <ProtectedRoute requiredRole="vigilante">
              <DashboardVigilante />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-vigilante/qr-vigilante"
          element={
            <ProtectedRoute requiredRole="vigilante">
              <QRVigilante />
            </ProtectedRoute>
          }
        />

        {/* Rutas de Alumno */}
        <Route
          path="/dashboard-alumno"
          element={
            <ProtectedRoute requiredRole="alumno">
              <DashboardAlumno />
            </ProtectedRoute>
          }
        />
        
        {/* Ruta para mostrar el QR propio del alumno */}
        <Route
          path="/qr-alumno"
          element={
            <ProtectedRoute requiredRole="alumno">
              <QRAlumno />
            </ProtectedRoute>
          }
        />

        {/* Ruta para el ESCÁNER de la cámara */}
        <Route
          path="/escaner-alumno"
          element={
            <ProtectedRoute requiredRole="alumno">
              <EscanerAlumno />
            </ProtectedRoute>
          }
        />

        <Route
          path="/asistencia-alumno"
          element={
            <ProtectedRoute requiredRole="alumno">
              <AsistenciaAlumno />
            </ProtectedRoute>
          }
        />

        {/* Catch-all: Redirigir a login si la ruta no existe */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;