import { useEffect, useState } from "react";

import { obtenerAsistencias }
from "../services/asistencia.service";

import { Asistencia }
from "../interfaces/asistencia.interface";

import { TablaAsistencia }
from "../components/TablaAsistencia";

import "../styles/Asistencia.css";

const AsistenciaLista = () => {

  const [asistencias,
  setAsistencias] = useState<Asistencia[]>([]);

  useEffect(() => {

    cargarAsistencias();

  }, []);

  const cargarAsistencias =
  async () => {

    try {

      const data =
      await obtenerAsistencias({
        alumno_id: 1
      });

      setAsistencias(data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div>

      <h1>
        Historial de Asistencia
      </h1>

      <AsistenciaTable
        asistencias={asistencias}
      />

    </div>

  );

};

export default AsistenciaLista;