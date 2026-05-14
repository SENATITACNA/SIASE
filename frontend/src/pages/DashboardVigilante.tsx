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
        // En el backend, obtenerRegistros ya devuelve un join con los datos del alumno y dispositivo
        const mapped = data.map((r: any) => ({
          ...r,
          id: r.id, // ID del registro
          alumno_id: r.alumno_id,
          idsenati: r.idsenati,
          alumno: r.alumno,
          estado: r.estado, // 0=en espera, 1=ingreso, 2=salida
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
              id: data.id // Usamos el PK 'id' real para las operaciones de BD
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
    // Ya tenemos casi todo en el registro, pero podemos refinar si es necesario
    setSelectedAlumno({
      ...registro,
      nombre: registro.alumno.split(' ')[0], // Aproximación
      apellido: registro.alumno.split(' ').slice(1).join(' '),
      // Los detalles del dispositivo vienen en el 'objeto' formateado, 
      // pero para DetallesItem necesitamos los campos sueltos
    });

    // Opcional: Fetch detallado si faltan campos (marca, modelo, etc.)
    fetch(`${API_BASE}/api/alumnos/${registro.alumno_id}`)
      .then(res => res.json())
      .then(alumnoData => {
        setSelectedAlumno(prev => ({
          ...prev,
          carrera: alumnoData.carrera,
          semestre: alumnoData.semestre,
          idsenati: alumnoData.idsenati,
          instructor: alumnoData.instructor,
          // Buscamos el dispositivo específico
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
