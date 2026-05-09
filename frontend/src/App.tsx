import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import DashboardVigilante from "./pages/DashboardVigilante";
import DashboardAlumno from "./pages/DashboardAlumno";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard-vigilante" element={<DashboardVigilante />} />
        <Route path="/dashboard-alumno" element={<DashboardAlumno />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
