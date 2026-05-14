import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import DashboardVigilante from "./pages/DashboardVigilante";
import DashboardAlumno from "./pages/DashboardAlumno";
import QRVigilante from "./pages/QRVigilante";
import AsistenciaLista from './pages/AsistenciaLista';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard-vigilante" element={<DashboardVigilante />} />
        <Route path="/dashboard-alumno" element={<DashboardAlumno />} />
        <Route path="/qr-vigilante" element={<QRVigilante />} />
        <Route path="/asistencia" element={<AsistenciaLista/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;