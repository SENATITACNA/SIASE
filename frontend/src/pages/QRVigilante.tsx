import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

const QRVigilante = () => {
  const [token, setToken] = useState<string>("");
  const [guardiaId, setGuardiaId] = useState<number | null>(null);
  const navigate = useNavigate();

  // URL Base ajustada a tu app.js: app.use("/api/tokens_vigilante", ...)
  const API_URL = "http://80.241.217.53:3000/api/tokens_vigilante";

  // 1. Verificar sesión y cargar ID del guardia
  useEffect(() => {
    const userData = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    if (!userData || role !== "vigilante") {
      navigate("/");
      return;
    }

    const user = JSON.parse(userData);
    // Usamos 'id' porque es la PK en tu tabla 'vigilante'
    const id = user.id; 

    if (id) {
      setGuardiaId(id);
      inicializarYObtenerToken(id);
    }
  }, []);

  // 2. Inicializar tokens y obtener el activo
  const inicializarYObtenerToken = async (id: number) => {
    try {
      // Llamada al endpoint de inicialización
      await fetch(`${API_URL}/inicializar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guardia_id: id }),
      });

      // Obtener el token activo
      const response = await fetch(`${API_URL}/activos/${id}`);
      const data = await response.json();
      
      if (Array.isArray(data) && data.length > 0) {
        setToken(data[0].token);
      }
    } catch (error) {
      console.error("Error al obtener tokens:", error);
    }
  };

  // 3. Lógica de Rotación
  const ejecutarRotacion = async () => {
    if (!guardiaId) return;
    try {
      const response = await fetch(`${API_URL}/rotar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guardia_id: guardiaId }),
      });
      const data = await response.json();
      if (data.token) {
        setToken(data.token);
      }
    } catch (error) {
      console.error("Error en rotación:", error);
    }
  };

  // Rotación automática cada 10 segundos
  useEffect(() => {
    if (!guardiaId) return;

    const interval = setInterval(() => {
      ejecutarRotacion();
    }, 10000); 

    return () => clearInterval(interval);
  }, [guardiaId]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#f4f4f4", fontFamily: "sans-serif" }}>
      <h2 style={{ color: "#333", marginBottom: "10px" }}>Código QR de Asistencia</h2>
      <p style={{ marginBottom: "20px" }}>Vigilante ID: <strong>{guardiaId}</strong></p>
      
      <div style={{ background: "white", padding: "25px", borderRadius: "15px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
        {token ? (
          <QRCodeSVG value={token} size={256} level="H" includeMargin={true} />
        ) : (
          <div style={{ width: 256, height: 256, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p>Generando código...</p>
          </div>
        )}
      </div>

      <p style={{ marginTop: "25px", color: "#666", fontSize: "0.9rem" }}>
        Se actualiza automáticamente cada 10 segundos
      </p>
      
      <div style={{ display: "flex", gap: "15px", marginTop: "30px" }}>
        <button 
          onClick={ejecutarRotacion} 
          style={{ padding: "12px 24px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
        >
          Actualizar ahora
        </button>
        <button 
          onClick={() => navigate("/dashboard-vigilante")} 
          style={{ padding: "12px 24px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default QRVigilante;