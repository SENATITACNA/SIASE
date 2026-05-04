const vigilanteService = require("../services/vigilante.service");

const getVigilantePorId = (req, res) => {
  const { vigilante_id } = req.params;

  vigilanteService.obtenerVigilantePorId(vigilante_id, (err, data) => {
    if (err) {
      console.error("[vigilante] Error MySQL:", err.message);
      return res.status(500).json({
        mensaje: "Error al obtener el vigilante"
      });
    }

    if (data.length === 0) {
      return res.status(404).json({ mensaje: "Vigilante no encontrado" });
    }

    const { vigilante_id: vid, nombre, apellido, turno } = data[0];

    res.status(200).json({ vigilante_id: vid, nombre, apellido, turno });
  });
};

module.exports = {
  getVigilantePorId
};