const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const conectarBanco = require('../config/databaseconfig');

const corridaRoute = require('../routes/corridaRoute');
const motoristaRoute = require('../routes/motoristaRoute');
const clienteRoute = require('../routes/clienteRoute');
const agendamentoRoute = require('../routes/agendamentoRoute');
const relatorioConsumoRoute = require('../routes/relatorioConsumoRoute');

const app = express();

app.use(cors());
app.use(bodyParser.json());

conectarBanco();

app.use('/api/corridas', corridaRoute);
app.use('/api/motorista', motoristaRoute);
app.use('/api/cliente', clienteRoute);
app.use('/api/relatorios/consumo', relatorioConsumoRoute);
app.use('/api/agendamentos',agendamentoRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
