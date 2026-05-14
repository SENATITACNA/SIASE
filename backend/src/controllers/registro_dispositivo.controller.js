const registroService =
    require("../services/registro_dispositivo.service");

class RegistroDispositivoController {

    async obtenerRegistros(req, res) {
        try {
            const resultados =
                await registroService.obtenerRegistros();

            const resultadosOrdenados = resultados.map(
                ({
                    id,
                    alumno_id,
                    idsenati,
                    alumno,
                    objeto,
                    observacion,
                    instructor,
                    vigilante,
                    estado,
                    fecha_envio,
                    fecha_entrada,
                    fecha_salida
                }) => ({
                    id,
                    alumno_id,
                    idsenati,
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

            return res.status(200).json(
                resultadosOrdenados
            );
        } catch (error) {
            console.error(
                "Error en obtenerRegistros:",
                error
            );
            return res.status(500).json({
                error: "Error al obtener los registros"
            });
        }
    }

    async obtenerDispositivosPorAlumno(req, res) {
        try {
            const { alumno_id } = req.params;
            const dispositivos = await registroService.obtenerDispositivosPorAlumno(alumno_id);
            return res.status(200).json(dispositivos);
        } catch (error) {
            console.error("Error en obtenerDispositivosPorAlumno:", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async obtenerSolicitudesPorAlumno(req, res) {
        try {
            const { alumno_id } = req.params;
            const solicitudes = await registroService.obtenerSolicitudesPorAlumno(alumno_id);
            return res.status(200).json(solicitudes);
        } catch (error) {
            console.error("Error en obtenerSolicitudesPorAlumno:", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    /*POST - Registrar dispositivo*/
    async registrarDispositivo(req, res) {
        try {
            const resultado =
                await registroService.registrarDispositivo(
                    req.body
                );
            return res.status(201).json({
                message: "Dispositivo registrado correctamente",
                data: resultado
            });
        } catch (error) {
            console.error(
                "Error en registrarDispositivo:",
                error
            );
            return res.status(500).json({
                error: "Error interno del servidor"
            });
        }
    }

    /*POST - Crear solicitud de ingreso */
    async crearSolicitudIngreso(req, res) {
        try {
            const { alumno_id, dispositivo_id, instructor_id } = req.body;
            if (!alumno_id || !dispositivo_id || !instructor_id) {
                return res.status(400).json({ error: "Faltan datos requeridos" });
            }
            const id = await registroService.crearSolicitudIngreso(alumno_id, dispositivo_id, instructor_id);
            return res.status(201).json({ message: "Solicitud creada", solicitud_id: id });
        } catch (error) {
            console.error("Error en crearSolicitudIngreso:", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async marcarEntrada(req, res) {
        try {
            const { id } = req.params;
            const { guardia_id } = req.body;
            const success = await registroService.marcarEntrada(id, guardia_id);
            if (success) return res.status(200).json({ message: "Entrada marcada" });
            return res.status(404).json({ error: "Registro no encontrado" });
        } catch (error) {
            console.error("Error en marcarEntrada:", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async marcarSalida(req, res) {
        try {
            const { id } = req.params;
            const success = await registroService.marcarSalida(id);
            if (success) return res.status(200).json({ message: "Salida marcada" });
            return res.status(404).json({ error: "Registro no encontrado" });
        } catch (error) {
            console.error("Error en marcarSalida:", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

module.exports =
    new RegistroDispositivoController();
