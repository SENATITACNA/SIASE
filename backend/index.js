const express = require('express');
const cors = require('cors');
const seguridadRouter = require('./Seguridad/Seguridad'); 

const app = express();
const PORT = 8080;

app.use(cors()); 
app.use(express.json());

app.use('/', seguridadRouter);

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});