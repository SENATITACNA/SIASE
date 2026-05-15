import type {
  Asistencia
} from "../types/asistencia";

interface Props {
  asistencias: Asistencia[];
}

export default function TablaAsistencia({
  asistencias
}: Props) {

  return (

    <div className="tabla-container">

      <table className="tabla-asistencia">

        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora ingreso</th>
            <th>Dispositivo</th>
            <th>Vigilante</th>
          </tr>
        </thead>

        <tbody>

          {asistencias.length === 0 ? (

            <tr>
              <td
                colSpan={4}
                className="sin-datos"
              >
                No se encontraron registros
              </td>
            </tr>

          ) : (

            asistencias.map((item) => (

              <tr key={item.id}>

                <td>
                  {new Date(
                    item.fecha
                  ).toLocaleDateString()}
                </td>

                <td>
                  {item.hora_ingreso}
                </td>

                <td>
                  {
                    item.equipo
                    ? `${item.equipo} ${item.marca} ${item.modelo}`
                    : "Sin dispositivo"
                  }
                </td>

                <td>
                  {item.vigilante}
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );

}
