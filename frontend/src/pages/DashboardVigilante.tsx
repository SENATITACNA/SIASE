import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';
import BarraLateral from '../components/BarraLateral';
import NavegacionSuperior from '../components/NavegacionSuperior';
import Navbar from '../components/Navbar';
import ResultadosBusqueda from '../components/ResultadosBusqueda';
import DetallesItem from '../components/DetallesItem';
import EstadoEntrada from '../components/EstadoEntrada';

const API_URL = "http://80.241.217.53:3000/api";

function DashboardVigilante() {
  const navigate = useNavigate();
  const [alumnos, setAlumnos] = useState<any[]>([]);
  const [allAlumnos, setAllAlumnos] = useState<any[]>([]);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [guardia, setGuardia] = useState({ 
    nombre: "Cargando...", 
    rol: "Oficial de Guardia", 
    turno: "Activo", 
    id: "" 
  });

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      try {
        const cookieContent = parts.pop()?.split(';').shift();
        return cookieContent ? JSON.parse(decodeURIComponent(cookieContent)) : null;
      } catch (e) {
        console.error("Error al parsear cookie:", e);
        return null;
      }
    }
    return null;
  };

  const fetchAlumnos = () => {
    fetch(`${API_URL}/alumnos`)
      .then(res => res.json())
      .then(data => {
        const mapped = data.map((a: any) => ({
          id: a.id,
          alumno_id: a.id,
          idsenati: a.idsenati,
          alumno: a.nombres + " " + a.apellidos,
          estado: 1,
          fecha_envio: new Date().toISOString()
        }));
        setAllAlumnos(mapped);
        setAlumnos(mapped);
      })
      .catch(err => console.error("Error al cargar alumnos:", err));
  };

  useEffect(() => {
    const session = getCookie('user_session');

    if (!session) {
      console.warn("Sin sesión activa. Redirigiendo al login...");
      navigate("/login");
      return;
    }

    setGuardia({
      nombre: session.nombre,
      rol: "Oficial de Guardia",
      turno: "Activo",
      id: "ID: " + session.id 
    });
    fetchAlumnos();
  }, [navigate]);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setAlumnos(allAlumnos);
      return;
    }
    const lower = searchTerm.toLowerCase();
    const filtered = allAlumnos.filter(a =>
      a.idsenati.includes(lower) ||
      a.alumno.toLowerCase().includes(lower)
    );
    setAlumnos(filtered);
  };

  const handleSelectRegistro = (registro: any) => {
    fetch(`${API_URL}/alumnos/${registro.alumno_id}`)
      .then(res => res.json())
      .then(alumnoData => {
        setSelectedAlumno({
          ...registro,
          nombre: alumnoData.nombres,
          apellido: alumnoData.apellidos,
          carrera: alumnoData.carrera,
          semestre: alumnoData.semestre,
          idsenati: alumnoData.idsenati,
          instructor: alumnoData.instructor,
          tipo: alumnoData.tipo,
          marca: alumnoData.marca,
          modelo: alumnoData.modelo,
          numero_serie: alumnoData.numero_serie,
          descripcion: alumnoData.descripcion
        });
      })
      .catch(err => console.error("Error al cargar detalles del alumno:", err));
  };

  return (
    <div className="layout-wrapper">
      <Navbar />
      <div className="app-container">
        <BarraLateral alumno={selectedAlumno} />
        <div className="main-content">
          <NavegacionSuperior guardia={guardia} onSearch={handleSearch} />
          <div className="content-area">
            <ResultadosBusqueda
              alumnos={alumnos}
              selectedAlumno={selectedAlumno}
              onSelect={handleSelectRegistro}
            />
            <div className="content-grid">
              <DetallesItem alumno={selectedAlumno} />
              <EstadoEntrada alumno={selectedAlumno} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardVigilante;