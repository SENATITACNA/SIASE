const db = require("../config/db");

const obtenerAlumnoPorId = (id, callback) => {
    const sql = "SELECT nombres, apellidos FROM datos_alumnos WHERE id = ?";

    db.query(sql, [id], (err, resultados) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, resultados);
        }
    });
};

module.exports = {
    obtenerAlumnoPorId
};