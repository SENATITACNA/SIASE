import NavbarAlumno from '../components/NavbarAlumno';
import '../styles/App.css';

export default function QRAlumno() {
  return (
    <div className="layout-wrapper">
      <NavbarAlumno />
      <div className="app-container">
        <div className="main-content">
          <div className="content-area">
            <div className="card-panel">
              <div className="card-title">
                <span className="title-dot" />
                ESCÁNER DE QR
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', opacity: 0.6 }}>
                <p>El escáner de QR para alumnos se encuentra en desarrollo.</p>
                <p>Aquí podrás escanear el código para validar tu ingreso.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
