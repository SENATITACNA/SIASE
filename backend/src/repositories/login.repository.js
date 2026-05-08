const db = require("../config/db");

exports.obtenerAlumnoPorCredenciales = async (usuario, password) => {
  const query = "SELECT * FROM datos_alumnos WHERE idsenati = ? AND password_alumno = ? AND estado = 1";
  const [rows] = await db.promise().query(query, [usuario, password]);
  return rows;
};

exports.obtenerVigilantePorCredenciales = async (usuario, password) => {
  const query = "SELECT * FROM vigilante WHERE guardia_id = ? AND password_vigilante = ? AND estado = 1";
  const [rows] = await db.promise().query(query, [usuario, password]);
  return rows;
};
