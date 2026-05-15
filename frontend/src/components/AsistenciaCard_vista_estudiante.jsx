import React from 'react';

const AsistenciaCard_vista_estudiante = ({ registro, onClick }) => {
  const esFalta = registro.estado?.toLowerCase() === 'falta' || !registro.hora_llegada;

  return (
    <div className="table-row-grid" onClick={() => onClick(registro)}>
      <div>{registro.fecha || '---'}</div>
      <div>{registro.hora_llegada || '-'}</div>
      <div>{registro.hora_salida || '-'}</div>
      <div className="text-muted">{registro.equipo || registro.dispositivo || '-'}</div>
      <div className="text-muted">{registro.guardia || '-'}</div>
      <div>
        <span className={`status-badge ${esFalta ? 'badge-danger' : 'badge-success'}`}>
          {esFalta ? 'Falta' : 'Asistió'}
        </span>
      </div>
    </div>
  );
};

export default AsistenciaCard_vista_estudiante;
