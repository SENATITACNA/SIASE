const service = require("../services/lista-asistencia.service");
const getListaAsistencia = async (req, res) => {
  try {
    const { idsenati } = req.params;
    const data = await service.obtenerListaAsistencia(idsenati);
    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "No se encontró asistencia para este alumno"
      });
    }
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
module.exports = {
  getListaAsistencia
};