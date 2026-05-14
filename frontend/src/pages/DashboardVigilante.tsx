import { useState, useEffect } from 'react';
import '../styles/App.css';
import BarraLateral from '../components/BarraLateral';
import NavegacionSuperior from '../components/NavegacionSuperior';
import Navbar from '../components/Navbar';
import ResultadosBusqueda from '../components/ResultadosBusqueda';
import DetallesItem from '../components/DetallesItem';
import EstadoEntrada from '../components/EstadoEntrada';
import { API_BASE } from '../services/api';

function DashboardVigilante() {
  const [alumnos, setAlumnos] = useState<any[]>([]);
  const [allAlumnos, setAllAlumnos] = useState<any[]>([]);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [guardia, setGuardia] = useState({ nombre: "Cargando...", rol: "Oficial de Guardia", turno: "", id: "" });

  const fetchRegistros = () => {
    fetch(`${API_BASE}/api/registro_dispositivo`)
      .then(res => res.json())
      .then(data => {

        const mapped = data.map((r: any) => ({
          ...r,
          id: r.id,
          alumno_id: r.alumno_id,
          idsenati: r.idsenati,
          alumno: r.alumno,
          estado: r.estado,
          fecha_envio: r.fecha_envio
        }));
        setAllAlumnos(mapped);
        setAlumnos(mapped);
      })
      .catch(err => console.error("Error al cargar registros:", err));
  };

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      const vigilanteId = user.guardia_id ?? user.id;
      fetch(`${API_BASE}/api/vigilantes/${vigilanteId}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.vigilante_id) {
            setGuardia({
              nombre: data.nombre + " " + data.apellido,
              rol: "ID de vigilante: " + data.vigilante_id,
              turno: data.turno,
              id: data.id
            });
          }
        })
        .catch(err => console.error("Error al cargar vigilante:", err));
    }

    fetchRegistros();
  }, []);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setAlumnos(allAlumnos);
      return;
    }
    const lower = searchTerm.toLowerCase();
    const filtered = allAlumnos.filter(a =>
      a.idsenati.toLowerCase().includes(lower) ||
      a.alumno.toLowerCase().includes(lower)
    );
    setAlumnos(filtered);
  };

  const handleSelectRegistro = (registro: any) => {

    setSelectedAlumno({
      ...registro,
      nombre: registro.alumno.split(' ')[0],
      apellido: registro.alumno.split(' ').slice(1).join(' '),

    });


    fetch(`${API_BASE}/api/alumnos/${registro.alumno_id}`)
      .then(res => res.json())
      .then(alumnoData => {
        setSelectedAlumno(prev => ({
          ...prev,
          carrera: alumnoData.carrera,
          semestre: alumnoData.semestre,
          idsenati: alumnoData.idsenati,
          instructor: alumnoData.instructor,

          tipo: registro.objeto.split(' ')[0] || 'Dispositivo',
          marca: registro.objeto.split(' ')[1] || 'N/A',
          modelo: registro.objeto.split(' ').slice(2).join(' ') || 'N/A',
        }));
      })
      .catch(err => console.error("Error al cargar detalles extra:", err));
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
            <EstadoEntrada 
              alumno={selectedAlumno} 
              guardiaId={guardia.id}
              onRefresh={fetchRegistros}
            />
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardVigilante;
