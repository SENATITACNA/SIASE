const registroService = require("../services/registro_dispositivo.service");

const obtenerRegistros = (req, res) => {
  registroService.obtenerRegistros((err, resultados) => {
    if (err) {
      console.error("[registro_dispositivo] Error MySQL:", err.message);
      return res.status(500).json({
        error: "Error al obtener los registros"
      });
    }

    res.status(200).json(resultados);
  });
};

module.exports = {
  obtenerRegistros
};