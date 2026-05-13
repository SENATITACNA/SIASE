// src/components/ListaEstudiantes.tsx
import { useState, useEffect } from "react";
interface Estudiante {
  id: string;              
  nombres: string;         
  apellidos: string;       
  idsenati: string;        
  semestre: string;        
  carrera_id: string;     
  fecha_creacion: string; 
}
interface RegistroAsistencia extends Estudiante {
  horaIngreso: string;
}
const ListaEstudiantes: React.FC = () => {
  const [dni, setDni] = useState<string>("");
  const [alumnos, setAlumnos] = useState<Estudiante[]>([]);
  const [asistencia, setAsistencia] = useState<RegistroAsistencia[]>([]);
  const [filtroMes, setFiltroMes] = useState<string>("");
  const [filtroCarrera, setFiltroCarrera] = useState<string>("");
  const [filtroSemestre, setFiltroSemestre] = useState<string>("");
  useEffect(() => {
    fetch("http://localhost:3000/listaVigilante_alumnos")
      .then((res) => res.json())
      .then((data: Estudiante[]) => setAlumnos(data))
      .catch((err) => console.error("Error al cargar alumnos:", err));
  }, []);
  const buscarEstudiante = (id: string): Estudiante | undefined =>
    alumnos.find((est) => est.idsenati === id);
  const registrarAsistencia = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dni) return;
    const estudiante = buscarEstudiante(dni);
    if (!estudiante) {
      alert("Estudiante no encontrado");
      return;
    }
    const ahora = new Date();
    const nuevoRegistro: RegistroAsistencia = {
      ...estudiante,
      fecha_creacion: ahora.toLocaleDateString(), 
      horaIngreso: ahora.toLocaleTimeString(),  
    };
    setAsistencia((prev) => [...prev, nuevoRegistro]);
    setDni("");
  };
  const registrosFiltrados = asistencia.filter((a) => {
    const mesRegistro = new Date(a.fecha_creacion).getMonth() + 1;
    const coincideMes = filtroMes ? mesRegistro === parseInt(filtroMes) : true;
    const coincideCarrera = filtroCarrera ? a.carrera_id === filtroCarrera : true;
    const coincideSemestre = filtroSemestre ? a.semestre === filtroSemestre : true;
    return coincideMes && coincideCarrera && coincideSemestre;
  });
  return (
    <div>
      <section className="form-section">
        <h2>Lista de Asistencia</h2>
        <form onSubmit={registrarAsistencia}>
          <label htmlFor="dni">ID SENATI:</label>
          <input
            type="text"
            id="dni"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
            maxLength={8}
          />
          <button type="submit">Registrar Ingreso</button>
        </form>
        <div className="filters">
          <h3>Filtros</h3>
          <label>
            Mes:
            <select value={filtroMes} onChange={(e) => setFiltroMes(e.target.value)}>
              <option value="">Todos</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </label>
          <label>
            Carrera:
            <select value={filtroCarrera} onChange={(e) => setFiltroCarrera(e.target.value)}>
              <option value="">Todas</option>
              <option value="Software">Software</option>
              {}
            </select>
          </label>
          <label>
            Semestre:
            <select value={filtroSemestre} onChange={(e) => setFiltroSemestre(e.target.value)}>
              <option value="">Todos</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </label>
        </div>
      </section>
      <section className="list-section">
        <h2>Lista Registrada</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Carrera</th>
              <th>Semestre</th>
              <th>Fecha de Ingreso</th>
              <th>Hora de Ingreso</th>
            </tr>
          </thead>
          <tbody>
            {registrosFiltrados.map((a, index) => (
              <tr key={index}>
                <td>{a.idsenati}</td>
                <td>{`${a.nombres} ${a.apellidos}`}</td>
                <td>{a.carrera_id}</td>
                <td>{a.semestre}</td>
                <td>{a.fecha_creacion}</td>
                <td>{a.horaIngreso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <footer>
        <p>SENATI</p>
      </footer>
    </div>
  );
};
export default ListaEstudiantes;
