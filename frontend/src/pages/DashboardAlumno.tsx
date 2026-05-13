  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";

  import Navbar from "../components/Navbar";
  import AlumnoForm from "../components/AlumnoForm";

  import { obtenerAlumno }
  from "../services/alumnoService";

  import type { Alumno }
  from "../types/alumnos";

  import "../styles/estudiante.css";

  function DashboardAlumno() {

    const [alumno, setAlumno] =
      useState<Alumno | null>(null);

    const navigate = useNavigate();

    useEffect(() => {

      const userData =
        localStorage.getItem("user");

      if (!userData) {
        navigate("/login");
        return;
      }

      const user = JSON.parse(userData);

      obtenerAlumno(user.id)
        .then((data) => setAlumno(data))
        .catch((error) =>
          console.error(error)
        );

    }, [navigate]);

    if (!alumno) {
      return <p>Cargando...</p>;
    }

    return (
      <div className="layout-wrapper">

        <Navbar />

        <div className="contenedor-estudiante">

          <AlumnoForm alumno={alumno} />
        </div>

      </div>
    );
  }

  export default DashboardAlumno;