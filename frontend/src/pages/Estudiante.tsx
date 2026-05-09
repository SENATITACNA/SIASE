import { useEffect, useState } from "react";
import { obtenerAlumno } from "../services/alumnoService";
import type { Alumno } from "../types/alumnos";
import AlumnoForm from "../components/alumnoForm";
import "../styles/estudiante.css";

function Estudiante() {

  const [alumno, setAlumno] = useState<Alumno | null>(null);

  useEffect(() => {

    const alumnoId = localStorage.getItem("alumno_id");

    if (alumnoId) {

      obtenerAlumno(Number(alumnoId))
        .then((data) => setAlumno(data))
        .catch((error) => console.error(error));

    }

  }, []);

  if (!alumno) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="contenedor-estudiante">
      <AlumnoForm alumno={alumno} />
    </div>
  );
}

export default Estudiante;