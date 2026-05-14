import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import senatiVigilante from '../assets/SenatiVigilante.png';
import '../styles/Navbar.css';

const NavbarAlumno = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { title: 'Dashboard', path: '/dashboard-alumno' },
    { title: 'Escáner de QR', path: '/qr-alumno' },
    { title: 'Asistencia', path: '/asistencia-alumno' }
  ];

  return (
    <nav className="global-navbar">
      <div className="navbar-container">
        <Link to="/dashboard-alumno" className="navbar-logo">
          <img src={senatiVigilante} alt="SENATI" className="logo" />
          <span className="titulo">SIASE</span>
        </Link>

        <div className="navbar-menu">
          <div className="nav-links">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.title}
              </Link>
            ))}
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
