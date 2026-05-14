// src/components/ListaEstudiantes.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/lista.css";

interface RegistroAsistencia {
  id: number;
  idsenati: string;
  NombreCompleto: string;
  Carrera: string;
  Semestre?: string | number;
  Fecha: string;
  HoraIngreso: string;
}

const ListaEstudiantes: React.FC = () => {
  const navigate = useNavigate();
  const [dni, setDni] = useState<string>("");
  const [asistencia, setAsistencia] = useState<RegistroAsistencia[]>([]);
  const [filtroMes, setFiltroMes] = useState<string>("");
  const [filtroCarrera, setFiltroCarrera] = useState<string>("");
  const [filtroIdsenati, setFiltroIdsenati] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3000/api/asistencia-tabla")
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setAsistencia(data.data);
        }
      })
      .catch((err) => console.error("Error al cargar asistencia:", err));
  }, []);

  const registrarAsistencia = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dni) return;
    setFiltroIdsenati(dni);
    setDni("");
  };

  const registrosFiltrados = asistencia.filter((a) => {
    const fecha = new Date(a.Fecha);
    const mesRegistro = fecha.getMonth() + 1;
    const coincideMes = filtroMes ? mesRegistro === parseInt(filtroMes) : true;
    const coincideCarrera = filtroCarrera ? a.Carrera === filtroCarrera : true;
    const coincideIdsenati = filtroIdsenati ? String(a.idsenati) === String(filtroIdsenati) : true;
    // Semestre not available in backend data, so skip for now
    return coincideMes && coincideCarrera && coincideIdsenati;
  });
  return (
    <div className="lista-page">
      <div className="lista-container">
        <button
          type="button"
          className="btn-volver"
          onClick={() => navigate("/dashboard-vigilante")}
        >
          Volver a Menú Principal
        </button>

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
          <button type="submit">Buscar</button>
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
              {/* Add more options as needed */}
            </select>
          </label>
          {/* Removed semestre filter since not available in backend data */}
        </div>
      </section>
      <section className="list-section">
        <h2>Lista Registrada</h2>
        <table>
          <thead>
            <tr>
              <th>ID SENATI</th>
              <th>Nombre Completo</th>
              <th>Carrera</th>
              <th>Semestre</th>
              <th>Fecha de Ingreso</th>
              <th>Hora de Ingreso</th>
            </tr>
          </thead>
          <tbody>
            {registrosFiltrados.map((a) => (
              <tr key={a.id}>
                <td>{a.idsenati}</td>
                <td>{a.NombreCompleto}</td>
                <td>{a.Carrera}</td>
                <td>{a.Semestre ?? "N/A"}</td>
                <td>{a.Fecha}</td>
                <td>{a.HoraIngreso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <footer>
        <p>SENATI</p>
      </footer>
    </div>
  </div>
  );
};
export default ListaEstudiantes;
