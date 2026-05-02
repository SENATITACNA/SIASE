const vigilanteRepository = require("../repositories/vigilante.repository");

const obtenerVigilantes = (callback) => {
  vigilanteRepository.getVigilantes(callback);
};

module.exports = {
  obtenerVigilantes
};