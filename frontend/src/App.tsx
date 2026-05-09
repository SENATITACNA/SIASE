import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import DashboardVigilante from "./pages/DashboardVigilante";
import DashboardAlumno from "./pages/DashboardAlumno";
import QRVigilante from "./pages/QRVigilante";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard-alumno" element={<DashboardAlumno />} />
        <Route path="/dashboard-vigilante" element={<DashboardVigilante />} />
        <Route path="/qr-vigilante" element={<QRVigilante />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;