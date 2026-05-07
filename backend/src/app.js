const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* Routes*/
const vigilanteRoutes = require("./routes/vigilante.routes");
const registroRoutes = require("./routes/registro_dispositivo.routes");
const datosAlumnosRoutes = require("./routes/datos_alumnos.routes");
const alumnosRoutes = require("./routes/alumnos.routes");
const instructorRoutes = require("./routes/instructor.routes");

/* Route Middlewares*/
app.use("/api/vigilante", vigilanteRoutes);
app.use("/api/registro_dispositivos", registroRoutes);
app.use("/api/datos_alumnos", datosAlumnosRoutes);
app.use("/api/alumnos", alumnosRoutes);
app.use("/api/instructores", instructorRoutes);

/* Login route (Basic temporary login) */
app.post("/login", (req, res) => {
  const { usuario, password } = req.body;
  
  if (usuario && password) {
    // Aquí después conectarás con la base de datos
    res.json({ success: true, redirectUrl: "/dashboard" }); // Cambia "/dashboard" a donde quieras redirigir
  } else {
    res.status(400).json({ success: false, error: "Credenciales inválidas" });
  }
});

/* Error Middleware*/
const errorMiddleware = require("./middlewares/error.middleware");

app.use(errorMiddleware);

module.exports = app;