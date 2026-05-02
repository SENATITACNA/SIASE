const db = require("../config/db");

const getVigilantes = (callback) => {
  const sql = `
    SELECT id, vigilante_id, nombre, apellido, turno, estado
    FROM vigilante
  `;

  db.query(sql, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

module.exports = {
  getVigilantes
};