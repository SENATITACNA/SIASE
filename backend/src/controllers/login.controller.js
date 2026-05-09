const alumnosRepository = require("../repositories/alumnos.repository");
const vigilanteRepository = require("../repositories/vigilante.repository");

exports.login = async (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({ success: false, error: "Faltan credenciales" });
  }

  try {
    const alumnos = await alumnosRepository.obtenerAlumnoPorCredenciales(usuario, password);

    if (alumnos.length > 0) {
      return res.json({ success: true, redirectUrl: "/dashboard-alumno", role: "alumno", user: alumnos[0] });
    }

    const vigilantes = await vigilanteRepository.obtenerVigilantePorCredenciales(usuario, password);

    if (vigilantes.length > 0) {
      return res.json({ success: true, redirectUrl: "/dashboard-vigilante", role: "vigilante", user: vigilantes[0] });
    }

    return res.status(401).json({ success: false, error: "Credenciales inválidas o usuario inactivo" });
  } catch (error) {
    console.error("Error de autenticación:", error);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};
