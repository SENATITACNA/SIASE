import { useState, useEffect } from 'react';
import '../styles/App.css';
import BarraLateral from '../components/BarraLateral';
import NavegacionSuperior from '../components/NavegacionSuperior';
import ResultadosBusqueda from '../components/ResultadosBusqueda';
import DetallesItem from '../components/DetallesItem';
import EstadoEntrada from '../components/EstadoEntrada';

function DashboardVigilante() {
  const [alumnos, setAlumnos] = useState<any[]>([]);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [guardia, setGuardia] = useState({ nombre: "Cargando...", rol: "Oficial de Guardia", turno: "", id: "" });

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setGuardia({
        nombre: (user.nombre || "Vigilante") + " " + (user.apellido || ""),
        rol: "ID de vigilante: " + user.guardia_id,
        turno: user.turno,
        id: "GRD-" + user.guardia_id
      });
    }

    fetch("http://localhost:3000/api/registro_dispositivo")
      .then(res => res.json())
      .then(data => setAlumnos(data))
      .catch(err => console.error("Error al cargar registros:", err));
  }, []);

  return (
    <div className="app-container">
      <BarraLateral alumno={selectedAlumno} />
      
      <div className="main-content">
        <NavegacionSuperior guardia={guardia} />
        
        <div className="content-area">
          <ResultadosBusqueda 
            alumnos={alumnos} 
            selectedAlumno={selectedAlumno} 
            onSelect={setSelectedAlumno} 
          />
          <div className="content-grid">
            <DetallesItem alumno={selectedAlumno} />
            <EstadoEntrada alumno={selectedAlumno} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardVigilante;
