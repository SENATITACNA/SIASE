import React from 'react';

const Modal_detalle = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-ventana" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-center font-bold text-xl mb-4">DETALLE ASISTENCIA</h2>
        <div className="space-y-3">
          <p><strong>Laboratorio:</strong> {data.equipo}</p>
          <p><strong>Ingreso:</strong> {data.hora_llegada}</p>
          <p><strong>Salida:</strong> {data.hora_salida}</p>
          <p><strong>Fecha:</strong> {data.fecha}</p>
        </div>
        <button 
          className="mt-6 w-full bg-gray-300 py-2 rounded-full font-bold"
          onClick={onClose}
        >
          CERRAR
        </button>
      </div>
    </div>
  );
};

export default Modal_detalle;