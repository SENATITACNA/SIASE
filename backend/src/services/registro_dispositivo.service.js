const registroRepository = require("../repositories/registro_dispositivo.repository");

const obtenerRegistros = (callback) => {
  registroRepository.obtenerRegistros(callback);
};

module.exports = {
  obtenerRegistros
};
