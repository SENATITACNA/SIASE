const carrerasRepository = require("../repositories/carreras.repository");

const obtenerCarreras = async () => {
  return await carrerasRepository.obtenerCarrerasRepo();
};

module.exports = {
  obtenerCarreras,
};
