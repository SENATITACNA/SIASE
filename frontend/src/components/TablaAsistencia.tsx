import { Asistencia } from "../types/asistencia";

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
              <td>{item.fecha}</td>
              <td>{item.hora_ingreso}</td>
              <td>
                {item.dispositivo || "Sin dispositivo"}
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