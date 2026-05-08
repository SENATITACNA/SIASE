const db = require("../config/db");

exports.obtenerAlumnoPorId = async (id) => {
  const query = `
        SELECT
            da.id,
            CONCAT(da.nombres, ' ', da.apellidos) AS nombre_completo,
            c.nombre AS carrera,
            da.semestre
        FROM datos_alumnos da
        INNER JOIN carreras c
            ON da.carrera_id = c.id
        WHERE da.id = ?
    `;

  const [rows] = await db.promise().query(query, [id]);

  return rows[0];
};
