const pool = require('../config/db');

class DatosAlumnosRepository {
    async obtenerAlumnoPorId(id) {
        const query = "SELECT id, nombres, apellidos FROM datos_alumnos WHERE id = ?";
        const [rows] = await pool.query(query, [id]);
        return rows;
    }
}

module.exports = new DatosAlumnosRepository();