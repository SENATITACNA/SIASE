import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, Clock, Laptop, Filter, Search } from 'lucide-react';
import NavbarAlumno from '../components/NavbarAlumno';
import { obtenerAlumno } from '../services/alumnoService';
import { obtenerAsistenciaPorAlumno } from '../services/asistenciaService';
import type { AsistenciaRegistro } from '../services/asistenciaService';
import type { Alumno } from '../types/alumnos';

import '../styles/App.css';
import '../styles/DashboardAlumno.css';
import '../styles/BarraLateral.css';
import '../styles/AsistenciaAlumno.css';

export default function AsistenciaAlumno() {
  const navigate = useNavigate();
  const [alumno, setAlumno] = useState<Alumno | null>(null);
  const [asistencias, setAsistencias] = useState<AsistenciaRegistro[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
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
      obtenerAlumno(alumnoId).catch((error) => {
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

  // Derived state for filtered attendances
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
          <p>Cargando información...</p>
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
        
        {/* ===================== CONTENIDO PRINCIPAL ===================== */}
        <div className="main-content">
          <div className="content-area" style={{ marginTop: '20px' }}>
            <div className="card-panel">
              <div className="card-title" style={{ fontSize: '1.25rem' }}>
                Registro de asistencia
              </div>

              <div className="asistencia-container">
                {/* Stats */}
                <div className="asistencia-stats">
                  <div className="stat-item">
                    <span className="stat-label">Total Registros</span>
                    <span className="stat-value">{asistenciasFiltradas.length}</span>
                  </div>
                  <Calendar size={28} color="var(--color-secondary-text)" />
                </div>

                {/* Filters */}
                <div className="filters-row">
                  <div className="filter-group">
                    <span className="filter-label">Filtrar por Fecha</span>
                    <input 
                      type="date" 
                      className="filter-input" 
                      value={filtroFecha}
                      onChange={(e) => setFiltroFecha(e.target.value)}
                    />
                  </div>
                  <div className="filter-group">
                    <span className="filter-label">Buscar Dispositivo</span>
                    <div style={{ position: 'relative' }}>
                      <Search size={18} color="var(--color-secondary-text)" style={{ position: 'absolute', left: '10px', top: '12px' }} />
                      <input 
                        type="text" 
                        placeholder="Ej. Laptop, iPad..." 
                        className="filter-input" 
                        style={{ width: '100%', paddingLeft: '35px', boxSizing: 'border-box' }}
                        value={filtroDispositivo}
                        onChange={(e) => setFiltroDispositivo(e.target.value)}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '10px' }}>
                    <Filter size={20} color="var(--color-secondary-text)" />
                  </div>
                </div>

                {/* Table */}
                <div className="table-container">
                  <table className="asistencia-table">
                    <thead>
                      <tr>
                        <th>
                          <div className="th-content"><Calendar size={14} /> FECHA</div>
                        </th>
                        <th>
                          <div className="th-content"><Clock size={14} /> HORA INGRESO</div>
                        </th>
                        <th>
                          <div className="th-content"><Laptop size={14} /> DISPOSITIVO</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {asistenciasFiltradas.length > 0 ? (
                        asistenciasFiltradas.map((asistencia) => (
                          <tr key={asistencia.id}>
                            <td>{formatearFecha(asistencia.fecha)}</td>
                            <td>{formatearHora(asistencia.hora_ingreso)}</td>
                            <td>{asistencia.dispositivo || '-'}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3}>
                            <div className="empty-state">
                              <p>No se encontraron registros de asistencia.</p>
                            </div>
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
              <span>{displayAlumno.idsenati}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Nombre</span>
              <span>{displayAlumno.nombres}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Apellidos</span>
              <span>{displayAlumno.apellidos}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Carrera</span>
              <span>{displayAlumno.carrera}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Semestre</span>
              <span>{displayAlumno.semestre}° Semestre</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
