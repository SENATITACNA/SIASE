import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

const QRVigilante = () => {
  const [token, setToken] = useState<string>("");
  const [guardiaId, setGuardiaId] = useState<number | null>(null);
  const [alumnoDetectado, setAlumnoDetectado] = useState<string | null>(null); // Del Main
  const navigate = useNavigate();

  const API_URL = "http://80.241.217.53:3000/api/tokens_vigilante";
  const ASISTENCIA_URL = "http://80.241.217.53:3000/api/asistencia/ultimo";

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    if (!userData || role !== "vigilante") {
      navigate("/");
      return;
    }

    const user = JSON.parse(userData);
    const id = user.id; 

    if (id) {
      setGuardiaId(id);
      inicializarYObtenerToken(id);
    }
  }, [navigate]);

  // Lógica de detección del Main (Escucha si alguien marcó)
  useEffect(() => {
    const chequearAsistencia = async () => {
      try {
        const res = await fetch(ASISTENCIA_URL);
        const data = await res.json();
        if (data.success) {
          setAlumnoDetectado(data.alumno.nombre);
          // Opcional: Limpiar el nombre después de 5 segundos para el siguiente alumno
          setTimeout(() => setAlumnoDetectado(null), 5000);
        }
      } catch (e) {
        console.error("Error al detectar asistencia", e);
      }
    };

    const timer = setInterval(chequearAsistencia, 3000); // Revisa cada 3 seg
    return () => clearInterval(timer);
  }, []);

  const inicializarYObtenerToken = async (id: number) => {
    try {
      await fetch(`${API_URL}/inicializar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guardia_id: id }),
      });

      const response = await fetch(`${API_URL}/activos/${id}`);
      const data = await response.json();
      
      if (Array.isArray(data) && data.length > 0) {
        setToken(data[0].token);
      }
    } catch (error) {
      console.error("Error al obtener tokens:", error);
    }
  };

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

  // Rotación automática (Tu lógica)
  useEffect(() => {
    if (!guardiaId) return;
    const interval = setInterval(() => {
      ejecutarRotacion();
    }, 10000); 
    return () => clearInterval(interval);
  }, [guardiaId]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#f4f4f4", fontFamily: "sans-serif", padding: "20px" }}>
      
      <h2 style={{ color: "#333", marginBottom: "5px" }}>Control de Acceso</h2>
      <p style={{ marginBottom: "20px" }}>Vigilante ID: <strong>{guardiaId}</strong></p>

      {/* SECCIÓN DEL QR */}
      <div style={{ background: "white", padding: "25px", borderRadius: "15px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", marginBottom: "30px" }}>
        {token ? (
          <QRCodeSVG value={token} size={250} level="H" includeMargin={true} />
        ) : (
          <div style={{ width: 250, height: 250, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p>Generando código...</p>
          </div>
        )}
      </div>

      {/* SECCIÓN DE DETECCIÓN (Fusión con el Main) */}
      <div style={{ 
        width: "100%", 
        maxWidth: "400px", 
        backgroundColor: alumnoDetectado ? "#d4edda" : "#fff", 
        border: alumnoDetectado ? "2px solid #28a745" : "1px solid #ccc",
        padding: "20px", 
        borderRadius: "12px", 
        textAlign: "center",
        transition: "all 0.3s ease"
      }}>
        <h4 style={{ margin: "0 0 10px 0", color: "#555" }}>Estado de Escaneo</h4>
        <p style={{ fontSize: "1.2rem", fontWeight: "bold", margin: 0, color: alumnoDetectado ? "#155724" : "#666" }}>
          {alumnoDetectado ? `✅ ¡Detectado: ${alumnoDetectado}!` : "⌛ Esperando alumno..."}
        </p>
      </div>

      {/* BOTONES */}
      <div style={{ display: "flex", gap: "15px", marginTop: "30px" }}>
        <button 
          onClick={ejecutarRotacion} 
          style={{ padding: "12px 24px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
        >
          Rotar Manual
        </button>
        <button 
          onClick={() => navigate("/dashboard-vigilante")} 
          style={{ padding: "12px 24px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
        >
          Volver al Panel
        </button>
      </div>

      <p style={{ marginTop: "20px", color: "#999", fontSize: "0.8rem" }}>
        El QR se invalida cada 10 segundos para mayor seguridad.
      </p>
    </div>
  );
};

export default QRVigilante;