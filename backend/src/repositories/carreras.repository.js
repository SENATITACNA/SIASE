const db = require('../config/db');

const obtenerCarrerasRepo = async () => {
    const [rows] = await db.promise().query("SELECT id, nombre FROM carreras WHERE estado = 1 ORDER BY nombre ASC");
    return rows;
};

module.exports = {
    obtenerCarrerasRepo
};
