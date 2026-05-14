import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Laptop, MonitorSmartphone, Plus, Send, ChevronRight } from 'lucide-react';

import NavbarAlumno from '../components/NavbarAlumno';
import DetallesItem from '../components/DetallesItem';
import RegistroDispositivoModal from '../components/RegistroDispositivoModal';
import { obtenerAlumno } from '../services/alumnoService';
import { API_BASE } from '../services/api';
import type { Alumno } from '../types/alumnos';

import '../styles/App.css';
import '../styles/DashboardAlumno.css';
import '../styles/DetallesItem.css';
import '../styles/EstadoEntrada.css';
import '../styles/BarraLateral.css';


/* ---- Tipos locales ---- */
interface Dispositivo {
  id: number;
  tipo: string;
  marca: string;
  modelo: string;
  numero_serie: string;
  descripcion: string;
  estado: number;
}

interface Solicitud {
  id: number;
  estado: number; // 0=en espera, 1=aprobado/ingreso, 2=salida
  fecha_envio: string;
  fecha_entrada: string | null;
  fecha_salida: string | null;
  dispositivo_id: number;
  tipo: string;
  marca: string;
  modelo: string;
}

/* ---- Helpers de estado de solicitud ---- */
const ESTADO_LABEL: Record<number, string> = {
  0: 'En espera',
  1: 'Ingreso aprobado',
  2: 'Salida registrada',
};
const ESTADO_CLASS: Record<number, string> = {
  0: 'en-espera',
  1: 'aprobado',
  2: 'aprobado',
};

/* ================================================================
   Dashboard principal del alumno
   ================================================================ */
export default function DashboardAlumno() {
  const navigate = useNavigate();
  const [alumno, setAlumno] = useState<Alumno | null>(null);
  const [dispositivos, setDispositivos] = useState<Dispositivo[]>([]);
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [selectedDispositivo, setSelectedDispositivo] = useState<Dispositivo | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [enviandoSolicitud, setEnviandoSolicitud] = useState(false);

  /* Cargar datos del alumno desde localStorage */
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) { navigate('/login'); return; }

    const user = JSON.parse(userData);
    obtenerAlumno(user.id)
      .then(data => { setAlumno(data); fetchDispositivos(user.id); fetchSolicitudes(user.id); })
      .catch(() => navigate('/login'));
  }, [navigate]);

  const fetchDispositivos = (id: number) => {
    fetch(`${API_BASE}/api/registro_dispositivo/alumno/${id}/dispositivos`)
      .then(r => r.json())
      .then(setDispositivos)
      .catch(console.error);
  };

  const fetchSolicitudes = (id: number) => {
    fetch(`${API_BASE}/api/registro_dispositivo/alumno/${id}/solicitudes`)
      .then(r => r.json())
      .then(setSolicitudes)
      .catch(console.error);
  };

  const handleRegistroExitoso = () => {
    setShowModal(false);
    if (alumno) { fetchDispositivos(alumno.id); fetchSolicitudes(alumno.id); }
  };

  const handleEnviarSolicitud = async () => {
    if (!selectedDispositivo || !alumno) return;
    setEnviandoSolicitud(true);
    try {
      // Usamos instructor_id=1 como default; en un flujo real se selecciona del alumno
      const resp = await fetch(`${API_BASE}/api/registro_dispositivo/solicitud-ingreso`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          alumno_id: alumno.id,
          dispositivo_id: selectedDispositivo.id,
          instructor_id: 1,
        }),
      });
      if (resp.ok) {
        fetchSolicitudes(alumno.id);
      } else {
        const d = await resp.json();
        alert(d.error || 'Error al enviar solicitud');
      }
    } catch {
      alert('Error de conexión');
    } finally {
      setEnviandoSolicitud(false);
    }
  };

  /* Solicitud activa del dispositivo seleccionado */
  const solicitudActiva = selectedDispositivo
    ? solicitudes.find(s => s.dispositivo_id === selectedDispositivo.id) ?? null
    : null;

  /* Transformar Dispositivo → forma que acepta DetallesItem */
  const selectedForDetalles = selectedDispositivo
    ? {
        id: selectedDispositivo.id,
        idsenati: alumno?.idsenati ?? '',
        marca: selectedDispositivo.marca,
        modelo: selectedDispositivo.modelo,
        tipo: selectedDispositivo.tipo,
        numero_serie: selectedDispositivo.numero_serie,
        descripcion: selectedDispositivo.descripcion,
      }
    : null;

  if (!alumno) {
    return (
      <div className="layout-wrapper">
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>Cargando…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="layout-wrapper">
      <NavbarAlumno />

      <div className="app-container">
        {/* ===================== CONTENIDO PRINCIPAL ===================== */}
        <div className="main-content">

          {/* Barra superior con info del alumno */}
          <div className="alumno-topbar">
            <div className="alumno-topbar-info">
              <div className="alumno-topbar-avatar">
                <User size={22} />
              </div>
            </div>
          </div>

          {/* Área de contenido */}
          <div className="content-area">

            {/* Panel superior: Lista de dispositivos */}
            <div className="card-panel dispositivos-panel">
              <div className="card-title">
                <span className="title-dot" />
                MIS DISPOSITIVOS
              </div>

              {dispositivos.length === 0 ? (
                <div className="disp-empty">
                  <MonitorSmartphone className="disp-empty-icon" />
                  <p className="disp-empty-text">
                    No tienes dispositivos registrados aún
                  </p>
                </div>
              ) : (
                <div className="resultados-list">
                  <div className="dispositivos-grid">
                    {dispositivos.map(d => {
                      const isSelected = selectedDispositivo?.id === d.id;
                      return (
                        <div
                          key={d.id}
                          className={`dispositivo-card ${isSelected ? 'selected' : ''}`}
                          onClick={() => setSelectedDispositivo(isSelected ? null : d)}
                        >
                          <div className="disp-card-header">
                            <span className="disp-tipo-badge">{d.tipo || 'Dispositivo'}</span>
                            <span className={`disp-estado-badge ${d.estado === 1 ? 'activo' : 'inactivo'}`}>
                              <span className={`status-dot ${d.estado === 1 ? 'ingreso' : 'salida'}`} />
                              {d.estado === 1 ? 'Activo' : 'Inactivo'}
                            </span>
                          </div>

                          <div className="disp-name">
                            {d.marca} {d.modelo}
                          </div>

                          {d.numero_serie && (
                            <div className="disp-serie">N/S: {d.numero_serie}</div>
                          )}

                          <div className="disp-card-footer">
                            <div className="date-info">
                              <Laptop size={13} />
                              <span>{d.descripcion || 'Sin descripción'}</span>
                            </div>
                            <ChevronRight size={16} color={isSelected ? 'var(--color-nav-bg)' : '#D1D5DB'} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Panel inferior: Detalles + Acciones */}
            <div className="content-grid">
              {/* Detalles del dispositivo seleccionado */}
              <DetallesItem alumno={selectedForDetalles} />

              {/* Acciones del alumno */}
              <div className="card-panel acciones-panel">
                <div className="card-title center">
                  ACCIONES
                </div>

                <div className="acciones-content">
                  {/* Botón registrar nuevo dispositivo */}
                  <button
                    className="btn-accion-alumno btn-registrar"
                    onClick={() => setShowModal(true)}
                  >
                    <Plus size={18} />
                    Registrar Dispositivo
                  </button>

                  {/* Botón enviar solicitud de ingreso */}
                  <button
                    className="btn-accion-alumno btn-solicitar"
                    disabled={!selectedDispositivo || enviandoSolicitud || !!solicitudActiva}
                    onClick={handleEnviarSolicitud}
                    title={
                      !selectedDispositivo
                        ? 'Selecciona un dispositivo primero'
                        : solicitudActiva
                        ? 'Ya existe una solicitud para este dispositivo'
                        : 'Enviar solicitud de ingreso al vigilante'
                    }
                  >
                    <Send size={18} />
                    {enviandoSolicitud ? 'Enviando…' : 'Solicitar Ingreso'}
                  </button>

                  {/* Estado de la solicitud activa */}
                  {solicitudActiva && (
                    <div className={`solicitud-estado ${ESTADO_CLASS[solicitudActiva.estado] ?? ''}`}>
                      Estado: <strong>{ESTADO_LABEL[solicitudActiva.estado] ?? 'Desconocido'}</strong>
                      {solicitudActiva.fecha_entrada && (
                        <> · Entrada: {new Date(solicitudActiva.fecha_entrada).toLocaleString()}</>
                      )}
                    </div>
                  )}

                  {!selectedDispositivo && dispositivos.length > 0 && (
                    <p style={{ fontSize: 12, color: 'var(--color-secondary-text)', textAlign: 'center', marginTop: 4 }}>
                      Selecciona un dispositivo para solicitar ingreso
                    </p>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ===================== PANEL DERECHO: INFO ALUMNO ===================== */}
        <div className="alumno-info-panel">
          <div className="barra-lateral-header" style={{ marginBottom: 20 }}>
            <h1 className="barra-lateral-title">ALUMNO</h1>
          </div>

          <div className="avatar-container">
            <div className="avatar">
              <User className="avatar-icon" />
            </div>
          </div>

          <div className="alumno-info-list">
            <div className="info-item">
              <span className="info-label">ID SENATI</span>
              <span>{alumno.idsenati}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Nombre</span>
              <span>{alumno.nombres}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Apellidos</span>
              <span>{alumno.apellidos}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Carrera</span>
              <span>{alumno.carrera}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Semestre</span>
              <span>{alumno.semestre}° Semestre</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== MODAL REGISTRO ===================== */}
      {showModal && (
        <RegistroDispositivoModal
          alumnoId={alumno.id}
          onClose={() => setShowModal(false)}
          onSuccess={handleRegistroExitoso}
        />
      )}
    </div>
  );
}