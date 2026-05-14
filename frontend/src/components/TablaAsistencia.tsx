import React from 'react';
import { RegistroAsistencia } from '../types/asistencia';
import { formatearFecha } from '../services/asistenciaService';

interface Props {
  registros: RegistroAsistencia[];
}

const TablaAsistencia: React.FC<Props> = ({ registros }) => {
  const thEstilo: React.CSSProperties = {
    padding: '12px 20px',
    textAlign: 'left',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    color: '#9ca3af',
    whiteSpace: 'nowrap',
  };

  const tdEstilo: React.CSSProperties = {
    padding: '14px 20px',
    color: '#374151',
    verticalAlign: 'middle',
    borderBottom: '1px solid #f3f4f6',
  };

  if (registros.length === 0) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        padding: '60px 24px',
        color: '#9ca3af',
        fontSize: '14px',
        border: '1px solid #e8eaed',
        borderRadius: '14px',
      }}>
        <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
          <rect x="8" y="6" width="32" height="36" rx="4" stroke="#d1d5db" strokeWidth="2"/>
          <path d="M16 14h16M16 20h16M16 26h10" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p>No se encontraron registros</p>
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #e8eaed' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead style={{ background: '#f9fafb', borderBottom: '1px solid #e8eaed' }}>
          <tr>
            <th style={thEstilo}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M2 6h12" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M5.5 1v2M10.5 1v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Fecha
              </span>
            </th>
            <th style={thEstilo}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 5v3.5l2 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Hora Ingreso
              </span>
            </th>
            <th style={thEstilo}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M4 6h8M4 9h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Dispositivo
              </span>
            </th>
            <th style={thEstilo}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2a3 3 0 100 6 3 3 0 000-6zM3 13c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Vigilante
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro) => (
            <tr key={registro.id} style={{ transition: 'background 0.1s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#fafafa')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <td style={{ ...tdEstilo, fontWeight: 500, color: '#111827', whiteSpace: 'nowrap' }}>
                {formatearFecha(registro.fecha)}
              </td>
              <td style={tdEstilo}>
                {registro.horaIngreso
                  ? <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>{registro.horaIngreso}</span>
                  : <span style={{ color: '#d1d5db' }}>—</span>
                }
              </td>
              <td style={tdEstilo}>
                {registro.dispositivo || <span style={{ color: '#d1d5db' }}>—</span>}
              </td>
              <td style={tdEstilo}>
                {registro.vigilante || <span style={{ color: '#d1d5db' }}>—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaAsistencia;