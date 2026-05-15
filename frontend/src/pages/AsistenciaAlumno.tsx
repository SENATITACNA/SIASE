import {
  useEffect,
  useState
} from "react";

import NavbarAlumno
from "../components/NavbarAlumno";

import TablaAsistencia
from "../components/TablaAsistencia";

import {
  obtenerAsistencias
} from "../services/asistenciaService";

import type {
  Asistencia
} from "../types/asistencia";

import "../styles/Asistencia.css";
import "../styles/App.css";

export default function AsistenciaAlumno() {

  const [
    asistencias,
    setAsistencias
  ] = useState<Asistencia[]>([]);

  const [
    fecha,
    setFecha
  ] = useState("");

  const [
    equipo,
    setEquipo
  ] = useState("");

  const [
    guardia,
    setGuardia
  ] = useState("");

  const cargarAsistencias =
  async () => {

    try {

      const user =
        JSON.parse(
          localStorage.getItem("user") || "{}"
        );

      const data =
        await obtenerAsistencias({
          alumno_id: user.id,
          fecha,
          equipo,
          guardia
        });

      setAsistencias(data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    cargarAsistencias();

  }, []);

  return (

    <div className="layout-wrapper">

      <NavbarAlumno />

      <div className="app-container">

        <div className="main-content">

          <div className="content-area">

            <div className="card-panel">

              <div className="card-title">
                <span className="title-dot" />
                REGISTRO DE ASISTENCIA
              </div>

              <div className="filtros-container">

                <input
                  type="date"
                  value={fecha}
                  onChange={(e) =>
                    setFecha(e.target.value)
                  }
                />

                <input
                  type="text"
                  placeholder="Buscar dispositivo"
                  value={equipo}
                  onChange={(e) =>
                    setEquipo(e.target.value)
                  }
                />

                <input
                  type="text"
                  placeholder="Buscar vigilante"
                  value={guardia}
                  onChange={(e) =>
                    setGuardia(e.target.value)
                  }
                />

                <button
                  onClick={cargarAsistencias}
                >
                  Buscar
                </button>

              </div>

              <TablaAsistencia
                asistencias={asistencias}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}