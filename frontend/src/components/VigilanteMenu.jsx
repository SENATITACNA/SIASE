import React from 'react';
import senatiMainLogo from '../assets/logo_senati_principal.png'; 

const VigilanteMenu = ({ userData, onLogout }) => {
  return (
    <div className="app-wrap">
      <header className="topbar">
        <div className="topbar-logo-container">
          <img src={senatiMainLogo} alt="Logo SENATI" className="topbar-logo-img" />
        </div>
        <div className="topbar-blue-content">
          <span className="topbar-view-title">CONTROL DE ACCESO</span>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <div className="sb-user">
            <div className="sb-avatar" style={{background: '#1a237e'}}>{userData.nombre[0]}</div>
            <div>
              <div className="sb-name">{userData.nombre} {userData.apellido}</div>
              <div className="sb-id">Turno: {userData.turno}</div>
              <div className="sb-role-tag">VIGILANTE</div>
            </div>
          </div>
          <button className="sb-item active">Escanear QR</button>
          <button className="sb-logout" onClick={onLogout}>Cerrar Sesión</button>
        </aside>

        <main className="main">
          <div className="page-header">
            <h1 className="ph-title">Panel de Vigilancia</h1>
            <p className="ph-id">Operador: {userData.nombre} · Turno actual: {userData.turno}</p>
          </div>
          
          <div className="menu-grid">
            <div className="mc featured" style={{borderColor: '#2ecc71'}}>
              <div className="mc-title">Iniciar Escaneo</div>
              <div className="mc-desc">Cámara lista para registrar ingresos.</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VigilanteMenu;