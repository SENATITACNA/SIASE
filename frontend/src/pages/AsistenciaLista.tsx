import { useEffect, useState } from "react";

import {
  obtenerAsistencias
} from "../services/asistencia.service";

import {
  Asistencia,
  FiltrosAsistencia
} from "../interfaces/asistencia.interface";

import TablaAsistencia
from "../components/TablaAsistencia";

import "../styles/Asistencia.css";

const AsistenciaLista = () => {

  const [asistencias,
  setAsistencias] = useState<Asistencia[]>([]);

  const [filtros,
  setFiltros] = useState<FiltrosAsistencia>({
    fecha: "",
    equipo: "",
    vigilante: ""
  });

  useEffect(() => {

    cargarAsistencias();

  }, [filtros]);

  const cargarAsistencias =
  async () => {

    try {

      const data =
      await obtenerAsistencias({
        alumno_id: 1,
        ...filtros
      });

      setAsistencias(data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFiltros({
      ...filtros,
      [e.target.name]: e.target.value
    });

  };

  const limpiarFiltros = () => {

    setFiltros({
      fecha: "",
      equipo: "",
      vigilante: ""
    });

  };

  return (

    <div className="container-asistencia">

      <h1>
        Registro de asistencia
      </h1>

      <div className="cards">

        <div className="card-info">
          <h3>Total Registros</h3>
          <p>{asistencias.length}</p>
        </div>

        <div className="card-info success">
          <h3>Asistencias</h3>
          <p>{asistencias.length}</p>
        </div>

      </div>

      <div className="filtros">

        <div className="campo">
          <label>Filtrar por Fecha</label>
          <input
            type="date"
            name="fecha"
            value={filtros.fecha}
            onChange={handleChange}
          />
        </div>

        <div className="campo">
          <label>Buscar Dispositivo</label>
          <input
            type="text"
            name="equipo"
            placeholder="Ej. Laptop"
            value={filtros.equipo}
            onChange={handleChange}
          />
        </div>

        <div className="campo">
          <label>Buscar Vigilante</label>
          <input
            type="text"
            name="vigilante"
            placeholder="Nombre del vigilante"
            value={filtros.vigilante}
            onChange={handleChange}
          />
        </div>

        <button
          className="btn-limpiar"
          onClick={limpiarFiltros}
        >
          Limpiar
        </button>

      </div>

      <TablaAsistencia
        asistencias={asistencias}
      />

    </div>

  );

};

export default AsistenciaLista;