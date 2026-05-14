const { loginService } = require("../services/login.service");

exports.login = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const result = await loginService(usuario, password);
    
    const user = result.vigilante || result.user || result.alumno;

    res.cookie('user_session', JSON.stringify({
      id: user.guardia_id || user.idsenati || user.id, 
      nombre: `${user.nombre || user.nombres} ${user.apellido || user.apellidos}`,
      rol: result.role
    }), {
      httpOnly: false,   
      secure: false, 
      maxAge: 2592000000, // 30 día
      sameSite: 'lax'
    });

    return res.json({ success: true, ...result });

  } catch (error) {
    console.error("Error de autenticación:", error);
    return res.status(401).json({ success: false, error: error.message });
  }
};