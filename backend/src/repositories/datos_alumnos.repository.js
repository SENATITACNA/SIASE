const db = require("../config/db");

const obtenerAlumnoPorId = async (id) => {
  const sql = `
    SELECT 
      id,
      nombres,
      apellidos,
      idsenati,
      semestre,
      carrera_id,
      estado
    FROM datos_alumnos
    WHERE id = ?
  `;

  const [rows] = await db.promise().query(sql, [id]);
  return rows[0];
};

module.exports = {
  obtenerAlumnoPorId,
};
