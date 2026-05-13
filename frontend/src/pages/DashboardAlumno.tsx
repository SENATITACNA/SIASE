import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

const DashboardAlumno = () => {
  const [alumnoId, setAlumnoId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    if (!userData || role !== "alumno") {
      navigate("/"); 
      return;
    }

    const user = JSON.parse(userData);
    setAlumnoId(user.idsenati || "No identificado");
  }, [navigate]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#eef2f3" }}>
      <h1>Menú del Alumno</h1>
      <p>Bienvenido al Sistema Académico</p>
      <p><strong>Tu ID de Alumno es: {alumnoId}</strong></p>
      <button 
        onClick={() => { localStorage.clear(); navigate("/"); }} 
        style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default DashboardAlumno;