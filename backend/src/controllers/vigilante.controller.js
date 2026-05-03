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

const getDispositivoAlumno = (req, res) => {
    vigilanteService.obtenerDispositivoAlumno((err, data) => {
        if (err) {
            res.status(500).json({ error: "Error al obtener dispositivos alumno" });
        } else {
            res.json(data);
        }
    });
};

module.exports = {
  getInstructor,
  getDispositivoAlumno
};