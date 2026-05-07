const alumnosService = require("../services/alumnos.service");

exports.obtenerAlumnoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const alumno = await alumnosService.obtenerAlumnoPorId(id);

        if (!alumno) {
            return res.status(404).json({
                message: "Alumno no encontrado"
            });
        }

        res.json(alumno);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};