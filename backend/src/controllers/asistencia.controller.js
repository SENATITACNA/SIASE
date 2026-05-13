const { obtenerAsistenciasRepo } = require("../repositories/asistencia.repository");
const { obtenerAsistenciasService } = require("../services/asistencia.service");

const getAsistencias = async (req, res) => {

  try {

    const result =
      await obtenerAsistenciasService(
        req.query
      );

    res.json(result);

  } catch (err) {

    console.log(err);
    return res.status(500).json({
      error: "Error en servidor"
    });
  }
};

module.exports = {
  getAsistencias
};