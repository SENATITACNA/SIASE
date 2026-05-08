const db = require("../config/db");
const vigilanteService = require("../services/vigilante.service");

class VigilanteController {
  
  async obtenerVigilantes(req, res) {
    try {
      const [rows] = await db.query(
        "SELECT id, nombre, apellido, turno FROM vigilante WHERE estado = 1"
      );
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAlumnos(req, res) {
    try {
      const alumnos = await vigilanteService.listarAlumnos();
      res.status(200).json(alumnos);
    } catch (error) {
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  }

  async putEstadoRegistro(req, res) {
    try {
      const registroId = req.params.id;
      const { nuevo_estado, vigilante_id } = req.body;

      if (!nuevo_estado || !vigilante_id) {
        return res.status(400).json({
          mensaje: "Faltan datos requeridos (nuevo_estado, vigilante_id)",
        });
      }

      const resultado = await vigilanteService.procesarCambioEstado(
        registroId,
        nuevo_estado,
        vigilante_id
      );
      res.status(200).json(resultado);
    } catch (error) {
      res
        .status(error.message.includes("no encontrado") ? 404 : 500)
        .json({ mensaje: error.message });
    }
  }

  async getVigilantePorId(req, res) {
    try {
      const { vigilante_id } = req.params;
      const data = await vigilanteService.obtenerVigilantePorId(vigilante_id);

      if (data.length === 0) {
        return res.status(404).json({ mensaje: "Vigilante no encontrado" });
      }

      const { vigilante_id: vid, nombre, apellido, turno } = data[0];
      res.status(200).json({ vigilante_id: vid, nombre, apellido, turno });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener el vigilante" });
    }
  }
}

module.exports = new VigilanteController();