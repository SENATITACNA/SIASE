import React from 'react';

const AsistenciaCard_vista_estudiante = ({ registro, onClick }) => {
  return (
    <div className="fila-capsula" onClick={() => onClick(registro)}>
      <div style={{maxWidth: '60px'}}>{registro.id || "-"}</div>
      <div>{registro.equipo || "Equipo Registrado"}</div>
      <div>{registro.hora_llegada || "--:--"}</div>
      <div>{registro.hora_salida || "--:--"}</div>
      <div>{registro.fecha || "----/--/--"}</div>
    </div>
  );
};

export default AsistenciaCard_vista_estudiante;