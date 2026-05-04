const registroService = require("../services/registro_dispositivo.service");

const obtenerRegistros = (req, res) => {
  registroService.obtenerRegistros((err, resultados) => {
    if (err) {
      console.error("[registro_dispositivo] Error MySQL:", err.message);
      return res.status(500).json({
        error: "Error al obtener los registros"
      });
    }

    const resultadosOrdenados = resultados.map(
      ({ id, alumno, objeto, observacion, instructor, guardia, estado, fecha_envio, fecha_entrada, fecha_salida }) => ({
        id,
        alumno,
        objeto,
        observacion,
        instructor,
        guardia,
        estado,
        fecha_envio,
        fecha_entrada,
        fecha_salida,
      })
    );

    res.status(200).json(resultadosOrdenados);
  });
};

module.exports = {
  obtenerRegistros
};