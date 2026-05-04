const datosAlumnosService = require("../services/datos_alumnosService");

const obtenerAlumnoPorId = (req, res) => {
    const id = req.params.id;

    datosAlumnosService.obtenerAlumnoPorId(id, (err, alumno) => {
        if (err) {
            res.status(500).json({ error: "Error del servidor" });
        } else {
            if (alumno.length === 0) {
                res.status(404).json({ mensaje: "Alumno no encontrado" });
            } else {
                res.json(alumno[0]);
            }
        }
    });
};

module.exports = {
    obtenerAlumnoPorId
};