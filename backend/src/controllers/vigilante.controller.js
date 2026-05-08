const db = require("../config/db");

const obtenerVigilantes = async (req, res) => {
    try {
        // Consultamos solo los vigilantes activos
        const [rows] = await db.query("SELECT id, nombre, apellido, turno FROM vigilante WHERE estado = 1");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { obtenerVigilantes };