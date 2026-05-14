import React, { useState, useMemo } from 'react';
import TarjetaStat from '../components/TarjetaStat';
import FiltrosBar from '../components/FiltrosBar';
import TablaAsistencia from '../components/TablaAsistencia';
import { registrosMock } from '../services/asistenciaService';
import { FiltrosAsistencia } from '../types/asistencia';

const IconoCalendario = () => (
  <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
    <rect x="3" y="4" width="14" height="14" rx="2.5" stroke="#6b7280" strokeWidth="1.5"/>
    <path d="M3 8h14" stroke="#6b7280" strokeWidth="1.5"/>
    <path d="M7 2v2M13 2v2" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconoCheck = () => (
  <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="7" stroke="#16a34a" strokeWidth="1.5"/>
    <path d="M6.5 10.5l2.5 2.5 4.5-5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const filtrosVacios: FiltrosAsistencia = { fecha: '', dispositivo: '', vigilante: '' };

const RegistroAsistenciaPage: React.FC = () => {
  const [filtros, setFiltros] = useState<FiltrosAsistencia>(filtrosVacios);

  const registrosFiltrados = useMemo(() => {
    return registrosMock.filter((r) => {
      if (filtros.fecha && r.fecha !== filtros.fecha) return false;
      if (filtros.dispositivo && !r.dispositivo?.toLowerCase().includes(filtros.dispositivo.toLowerCase())) return false;
      if (filtros.vigilante && !r.vigilante?.toLowerCase().includes(filtros.vigilante.toLowerCase())) return false;
      return true;
    });
  }, [filtros]);

  const totalAsistencias = useMemo(
    () => registrosMock.filter((r) => r.horaIngreso !== null).length,
    []
  );

  return (
    <div style={{
      padding: '32px 40px',
      maxWidth: '1100px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', margin: 0, letterSpacing: '-0.02em' }}>
        Registro de asistencia
      </h1>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <TarjetaStat etiqueta="Total Registros" valor={registrosMock.length} icono={<IconoCalendario />} />
        <TarjetaStat etiqueta="Asistencias" valor={totalAsistencias} icono={<IconoCheck />} variante="exito" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e8eaed',
        borderRadius: '14px',
        padding: '20px 24px',
      }}>
        <FiltrosBar filtros={filtros} onChange={setFiltros} onLimpiar={() => setFiltros(filtrosVacios)} />
      </div>

      <TablaAsistencia registros={registrosFiltrados} />
    </div>
  );
};

export default RegistroAsistenciaPage;