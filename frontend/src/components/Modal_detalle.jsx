import React from 'react';

const Modal_detalle = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;
  const esFalta = data.estado?.toLowerCase() === 'falta' || !data.hora_llegada;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header-detail">
          <h2>Detalle de Asistencia</h2>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
        </header>
        <main className="modal-body-detail">
          <div className="detail-row"><span className="detail-label">📅 Fecha:</span><span className="detail-value">{data.fecha || '---'}</span></div>
          <div className="detail-row"><span className="detail-label">🕒 Hora Ingreso:</span><span className="detail-value">{data.hora_llegada || '-'}</span></div>
          <div className="detail-row"><span className="detail-label">🕒 Hora Salida:</span><span className="detail-value">{data.hora_salida || '-'}</span></div>
          <div className="detail-row"><span className="detail-label">💻 Dispositivo:</span><span className="detail-value">{data.equipo || data.dispositivo || '-'}</span></div>
          <div className="detail-row"><span className="detail-label">👤 Guardia:</span><span className="detail-value">{data.guardia || '-'}</span></div>
          <div className="detail-row"><span className="detail-label">📌 Estado:</span>
            <span className={`status-badge ${esFalta ? 'badge-danger' : 'badge-success'}`}>{esFalta ? 'Falta' : 'Asistió'}</span>
          </div>
        </main>
        <footer className="modal-footer-detail">
          <button className="modal-action-btn" onClick={onClose}>Cerrar</button>
        </footer>
      </div>
    </div>
  );
};

export default Modal_detalle;

