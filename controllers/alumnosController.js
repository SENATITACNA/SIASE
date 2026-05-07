const alumnosService = require("../services/alumnosService");

const obtenerAlumnoPorId = (req, res) => {
  const { id } = req.params;
  alumnosService.obtenerAlumnoPorId(id, (err, alumno) => {
    if (err) {
      return res.status(500).json({ error: "Error del servidor" });
    }
    if (!alumno) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }
    res.json(alumno);
  });
};

module.exports = {
  obtenerAlumnoPorId
};