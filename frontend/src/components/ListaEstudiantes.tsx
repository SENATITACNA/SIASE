import { useState, useEffect } from "react";
interface Estudiante {
  id: number;
  nombres: string;
  apellidos: string;
  idsenati: string;
  semestre: number;
  carrera_id: number;
  carrera_nombre: string;
  estado: number;
  fecha_creacion: string;
}
interface Carrera {
  id: number;
  nombre: string;
}
interface RegistroAsistencia extends Estudiante {
  horaIngreso: string;
  fechaIngreso: string;
}
const ListaEstudiantes: React.FC = () => {
  const [dni, setDni] = useState<string>("");
  const [alumnos, setAlumnos] = useState<Estudiante[]>([]);
  const [carreras, setCarreras] = useState<Carrera[]>([]);
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
  useEffect(() => {
    fetch("http://localhost:3000/carreras")
      .then((res) => res.json())
      .then((data: Carrera[]) => setCarreras(data))
      .catch((err) => console.error("Error al cargar carreras:", err));
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
    const hoy = new Date().toLocaleDateString();
    const yaRegistrado = asistencia.some(
      (a) => a.idsenati === dni && a.fechaIngreso === hoy
    );
    if (yaRegistrado) {
      alert("Este estudiante ya registró asistencia hoy");
      return;
    }
    const ahora = new Date();
    const nuevoRegistro: RegistroAsistencia = {
      ...estudiante,
      fechaIngreso: ahora.toLocaleDateString(),
      horaIngreso: ahora.toLocaleTimeString(),
    };
    setAsistencia((prev) => [...prev, nuevoRegistro]);
    setDni("");
  };
  const registrosFiltrados = asistencia.filter((a) => {
    const mesRegistro = new Date(a.fechaIngreso).getMonth() + 1;
    const coincideMes = filtroMes ? mesRegistro === parseInt(filtroMes) : true;
    const coincideCarrera = filtroCarrera
      ? a.carrera_id === parseInt(filtroCarrera)
      : true;
    const coincideSemestre = filtroSemestre
      ? a.semestre === parseInt(filtroSemestre)
      : true;
    return coincideMes && coincideCarrera && coincideSemestre;
  });
  return (
    <div>
      <section className="form-section">
        <h2>Lista de Asistencia</h2>
        <form onSubmit={registrarAsistencia}>
          <label htmlFor="dni">ID de Estudiante:</label>
          <input
            type="text"
            id="dni"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
            maxLength={20}
          />
          <button type="submit">Buscar</button>
        </form>
        <div className="filters">
          <h3>Filtros</h3>
          <label>
            Mes:
            <select value={filtroMes} onChange={(e) => setFiltroMes(e.target.value)}>
              <option value="">Todos</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </label>
          <label>
            Carrera:
            <select value={filtroCarrera} onChange={(e) => setFiltroCarrera(e.target.value)}>
              <option value="">Todas</option>
              {carreras.map((c) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </label>
          <label>
            Semestre:
            <select value={filtroSemestre} onChange={(e) => setFiltroSemestre(e.target.value)}>
              <option value="">Todos</option>
              {[...Array(6)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </label>
        </div>
      </section>
      <section className="list-section">
        <h2>Asistencias Registradas</h2>
        <table>
          <thead>
            <tr>
              <th>ID SENATI</th>
              <th>Nombre</th>
              <th>Carrera</th>
              <th>Semestre</th>
              <th>Fecha de Ingreso</th>
              <th>Hora de Ingreso</th>
            </tr>
          </thead>
          <tbody>
            {registrosFiltrados.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No hay registros
                </td>
              </tr>
            ) : (
              registrosFiltrados.map((a, index) => (
                <tr key={index}>
                  <td>{a.idsenati}</td>
                  <td>{`${a.nombres} ${a.apellidos}`}</td>
                  <td>{a.carrera_nombre}</td>
                  <td>{a.semestre}</td>
                  <td>{a.fechaIngreso}</td>
                  <td>{a.horaIngreso}</td>
                </tr>
              ))
            )}
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