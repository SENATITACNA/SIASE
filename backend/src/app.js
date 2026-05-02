const express = require('express');
const app = express();

app.use(express.json());

const usuarioRoutes = require('./routes/usuario.routes');

app.use('/api/usuario', usuarioRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto 3000");
});