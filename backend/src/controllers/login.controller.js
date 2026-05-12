const alumnosRepository = require("../repositories/alumnos.repository");
const vigilanteRepository = require("../repositories/vigilante.repository");
const jwt = require("jsonwebtoken");
const { loginService } = require("../services/login.service");

exports.login = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const alumnos = await alumnosRepository.obtenerAlumnoPorCredenciales(usuario, password);

    if (alumnos.length > 0) {
      const token = jwt.sign({ id: alumnos[0].id, role: "alumno", usuario }, process.env.JWT_SECRET || "secreto_super_seguro", { expiresIn: "1d" });
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
      const token = jwt.sign({ id: vigilantes[0].id, role: "vigilante", usuario }, process.env.JWT_SECRET || "secreto_super_seguro", { expiresIn: "1d" });
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000 // 1 día
      });
      return res.json({ success: true, redirectUrl: "/dashboard-vigilante", role: "vigilante", user: vigilantes[0] });
    }

    return res.status(401).json({ success: false, error: "Credenciales inválidas o usuario inactivo" });
    const result = await loginService(usuario, password);
    return res.json(result);
  } catch (error) {
    if (error.message === "Faltan credenciales") {
      return res.status(400).json({ success: false, error: error.message });
    }
    if (error.message === "Credenciales inválidas o usuario inactivo") {
      return res.status(401).json({ success: false, error: error.message });
    }
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
