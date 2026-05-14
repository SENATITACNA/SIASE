import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../services/api";
import Navbar from "../components/Navbar";
import { QrCode, UserCheck, ShieldAlert } from "lucide-react";
import '../styles/App.css';

const QRVigilante = () => {
  const navigate = useNavigate();
  const [alumnoDetectado, setAlumnoDetectado] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const chequearAsistencia = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/asistencia/ultimo`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setAlumnoDetectado(data[0].alumno);
          }
        }
      } catch (e) { 
        console.error("Error al verificar asistencia:", e); 
      }
    };
    const timer = setInterval(chequearAsistencia, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="layout-wrapper">
      <Navbar />
      <div className="app-container">
        <div className="main-content" style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
          <div className="card-panel glass-card" style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
            <div className="card-title-main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <QrCode size={32} />
              ESCÁNER DE ACCESO
            </div>

            <div style={{ 
              background: 'rgba(255, 255, 255, 0.5)', 
              borderRadius: '20px', 
              padding: '40px',
              margin: '30px 0',
              border: '2px dashed rgba(0, 89, 166, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px'
            }}>
              <div style={{ 
                width: '240px', 
                height: '240px', 
                background: 'white', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
              }}>
                <QrCode size={160} color="#0059a6" style={{ opacity: 0.1 }} />
                <span style={{ position: 'absolute', fontWeight: 600, color: '#0059a6' }}>ÁREA DE ESCANEO</span>
              </div>
              <p style={{ color: 'var(--color-secondary-text)', fontSize: '0.9rem' }}>
                Posicione el código QR del alumno frente a la cámara
              </p>
            </div>

            <div style={{ 
              background: alumnoDetectado ? 'rgba(16, 185, 129, 0.1)' : 'rgba(0, 89, 166, 0.05)',
              padding: '20px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              border: `1px solid ${alumnoDetectado ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0, 89, 166, 0.1)'}`,
              transition: 'all 0.3s ease'
            }}>
              {alumnoDetectado ? <UserCheck color="#10b981" /> : <ShieldAlert color="#0059a6" />}
              <div style={{ textAlign: 'left' }}>
                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-secondary-text)' }}>
                  Estado de detección
                </span>
                <strong style={{ fontSize: '1.1rem', color: alumnoDetectado ? '#10b981' : 'var(--color-text)' }}>
                  {alumnoDetectado || "Esperando escaneo..."}
                </strong>
              </div>
            </div>

            <button 
              className="button" 
              onClick={() => navigate("/dashboard-vigilante")}
              style={{ marginTop: '30px', width: 'auto', padding: '12px 30px' }}
            >
              Volver al Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRVigilante;