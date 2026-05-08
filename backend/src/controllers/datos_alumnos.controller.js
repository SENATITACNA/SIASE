const alumnosService = require("../services/datos_alumnos.service");

const obtenerAlumnoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const alumno = await alumnosService.obtenerAlumnoPorId(id);
    if (!alumno) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }
    res.json(alumno);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error del servidor" });
  }
};

module.exports = {
  obtenerAlumnoPorId,
};
