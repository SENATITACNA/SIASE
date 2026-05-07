const registroService = require('../services/registro_dispositivo.service');

class RegistroDispositivoController {
    async obtenerRegistros(req, res) {
        try {
            const resultados = await registroService.obtenerRegistros();
            
            const resultadosOrdenados = resultados.map(
                ({ id, alumno, objeto, observacion, instructor, vigilante, estado, fecha_envio, fecha_entrada, fecha_salida }) => ({
                    id,
                    alumno,
                    objeto,
                    observacion,
                    instructor,
                    vigilante,
                    estado,
                    fecha_envio,
                    fecha_entrada,
                    fecha_salida,
                })
            );

            res.status(200).json(resultadosOrdenados);
        } catch (error) {
            console.error('Error en obtenerRegistros:', error);
            res.status(500).json({ error: "Error al obtener los registros" });
        }
    }
}

module.exports = new RegistroDispositivoController();
