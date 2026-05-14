import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import senatiVigilante from '../assets/SenatiVigilante.png';
import '../styles/Navbar.css';

const NavbarAlumno = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="global-navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={senatiVigilante} alt="SENATI" className="logo" />
          <span className="titulo">SIASE</span>
        </div>

        <div className="navbar-menu">
          <div className="nav-links">
            <span className="nav-item active" onClick={() => navigate('/dashboard-alumno')}>Dashboard</span>
            <span className="nav-item" onClick={() => navigate('/qr-alumno')}>Escáner de QR</span>
            <span className="nav-item" onClick={() => navigate('/asistencia-alumno')}>Asistencia</span>
          </div>

          <button className="navbar-logout logout-btn" onClick={handleLogout} title="Cerrar sesión">
            <LogOut size={20} className="logout-icon" />
            <span>Salir</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAlumno;
