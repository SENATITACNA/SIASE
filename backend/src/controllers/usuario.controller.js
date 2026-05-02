const usuarioService = require('../services/usuario.service');

const getInstructor = (req, res) => {
    usuarioService.obtenerInstructor((err, data) => {
        if (err) {
            res.status(500).json({ error: "Error al obtener instructores" });
        } else {
            res.json(data);
        }
    });
};