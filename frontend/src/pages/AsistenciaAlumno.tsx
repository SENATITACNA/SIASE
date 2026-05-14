import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, Clock, Laptop, Filter, Search } from 'lucide-react';
import NavbarAlumno from '../components/NavbarAlumno';
import { obtenerAlumnoFormateado } from '../services/alumnoService';
import { obtenerAsistenciaPorAlumno } from '../services/asistenciaService';
import type { AsistenciaRegistro } from '../services/asistenciaService';
import type { Alumno } from '../types/alumnos';

import '../styles/App.css';
import '../styles/AsistenciaAlumno.css';

export default function AsistenciaAlumno() {
  const navigate = useNavigate();
  const [alumno, setAlumno] = useState<Alumno | null>(null);
  const [asistencias, setAsistencias] = useState<AsistenciaRegistro[]>([]);
  const [loading, setLoading] = useState(true);

  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroDispositivo, setFiltroDispositivo] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(userData);
    const alumnoId = user.id;

    Promise.all([
      obtenerAlumnoFormateado(alumnoId).catch((error) => {
        console.error("Error al cargar alumno:", error);
        return null;
      }),
      obtenerAsistenciaPorAlumno(alumnoId).catch((error) => {
        console.error("Error al cargar asistencias:", error);
        return [];
      })
    ])
      .then(([alumnoData, asistenciasData]) => {
        setAlumno(alumnoData);
        setAsistencias(asistenciasData || []);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);


  const asistenciasFiltradas = useMemo(() => {
    return (asistencias || []).filter(a => {
      let matchFecha = true;
      let matchDisp = true;

      if (filtroFecha) {
        try {
          const fechaFormat = new Date(a.fecha).toISOString().split('T')[0];
          matchFecha = fechaFormat === filtroFecha;
        } catch { matchFecha = false; }
      }

      if (filtroDispositivo) {
        const d = a.dispositivo ? a.dispositivo.toLowerCase() : '';
        matchDisp = d.includes(filtroDispositivo.toLowerCase());
      }

      return matchFecha && matchDisp;
    });
  }, [asistencias, filtroFecha, filtroDispositivo]);

  const formatearFecha = (fechaStr: string) => {
    if (!fechaStr) return '-';
    try {
      const opciones: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
      return new Date(fechaStr).toLocaleDateString('es-ES', opciones);
    } catch { return fechaStr; }
  };

  const formatearHora = (horaStr: string) => {
    if (!horaStr) return '-';
    const partes = horaStr.split(':');
    if (partes.length >= 2) {
      return `${partes[0]}:${partes[1]}`;
    }
    return horaStr;
  };

  if (loading) {
    return (
      <div className="layout-wrapper">
        <NavbarAlumno />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>Cargando historial de asistencia...</p>
        </div>
      </div>
    );
  }

  const displayAlumno = alumno || {
    idsenati: 'N/A',
    nombres: 'No disponible',
    apellidos: '',
    carrera: 'Desconocida',
    semestre: 0
  };

  return (
    <div className="layout-wrapper">
      <NavbarAlumno />
      <div className="app-container">
        

        <div className="main-content">
          <div className="content-area" style={{ marginTop: '20px' }}>
            <div className="card-panel glass-card">
              <div className="card-header-row">
                <div className="card-title-main">
                  REGISTRO DE ASISTENCIA
                </div>
              </div>

              <div className="asistencia-container">

                <div className="asistencia-stats-bar">
                  <div className="stat-box">
                    <span className="stat-label">Total Registros</span>
                    <span className="stat-value">{asistenciasFiltradas.length}</span>
                  </div>
                  <Calendar size={32} className="header-decoration-icon" />
                </div>


                <div className="student-filters-grid">
                  <div className="filter-field">
                    <label>Filtrar por Fecha</label>
                    <div className="input-with-icon">
                      <input 
                        type="date" 
                        className="custom-input" 
                        value={filtroFecha}
                        onChange={(e) => setFiltroFecha(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="filter-field">
                    <label>Buscar Dispositivo</label>
                    <div className="input-with-icon">
                      <Search size={18} className="inner-icon" />
                      <input 
                        type="text" 
                        placeholder="Ej. Laptop, iPad..." 
                        className="custom-input padded-left" 
                        value={filtroDispositivo}
                        onChange={(e) => setFiltroDispositivo(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="filter-action-icon">
                    <Filter size={20} />
                  </div>
                </div>


                <div className="student-table-wrapper">
                  <table className="student-asistencia-table">
                    <thead>
                      <tr>
                        <th><Calendar size={14} /> FECHA</th>
                        <th><Clock size={14} /> HORA INGRESO</th>
                        <th><Laptop size={14} /> DISPOSITIVO</th>
                      </tr>
                    </thead>
                    <tbody>
                      {asistenciasFiltradas.length > 0 ? (
                        asistenciasFiltradas.map((asistencia) => (
                          <tr key={asistencia.id}>
                            <td>{formatearFecha(asistencia.fecha)}</td>
                            <td className="time-highlight">{formatearHora(asistencia.hora_ingreso)}</td>
                            <td className={asistencia.dispositivo === 'Sin dispositivo' ? 'no-device' : 'has-device'}>
                              {asistencia.dispositivo}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="empty-row">
                            No se encontraron registros de asistencia.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="alumno-info-panel glass-sidebar">
          <div className="sidebar-header">
            <h1 className="sidebar-title">ALUMNO</h1>
          </div>

          <div className="avatar-section">
            <div className="avatar-circle">
              <User size={48} className="avatar-icon" />
            </div>
          </div>

          <div className="alumno-details-list">
            <div className="detail-row">
              <span className="detail-label">ID SENATI</span>
              <span className="detail-value">{displayAlumno.idsenati}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">NOMBRE</span>
              <span className="detail-value">{displayAlumno.nombres}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">APELLIDOS</span>
              <span className="detail-value">{displayAlumno.apellidos}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">CARRERA</span>
              <span className="detail-value career-text">{displayAlumno.carrera}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">SEMESTRE</span>
              <span className="detail-value">{displayAlumno.semestre}° Semestre</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
