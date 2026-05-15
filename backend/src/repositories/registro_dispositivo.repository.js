const db = require("../config/db");

class RegistroDispositivoRepository {
    async obtenerRegistros() {
        const query = `
            SELECT 
                r.id,
                r.alumno_id,
                a.idsenati,
                r.estado,
                r.fecha_envio,
                r.fecha_entrada,
                r.fecha_salida,
                r.observacion,
                CONCAT(a.nombres, ' ', a.apellidos) AS alumno,
                CONCAT(i.nombre, ' ', i.apellido) AS instructor,
                CONCAT(g.nombre, ' ', g.apellido) AS vigilante,
                CONCAT(d.tipo, ' ', d.marca, ' ', d.modelo) AS objeto
            FROM registro_dispositivo r
            JOIN datos_alumnos a
                ON r.alumno_id = a.id
            JOIN instructor i
                ON r.instructor_id = i.id
            JOIN vigilante g
                ON r.guardia_id = g.id
            JOIN dispositivos_x_alumno d
                ON r.objeto_id = d.id
            ORDER BY r.id DESC
        `;

        const [rows] = await db.promise().query(query);

        return rows;
    }

    async obtenerDispositivosPorAlumno(alumnoId) {
        const query = `
            SELECT
                d.id,
                d.tipo,
                d.marca,
                d.modelo,
                d.numero_serie,
                d.descripcion,
                d.estado
            FROM dispositivos_x_alumno d
            WHERE d.alumno_id = ?
            ORDER BY d.fecha_creacion DESC
        `;
        const [rows] = await db.promise().query(query, [alumnoId]);
        return rows;
    }

    async obtenerSolicitudesPorAlumno(alumnoId) {
        const query = `
            SELECT
                r.id,
                r.estado,
                r.fecha_envio,
                r.fecha_entrada,
                r.fecha_salida,
                r.observacion,
                d.tipo,
                d.marca,
                d.modelo,
                d.numero_serie,
                d.descripcion,
                r.objeto_id AS dispositivo_id
            FROM registro_dispositivo r
            JOIN dispositivos_x_alumno d ON r.objeto_id = d.id
            WHERE r.alumno_id = ?
            ORDER BY r.fecha_envio DESC
        `;
        const [rows] = await db.promise().query(query, [alumnoId]);
        return rows;
    }

    async crearDispositivo(data) {
        const query = `
            INSERT INTO dispositivos_x_alumno (
                alumno_id,
                tipo,
                marca,
                modelo,
                numero_serie,
                descripcion,
                estado,
                usuario_creacion
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            data.alumno_id,
            data.tipo,
            data.marca,
            data.modelo,
            data.numero_serie,
            data.descripcion,
            1,
            "sistema",
        ];

        const [result] = await db.promise().query(query, values);

        return result.insertId;
    }

    async crearRegistro(data) {
        const query = `
            INSERT INTO registro_dispositivo (
                estado,
                fecha_entrada,
                fecha_salida,
                alumno_id,
                instructor_id,
                guardia_id,
                objeto_id,
                usuario_creacion
            )
            VALUES (?, '1000-01-01', '1000-01-01', ?, ?, ?, ?, ?)
        `;

        const values = [
            1, // estado: activo/ingresado
            data.alumno_id,
            data.instructor_id,
            data.guardia_id,
            data.objeto_id,
            "sistema",
        ];

        const [result] = await db.promise().query(query, values);

        return result.insertId;
    }

    async crearSolicitudIngreso(alumnoId, dispositivoId, instructorId) {
        // estado 0 = en_espera, guardia_id=1 como placeholder (se asigna después)
        const query = `
            INSERT INTO registro_dispositivo (
                estado,
                fecha_entrada,
                fecha_salida,
                alumno_id,
                instructor_id,
                guardia_id,
                objeto_id,
                usuario_creacion
            )
            VALUES (0, '1000-01-01', '1000-01-01', ?, ?, 1, ?, 'alumno')
        `;
        const [result] = await db.promise().query(query, [alumnoId, instructorId, dispositivoId]);
        return result.insertId;
    }
    async marcarEntrada(registroId, guardiaId) {
        const query = `
            UPDATE registro_dispositivo 
            SET estado = 1, fecha_entrada = CURDATE(), guardia_id = ?
            WHERE id = ?
        `;
        const [result] = await db.promise().query(query, [guardiaId, registroId]);
        return result.affectedRows > 0;
    }

    async marcarSalida(registroId) {
        const query = `
            UPDATE registro_dispositivo 
            SET estado = 2, fecha_salida = CURDATE()
            WHERE id = ?
        `;
        const [result] = await db.promise().query(query, [registroId]);
        return result.affectedRows > 0;
    }
}

module.exports = new RegistroDispositivoRepository();
