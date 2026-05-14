import { Asistencia } from "../interfaces/asistencia.interface";

interface Props {
  asistencias: Asistencia[];
}

const TablaAsistencia = ({ asistencias }: Props) => {

  return (

    <div className="tabla-container">

      <table>

        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora ingreso</th>
            <th>Dispositivo</th>
            <th>Vigilante</th>
          </tr>
        </thead>

        <tbody>

          {asistencias.map((item) => (

            <tr key={item.id}>

              <td>
                {new Date(item.fecha)
                  .toLocaleDateString()}
              </td>

              <td>{item.hora_ingreso}</td>
              <td>
                {item.equipo
                  ? `${item.equipo} ${item.marca || ""} ${item.modelo || ""}`
                  : "Sin equipo"
                }
              </td>

              <td>{item.vigilante}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

};

export default TablaAsistencia;