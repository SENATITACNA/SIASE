const db = require("../config/db");

const obtenerAlumnoPorId = async (id, callback) => {
    try {
        const sql = "SELECT nombres, apellidos FROM datos_alumnos WHERE id = ?";
        const [resultados] = await db.query(sql, [id]);
        callback(null, resultados);
    } catch (err) {
        callback(err, null);
    }
};

module.exports = { obtenerAlumnoPorId };