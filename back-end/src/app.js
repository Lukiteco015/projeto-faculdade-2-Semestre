const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

const conectarBanco = require('../config/databaseconfig');

const corridaRoute = require('../routes/corridaRoute');
const motoristaRoute = require('../routes/motoristaRoute');

const app = express();

app.use(cors());
app.use(bodyParser.json());

conectarBanco();

app.use('/api/corridas', corridaRoute);
app.use('/api/motorista', motoristaRoute);

// Definindo a porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
