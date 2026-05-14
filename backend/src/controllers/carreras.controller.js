const carrerasService = require("../services/carreras.service");

const getCarreras = async (req, res) => {
  try {
    const result = await carrerasService.obtenerCarreras();
    res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error en servidor" });
  }
};

module.exports = {
  getCarreras,
};
