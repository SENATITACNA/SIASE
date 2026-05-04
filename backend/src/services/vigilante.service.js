const vigilanteRepository = require("../repositories/vigilante.repository");

const obtenerVigilantePorId = (vigilante_id, callback) => {
  vigilanteRepository.getVigilantePorId(vigilante_id, callback);
};

module.exports = {
  obtenerVigilantePorId
};