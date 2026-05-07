// repositories/instructor.repository.js

const db = require("../config/db");

exports.obtenerInstructores = async () => {

    const query = `
        SELECT
            id,
            CONCAT(nombre, ' ', apellido) AS nombre_completo
        FROM instructor
        WHERE estado = 1
    `;

    const [rows] = await db.query(query);

    return rows;
};