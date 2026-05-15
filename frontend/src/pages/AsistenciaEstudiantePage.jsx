import React, { useState, useEffect } from 'react';
import AsistenciaCard from '../components/AsistenciaCard_vista_estudiante';
import Modal_detalle from '../components/Modal_detalle';
import '../styles/AsistenciaUI_vista_del_estudiante.css';

const AsistenciaEstudiantePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);
  const [misRegistros, setMisRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:3000/api/asistencia'; 

  useEffect(() => {
    const obtenerAsistencias = async () => {
      try {
        setLoading(true);
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) throw new Error('Error al obtener datos');
        const datos = await respuesta.json();
        setMisRegistros(datos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    obtenerAsistencias();
  }, []);

  const abrirDetalle = (item) => {
    setSeleccionado(item);
    setModalOpen(true);
  };

  const totalRegistros = misRegistros.length;
  const totalAsistencias = misRegistros.filter(r => r.estado?.toLowerCase() === 'asistió' || r.hora_llegada).length;
  const totalFaltas = totalRegistros - totalAsistencias;

  return (
    <div className="sistema-container">
      <header className="navbar-estudiante">
        <div className="brand"><span className="icon-pulse">⚡</span> Sistema Estantil</div>
        <div className="user-profile"><span className="icon-user">👤</span> Alumno: Juan Pérez</div>
      </header>

      <main className="content-layout">
        <div className="header-title">
          <h1>Mi Asistencia</h1>
          <p>Consulta el registro de tus ingresos, salidas y dispositivos registrados.</p>
        </div>

        <section className="summary-cards">
          <div className="card-summary">
            <div><span className="card-label">Total Registros</span><div className="card-value">{totalRegistros}</div></div>
            <span className="card-icon gray">📅</span>
          </div>
          <div className="card-summary">
            <div><span className="card-label label-success">Asistencias</span><div className="card-value value-success">{totalAsistencias}</div></div>
            <span className="card-icon green">✔️</span>
          </div>
          <div className="card-summary">
            <div><span className="card-label label-danger">Faltas</span><div className="card-value value-danger">{totalFaltas}</div></div>
            <span className="card-icon red">❌</span>
          </div>
        </section>

        <section className="table-container">
          <div className="table-header-grid">
            <div>📅 FECHA</div><div>🕒 HORA INGRESO</div><div>🕒 HORA SALIDA</div><div>💻 DISPOSITIVO</div><div>👤 GUARDIA</div><div>ESTADO</div>
          </div>
          {loading && <p className="text-center message">Cargando registros...</p>}
          {error && <p className="text-center message error">Error: {error}</p>}
          {!loading && !error && misRegistros.length === 0 && <p className="text-center message">No hay registros.</p>}
          {!loading && !error && misRegistros.map(reg => (
            <AsistenciaCard key={reg.id} registro={reg} onClick={abrirDetalle} />
          ))}
        </section>
      </main>
      <Modal_detalle isOpen={modalOpen} onClose={() => setModalOpen(false)} data={seleccionado} />
    </div>
  );
};

export default AsistenciaEstudiantePage;
