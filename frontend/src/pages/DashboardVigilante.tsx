import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardVigilante = () => {
  const [guardiaId, setGuardiaId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    // Si no hay datos o el rol no es vigilante, fuera
    if (!userData || role !== "vigilante") {
      navigate("/");
      return;
    }

    const user = JSON.parse(userData);
    setGuardiaId(user.guardia_id || "No identificado");
  }, [navigate]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#f4f4f4" }}>
      <h1>Panel de Vigilancia</h1>
      <p><strong>ID de Vigilante en turno: {guardiaId}</strong></p>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <button 
          onClick={() => navigate("/qr-vigilante")}
          style={{ padding: "15px 30px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Generar QR de Asistencia
        </button>
        <button 
          onClick={() => { localStorage.clear(); navigate("/"); }} 
          style={{ padding: "15px 30px", cursor: "pointer" }}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default DashboardVigilante;