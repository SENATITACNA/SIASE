import { Asistencia } from "../interfaces/asistencia.interface";

interface Props {
  asistencias: Asistencia[];
}

const TablaAsistencia = ({ asistencias }: Props) => {

  return (

    <table>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Hora ingreso</th>
          <th>Hora salida</th>
          <th>Vigilante</th>
          <th>Equipo</th>
        </tr>
      </thead>
      <tbody>
        {asistencias.map((item) => (
          <tr key={item.id}>
            <td>{item.fecha}</td>
            <td>{item.hora_ingreso}</td>
            <td>{item.hora_salida}</td>
            <td>{item.vigilante}</td>
            <td>
              {item.equipo || "Sin equipo"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

  );

};

export default TablaAsistencia;