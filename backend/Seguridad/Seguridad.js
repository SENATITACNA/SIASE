const express = require('express');
const router = express.Router();
const pool = require('../Conexion/Conexion');

router.post('/login', async (req, res) => {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
        return res.status(400).json({ error: 'El usuario y la contraseña son requeridos.' });
    }

    try {
        const [alumnos] = await pool.query(
            'SELECT id, nombres, apellidos, idsenati FROM datos_alumnos WHERE idsenati = ? AND contra = ? AND estado = 1',
            [usuario, password]
        );

        if (alumnos.length > 0) {
            const alumno = alumnos[0];
            return res.json({
                success: true,
                rol: 'estudiante',
                redirectUrl: '/panel-estudiante',
                usuario: alumno
            });
        }

        const [vigilantes] = await pool.query(
            'SELECT id, nombre, apellido, guardia_id, turno FROM vigilante WHERE guardia_id = ? AND contra = ? AND estado = 1',
            [usuario, password]
        );

        if (vigilantes.length > 0) {
            const vigilante = vigilantes[0];
            return res.json({
                success: true,
                rol: 'vigilante',
                redirectUrl: '/panel-vigilante', 
                usuario: vigilante
            });
        }

        return res.status(401).json({ error: 'Credenciales incorrectas o usuario inactivo.' });

    } catch (error) {
        console.error('Error durante el proceso de login:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

module.exports = router;