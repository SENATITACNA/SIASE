const vigilanteService = require('../services/vigilante.service');

const getInstructor = (req, res) => {
    vigilanteService.obtenerInstructor((err, data) => {
        if (err) {
            res.status(500).json({ error: "Error al obtener instructores" });
        } else {
            res.json(data);
        }
    });
};