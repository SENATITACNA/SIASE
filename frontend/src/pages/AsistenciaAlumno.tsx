import NavbarAlumno from '../components/NavbarAlumno';
import '../styles/App.css';

export default function AsistenciaAlumno() {
  return (
    <div className="layout-wrapper">
      <NavbarAlumno />
      <div className="app-container">
        <div className="main-content">
          <div className="content-area">
            <div className="card-panel">
              <div className="card-title">
                <span className="title-dot" />
                MI ASISTENCIA
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', opacity: 0.6 }}>
                <p>Tu historial de asistencia se encuentra en desarrollo.</p>
                <p>Aquí podrás ver tus horas de ingreso y salida registradas.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}