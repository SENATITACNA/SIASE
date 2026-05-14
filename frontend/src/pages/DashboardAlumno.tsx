import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const DashboardAlumno = () => {
  const navigate = useNavigate();
  const [nombreAlumno, setNombreAlumno] = useState<string>("Cargando...");

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      try {
        const cookieContent = parts.pop()?.split(';').shift();
        return cookieContent ? JSON.parse(decodeURIComponent(cookieContent)) : null;
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    const session = getCookie('user_session');

    if (!session) {
      navigate("/login");
      return;
    }

    if (session.rol !== "alumno") {
      navigate("/dashboard-vigilante");
      return;
    }
    setNombreAlumno(session.nombre);
  }, [navigate]);

  const handleLogout = () => {
    document.cookie = "user_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.r
    navigate("/login");
  };

  return (
    <div className="layout-wrapper">
      <Navbar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#eef2f3" }}>
        <h1>Menú del Alumno</h1>
        <p>Bienvenido al Sistema Académico, <strong>{nombreAlumno}</strong></p>
        
        <button 
          onClick={handleLogout} 
          style={{ 
            marginTop: "20px", 
            padding: "10px 20px",
            backgroundColor: "#dc3545", 
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};
//crear luego un css 
export default DashboardAlumno;