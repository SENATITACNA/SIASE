import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';
import BarraLateral from '../components/BarraLateral';
import NavegacionSuperior from '../components/NavegacionSuperior';
import Navbar from '../components/Navbar';
import ResultadosBusqueda from '../components/ResultadosBusqueda';
import DetallesItem from '../components/DetallesItem';
import EstadoEntrada from '../components/EstadoEntrada';

function DashboardVigilante() {
  const navigate = useNavigate();
  const [alumnos, setAlumnos] = useState<any[]>([]);
  const [allAlumnos, setAllAlumnos] = useState<any[]>([]);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [guardia, setGuardia] = useState({ nombre: "Cargando...", rol: "Oficial de Guardia", turno: "", id: "" });

  useEffect(() => {
    // --- TU LÓGICA DE SEGURIDAD ---
    const userData = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    if (!userData || role !== "vigilante") {
      navigate("/");
      return;
    }

    const user = JSON.parse(userData);

    // Carga de datos usando la IP del servidor
    fetch(`http://80.241.217.53:3000/api/vigilantes/${user.guardia_id}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.vigilante_id) {
          setGuardia({
            nombre: data.nombre + " " + data.apellido,
            rol: "ID de vigilante: " + data.vigilante_id,
            turno: data.turno,
            id: "GRD-" + data.vigilante_id
          });
        }
      })
      .catch(err => console.error("Error al cargar vigilante:", err));

    fetchAlumnos();
  }, [navigate]);

  const fetchAlumnos = () => {
    fetch("http://80.241.217.53:3000/api/alumnos")
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
      .catch(err => console.error("Error al cargar registros:", err));
  };

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
    fetch(`http://80.241.217.53:3000/api/alumnos/${registro.alumno_id}`)
      .then(res => res.json())
      .then(alumnoData => {
        setSelectedAlumno({
          ...registro,
          nombre: alumnoData.nombres,
          apellido: alumnoData.apellidos,
          carrera: alumnoData.carrera,
          semestre: alumnoData.semestre,
          idsenati: alumnoData.idsenati,
          tipo: alumnoData.tipo,
          marca: alumnoData.marca,
          modelo: alumnoData.modelo,
          numero_serie: alumnoData.numero_serie,
          descripcion: alumnoData.descripcion
        });
      })
      .catch(err => console.error("Error al cargar datos del alumno:", err));
  };

  return (
    <div className="layout-wrapper">
      <Navbar />
      <div className="app-container">
        <BarraLateral alumno={selectedAlumno} />

        <div className="main-content">
          {/* Aquí NavegacionSuperior ya debe traer el botón de QR del main */}
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
  );
}

export default DashboardVigilante;