import type { Alumno } from "../types/alumnos";

interface Props {
  alumno: Alumno;
}

function AlumnoForm({ alumno }: Props) {
  return (
    <div className="card-estudiante">
      <h1>Datos del Estudiante</h1>

      <div className="campo-info">
        <label>Nombre Completo</label>
        <input
          type="text"
          value={alumno.nombre_completo}
          readOnly
        />
      </div>

      <div className="campo-info">
        <label>Carrera</label>
        <input
          type="text"
          value={alumno.carrera}
          readOnly
        />
      </div>

      <div className="campo-info">
        <label>Semestre</label>
        <input
          type="text"
          value={alumno.semestre}
          readOnly
        />
      </div>

      <div className="campo-info">
        <label>ID del Estudiante</label>
        <input
          type="text"
          value={alumno.id}
          readOnly
        />
      </div>
    </div>
  );
}

export default AlumnoForm;