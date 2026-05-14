import React from 'react';
import { FiltrosAsistencia } from '../types/asistencia';

interface Props {
  filtros: FiltrosAsistencia;
  onChange: (filtros: FiltrosAsistencia) => void;
  onLimpiar: () => void;
}

const FiltrosBar: React.FC<Props> = ({ filtros, onChange, onLimpiar }) => {
  const tieneFiltros = filtros.fecha || filtros.dispositivo || filtros.vigilante;

  const inputEstilo: React.CSSProperties = {
    width: '100%',
    height: '40px',
    padding: '0 12px 0 36px',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    fontSize: '14px',
    color: '#374151',
    background: '#ffffff',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const campoEstilo: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1,
    minWidth: '180px',
  };

  const etiquetaEstilo: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 700,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', flexWrap: 'wrap' }}>

      <div style={campoEstilo}>
        <label style={etiquetaEstilo}>Filtrar por Fecha</label>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <svg style={{ position: 'absolute', left: '10px', color: '#9ca3af', pointerEvents: 'none' }} width="15" height="15" viewBox="0 0 20 20" fill="none">
            <rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M3 8h14" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M7 2v2M13 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            type="date"
            style={inputEstilo}
            value={filtros.fecha}
            onChange={(e) => onChange({ ...filtros, fecha: e.target.value })}
          />
        </div>
      </div>

      <div style={campoEstilo}>
        <label style={etiquetaEstilo}>Buscar Dispositivo</label>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <svg style={{ position: 'absolute', left: '10px', color: '#9ca3af', pointerEvents: 'none' }} width="15" height="15" viewBox="0 0 20 20" fill="none">
            <circle cx="9" cy="9" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M13 13l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            style={inputEstilo}
            value={filtros.dispositivo}
            onChange={(e) => onChange({ ...filtros, dispositivo: e.target.value })}
            placeholder="Ej. Laptop, iPad..."
          />
        </div>
      </div>

      <div style={campoEstilo}>
        <label style={etiquetaEstilo}>Buscar Vigilante</label>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <svg style={{ position: 'absolute', left: '10px', color: '#9ca3af', pointerEvents: 'none' }} width="15" height="15" viewBox="0 0 20 20" fill="none">
            <circle cx="9" cy="9" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M13 13l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            style={inputEstilo}
            value={filtros.vigilante}
            onChange={(e) => onChange({ ...filtros, vigilante: e.target.value })}
            placeholder="Nombre del vigilante..."
          />
        </div>
      </div>

      {tieneFiltros && (
        <button
          onClick={onLimpiar}
          title="Limpiar filtros"
          style={{
            width: '40px',
            height: '40px',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
            background: '#fff',
            color: '#9ca3af',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  );
};

export default FiltrosBar;