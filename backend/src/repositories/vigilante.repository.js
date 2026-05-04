const db = require("../config/db");

const getVigilantePorId = (vigilante_id, callback) => {
  const sql = `
    SELECT vigilante_id, nombre, apellido, turno
    FROM vigilante
    WHERE vigilante_id = ?
  `;

  db.query(sql, [vigilante_id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

module.exports = {
  getVigilantePorId
};