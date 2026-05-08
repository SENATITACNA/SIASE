const db = require('../config/db');
const crypto = require('crypto');

const qrController = {
    inicializarTokens: async (req, res) => {
        const { guardia_id } = req.body;
        try {
            const [activos] = await db.query("SELECT id FROM tokens_vigilante WHERE guardia_id = ? AND estado = 'activo'", [guardia_id]);
            let creados = 0;
            while (activos.length + creados < 2) {
                await db.query("INSERT INTO tokens_vigilante (token, guardia_id, estado) VALUES (?, ?, 'activo')", [crypto.randomUUID(), guardia_id]);
                creados++;
            }
            res.json({ message: "Tokens inicializados", creados });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getTokensActivos: async (req, res) => {
        const { guardia_id } = req.params;
        try {
            const [rows] = await db.query(
                "SELECT token FROM tokens_vigilante WHERE guardia_id = ? AND estado = 'activo' ORDER BY fecha_creacion DESC LIMIT 2",
                [guardia_id]
            );
            res.json(rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    rotarToken: async (req, res) => {
        const { guardia_id } = req.body;
        const nuevoToken = crypto.randomUUID();
        
        try {
            await db.query("START TRANSACTION");
            await db.query(
                "UPDATE tokens_vigilante SET estado = 'expirado' WHERE guardia_id = ? AND estado = 'activo' ORDER BY fecha_creacion ASC LIMIT 1",
                [guardia_id]
            );
            await db.query(
                "INSERT INTO tokens_vigilante (token, guardia_id, estado) VALUES (?, ?, 'activo')",
                [nuevoToken, guardia_id]
            );
            await db.query("COMMIT");
            res.json({ message: "Rotación exitosa", token: nuevoToken });
        } catch (error) {
            await db.query("ROLLBACK");
            res.status(500).json({ error: error.message });
        }
    },

    escanearQR: async (req, res) => {
        const { token, alumno_id, guardia_id } = req.body;
        try {
            await db.query("START TRANSACTION");
            
            const [updateResult] = await db.query(
                "UPDATE tokens_vigilante SET estado = 'usado', alumno_id = ? WHERE token = ? AND estado = 'activo'",
                [alumno_id, token]
            );

            if (updateResult.affectedRows === 0) {
                await db.query("ROLLBACK");
                return res.status(400).json({ error: "Token inválido, expirado o ya usado" });
            }

            await db.query(
                "INSERT INTO asistencia (alumno_id, guardia_id, fecha, hora_ingreso) VALUES (?, ?, CURDATE(), CURTIME())",
                [alumno_id, guardia_id]
            );

            const nuevoToken = crypto.randomUUID();
            await db.query(
                "INSERT INTO tokens_vigilante (token, guardia_id, estado) VALUES (?, ?, 'activo')",
                [nuevoToken, guardia_id]
            );

            await db.query("COMMIT");
            res.json({ success: true, message: "Asistencia marcada con éxito y QR renovado" });
        } catch (error) {
            await db.query("ROLLBACK");
            res.status(500).json({ error: error.message });
        }
    },

    
    obtenerUltimoEscaneo: async (req, res) => {
        const { guardia_id } = req.params;
        try {
            const sql = `
                SELECT a.id as asistencia_id, a.hora_ingreso, d.nombres, d.apellidos, d.idsenati 
                FROM asistencia a
                JOIN datos_alumnos d ON a.alumno_id = d.id
                WHERE a.guardia_id = ?
                ORDER BY a.id DESC
                LIMIT 1
            `;
            const [rows] = await db.query(sql, [guardia_id]);
            
            if (rows.length > 0) {
                res.json(rows[0]);
            } else {
                res.json(null);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = qrController;