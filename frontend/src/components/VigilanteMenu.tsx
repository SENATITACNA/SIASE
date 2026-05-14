import React from 'react';
import senatiLogo from '../assets/Senati.png';
import '../styles/Menu.css';

interface VigilanteProps {
  guardiaData: { nombre: string };
  onLogout: () => void;
}

const VigilanteMenu: React.FC<VigilanteProps> = ({ guardiaData, onLogout }) => {
  return (
    <div className="siase-layout">
      <header className="siase-header">
        <img src={senatiLogo} alt="SENATI" className="siase-logo" />
        <span style={{ fontWeight: 700, fontSize: '14px' }}>CONTROL DE ACCESO CAMPUS</span>
      </header>

      <div className="siase-container">
        <aside className="siase-sidebar">
          <div className="siase-user-card">
            <div className="siase-avatar" style={{ backgroundColor: '#1e293b' }}>V</div>
            <p className="siase-name" style={{ fontWeight: 600, margin: 0 }}>{guardiaData.nombre}</p>
          </div>

          <nav className="siase-nav">
            <button className="siase-btn-nav active">Monitor de Ingreso</button>
            <button className="siase-btn-nav">Registro de Equipos</button>
            <button className="siase-btn-nav">Incidencias</button>
          </nav>

          <button className="siase-logout" onClick={onLogout}>Cerrar Sesión</button>
        </aside>

        <main className="siase-main">
          <div className="siase-search-bar">
            <input type="text" className="siase-input" placeholder="Buscar ID o Apellido para verificación rápida..." />
            <button style={{ padding: '0 20px', backgroundColor: '#08C0CB', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>ESCANEAR QR</button>
          </div>

          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: '0 0 16px 0' }}>Ingresos Recientes</h3>
            <table className="siase-table">
              <thead>
                <tr>
                  <th>ID SENATI</th>
                  <th>ALUMNO</th>
                  <th>EQUIPO</th>
                  <th>HORA</th>
                  <th>ESTADO</th>
                </tr>
              </thead>
              <tbody>
                {/* Esto se llenaría con los datos de la base de datos */}
                <tr>
                  <td>00134567</td>
                  <td>Juan Perez</td>
                  <td>Laptop HP</td>
                  <td>14:30</td>
                  <td style={{ color: '#10b981', fontWeight: 600 }}>Autorizado</td>
                </tr>
                <tr>
                  <td>00156789</td>
                  <td>Maria Garcia</td>
                  <td>Tablet Samsung</td>
                  <td>14:35</td>
                  <td style={{ color: '#10b981', fontWeight: 600 }}>Autorizado</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VigilanteMenu;