const {
  obtenerAsistencias
} = require("../services/asistencia.service");

const getAsistencias = async (req,res) => {

  try {

    const { alumno_id, guardia, fecha, equipo } = req.query;

    const result =
      await obtenerAsistencias( alumno_id, guardia, fecha, equipo );

    res.json(result);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Error en servidor"
    });

  }

};
module.exports = {
  getAsistencias
};