const alumnosService = require("../services/alumnos.service");

exports.obtenerAlumnoFormateadoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const alumno = await alumnosService.obtenerAlumnoFormateadoPorId(id);

    if (!alumno) {
      return res.status(404).json({
        message: "Alumno no encontrado",
      });
    }

    res.json(alumno);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

exports.obtenerDatosAlumnoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const alumno = await alumnosService.obtenerDatosAlumnoPorId(id);

    if (!alumno) {
      return res.status(404).json({
        message: "Alumno no encontrado",
      });
    }

    res.json(alumno);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
