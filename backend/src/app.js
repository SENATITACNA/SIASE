const express = require('express');
const app = express();

app.use(express.json());

const guardiaRoutes = require('./routes/guardia.routes');
app.use('/api/guardia', guardiaRoutes);

module.exports = app;