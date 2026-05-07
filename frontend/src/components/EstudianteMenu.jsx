import React from 'react';
import senatiMainLogo from '../assets/logo_senati_principal.png'; 

const EstudianteMenu = ({ userData, onLogout }) => {
  return (
    <div className="app-wrap">
      <header className="topbar">
        <div className="topbar-logo-container">
          <img src={senatiMainLogo} alt="Logo SENATI" className="topbar-logo-img" />
        </div>
        <div className="topbar-blue-content">
          <span className="topbar-view-title">PORTAL ESTUDIANTE</span>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <div className="sb-user">
            <div className="sb-avatar">{userData.nombres[0]}</div>
            <div>
              <div className="sb-name">{userData.nombres} {userData.apellidos}</div>
              <div className="sb-id">ID: {userData.idsenati}</div>
              <div className="sb-role-tag">ESTUDIANTE</div>
            </div>
          </div>
          
          <nav className="sb-nav">
            <button className="sb-item active">Inicio</button>
            <button className="sb-item">Mi código QR</button>
          </nav>

          <button className="sb-logout" onClick={onLogout}>Cerrar Sesión</button>
        </aside>

        <main className="main">
          <div className="page-header">
            <h1 className="ph-title">Hola, {userData.nombres}</h1>
            <p className="ph-id">ID Senati: {userData.idsenati} · {new Date().toLocaleDateString()}</p>
          </div>

          <div className="menu-grid">
            <div className="mc featured">
              <div className="mc-title">Mi código QR</div>
              <div className="mc-desc">Genera tu pase de entrada con tu ID {userData.idsenati}.</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EstudianteMenu;