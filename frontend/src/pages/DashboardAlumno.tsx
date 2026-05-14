import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const DashboardAlumno = () => {
  const navigate = useNavigate();
  const [nombreAlumno, setNombreAlumno] = useState<string>("Cargando...");

  // Helper para leer la cookie
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
    // 1. Verificamos si existe la sesión
    const session = getCookie('user_session');

    // Si no hay sesión, al login
    if (!session) {
      navigate("/login");
      return;
    }

    // 2. Seguridad extra: Si tiene sesión pero NO es alumno, lo mandamos a su lugar
    if (session.rol !== "alumno") {
      navigate("/dashboard-vigilante");
      return;
    }

    // 3. Si todo está bien, guardamos su nombre para saludarlo
    setNombreAlumno(session.nombre);
  }, [navigate]);

  const handleLogout = () => {
    // Borramos la cookie de 30 días dándole fecha del pasado
    document.cookie = "user_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("user");
    
    // Redirigimos al login
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
            backgroundColor: "#dc3545", // Un color rojito para el botón de salir
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

export default DashboardAlumno;