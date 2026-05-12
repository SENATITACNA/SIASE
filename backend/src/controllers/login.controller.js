const alumnosRepository = require("../repositories/alumnos.repository");
const vigilanteRepository = require("../repositories/vigilante.repository");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({ success: false, error: "Faltan credenciales" });
  }

  try {
    const alumnos = await alumnosRepository.obtenerAlumnoPorCredenciales(usuario, password);

    if (alumnos.length > 0) {
      const token = jwt.sign({ id: alumnos[0].ID_Alumno, role: "alumno", usuario }, process.env.JWT_SECRET || "secreto_super_seguro", { expiresIn: "1d" });
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000 // 1 día
      });
      return res.json({ success: true, redirectUrl: "/dashboard-alumno", role: "alumno", user: alumnos[0] });
    }

    const vigilantes = await vigilanteRepository.obtenerVigilantePorCredenciales(usuario, password);

    if (vigilantes.length > 0) {
      const token = jwt.sign({ id: vigilantes[0].ID_Vigilante, role: "vigilante", usuario }, process.env.JWT_SECRET || "secreto_super_seguro", { expiresIn: "1d" });
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000 // 1 día
      });
      return res.json({ success: true, redirectUrl: "/dashboard-vigilante", role: "vigilante", user: vigilantes[0] });
    }

    return res.status(401).json({ success: false, error: "Credenciales inválidas o usuario inactivo" });
  } catch (error) {
    console.error("Error de autenticación:", error);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  });
  return res.json({ success: true, message: "Sesión cerrada correctamente" });
};
