const datosAlumnosService = require('../services/datos_alumnos.service');

class DatosAlumnosController {
    async obtenerAlumnoPorId(req, res) {
        try {
            const id = req.params.id;
            const alumno = await datosAlumnosService.obtenerAlumnoPorId(id);
            
            if (alumno.length === 0) {
                return res.status(404).json({ mensaje: "Alumno no encontrado" });
            }
            res.status(200).json(alumno[0]);
        } catch (error) {
            console.error('Error en obtenerAlumnoPorId:', error);
            res.status(500).json({ error: "Error del servidor" });
        }
    }
}

module.exports = new DatosAlumnosController();
