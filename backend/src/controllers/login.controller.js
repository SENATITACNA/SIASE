const jwt = require("jsonwebtoken");
const { loginService } = require("../services/login.service");

exports.login = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const result = await loginService(usuario, password);

    const token = jwt.sign(
      { id: result.user.id, role: result.role, usuario },
      process.env.JWT_SECRET || "secreto_super_seguro",
      { expiresIn: "1d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000 // 1 día
    });

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
