const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const vigilanteRoutes = require("./routes/vigilante.routes");
const registroRoutes = require("./routes/registro_dispositivo.routes");
const alumnosRoutes = require("./routes/alumnos.routes");
const instructorRoutes = require("./routes/instructor.routes");

app.use("/api/vigilante", vigilanteRoutes);
app.use("/api/registro_dispositivos", registroRoutes);
app.use("/api/alumnos", alumnosRoutes);
app.use("/api/instructores", instructorRoutes);

const pool = require("./config/db");

app.post("/login", async (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({ success: false, error: "Faltan credenciales" });
  }

  try {
    const promisePool = pool.promise();

    const [alumnos] = await promisePool.query(
      "SELECT * FROM datos_alumnos WHERE idsenati = ? AND password_alumno = ? AND estado = 1",
      [usuario, password]
    );

    if (alumnos.length > 0) {
      return res.json({ success: true, redirectUrl: "/dashboard-alumno", role: "alumno", user: alumnos[0] });
    }

    const [vigilantes] = await promisePool.query(
      "SELECT * FROM vigilante WHERE guardia_id = ? AND password_vigilante = ? AND estado = 1",
      [usuario, password]
    );

    if (vigilantes.length > 0) {
      return res.json({ success: true, redirectUrl: "/dashboard-vigilante", role: "vigilante", user: vigilantes[0] });
    }

    return res.status(401).json({ success: false, error: "Credenciales inválidas o usuario inactivo" });
  } catch (error) {
    console.error("Error de autenticación:", error);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
});
const asistenciaRoutes = require("./routes/asistencia.routes");
app.use("/api/asistencias", asistenciaRoutes);

const errorMiddleware = require("./middlewares/error.middleware");

app.use(errorMiddleware);

module.exports = app;
