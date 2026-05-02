const guardiaService = require('../services/guardia.service');

class GuardiaController {
    async getAlumnos(req, res) {
        try {
            const alumnos = await guardiaService.listarAlumnos();
            res.status(200).json(alumnos);
        } catch (error) {
            console.error('Error en getAlumnos:', error);
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
    }

    async putEstadoRegistro(req, res) {
        try {
            const registroId = req.params.id;
            const { nuevo_estado, guardia_id } = req.body;

            if (!nuevo_estado || !guardia_id) {
                return res.status(400).json({ mensaje: 'Faltan datos requeridos (nuevo_estado, guardia_id)' });
            }

            const resultado = await guardiaService.procesarCambioEstado(registroId, nuevo_estado, guardia_id);
            res.status(200).json(resultado);

        } catch (error) {
            console.error('Error en putEstadoRegistro:', error.message);
            res.status(error.message.includes('no encontrado') ? 404 : 500)
                .json({ mensaje: error.message });
        }
    }
}

module.exports = new GuardiaController();