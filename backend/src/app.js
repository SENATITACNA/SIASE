const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const vigilanteRoutes = require('./routes/vigilante.routes');
const registroRoutes = require('./routes/registro_dispositivo.routes');
const datosAlumnosRoutes = require('./routes/datos_alumnos.routes');
const asistenciaRoutes = require('./routes/asistencia.routes')
const errorMiddleware = require('./middlewares/error.middleware');

app.use('/api/vigilante', vigilanteRoutes);
app.use('/api/registro_dispositivos', registroRoutes);
app.use('/api/datos_alumnos', datosAlumnosRoutes);
app.use('/api/asistencia', asistenciaRoutes);

app.use(errorMiddleware);

module.exports = app;
