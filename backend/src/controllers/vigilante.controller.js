const vigilanteService = require("../services/vigilante.service");

const getVigilantes = (req, res) => {
  vigilanteService.obtenerVigilantes((err, data) => {
    if (err) {
      console.error("[vigilante] Error MySQL:", err.message);
      return res.status(500).json({
        mensaje: "Error al obtener vigilantes"
      });
    }

    res.status(200).json(data);
  });
};

module.exports = {
  getVigilantes
};