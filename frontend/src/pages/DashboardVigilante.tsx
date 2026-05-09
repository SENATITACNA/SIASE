import { useNavigate } from "react-router-dom";

const DashboardVigilante = () => {
  const navigate = useNavigate();

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#f4f4f4" }}>
      <h1>Panel de Vigilancia</h1>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <button 
          onClick={() => navigate("/qr-vigilante")}
          style={{ padding: "15px 30px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Generar QR de Asistencia
        </button>
        <button onClick={() => window.location.href = "/"} style={{ padding: "15px 30px", cursor: "pointer" }}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default DashboardVigilante;