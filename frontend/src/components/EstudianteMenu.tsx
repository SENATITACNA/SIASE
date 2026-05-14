import React from 'react';
import senatiLogo from '../assets/Senati.png';
import '../styles/Menu.css';

interface EstudianteProps {
  userData: { nombres: string; apellidos: string; idsenati: string };
  onLogout: () => void;
}

const EstudianteMenu: React.FC<EstudianteProps> = ({ userData, onLogout }) => {
  return (
    <div className="siase-layout">
      <header className="siase-header">
        <img src={senatiLogo} alt="SENATI" className="siase-logo" />
        <span style={{ fontWeight: 700, fontSize: '14px' }}>MI PORTAL SENATI</span>
      </header>

      <div className="siase-container">
        <aside className="siase-sidebar">
          <div className="siase-user-card">
            <div className="siase-avatar">{userData.nombres[0]}</div>
            <p style={{ fontWeight: 600, margin: 0 }}>{userData.nombres}</p>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0' }}>{userData.idsenati}</p>
          </div>

          <nav className="siase-nav">
            <button className="siase-btn-nav active">Inicio</button>
            <button className="siase-btn-nav">Registrar mi Equipo</button>
            <button className="siase-btn-nav">Generar mi QR</button>
          </nav>

          <button className="siase-logout" onClick={onLogout}>Cerrar Sesión</button>
        </aside>

        <main className="siase-main">
          <div style={{ background: 'white', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ marginTop: 0 }}>Bienvenido, {userData.nombres}</h2>
            <p style={{ color: '#64748b' }}>Desde aquí puedes gestionar el acceso de tus equipos al campus.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EstudianteMenu;