import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger.json'

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const conectarBanco = require('../config/databaseconfig');
const corridaRoute = require('../routes/corridaRoute');
const motoristaRoute = require('../routes/motoristaRoute');
const clienteRoute = require('../routes/clienteRoute');
const agendamentoRoute = require('../routes/agendamentoRoute');
const relatorioConsumoRoute = require('../routes/relatorioConsumoRoute');
const relatorioGanhosRoute = require('../routes/relatorioGanhosRoute');
const relatorioGastosRoute = require('../routes/relatorioGastosRoutes');
const HistoricoDeCorridaRoute = require('../routes/HistoricoDeCorridaRoute');


const app = express();

app.use(cors());
app.use(bodyParser.json());

conectarBanco();

app.use('/api/corridas', corridaRoute);
app.use('/api/motorista', motoristaRoute);
app.use('/api/cliente', clienteRoute);
app.use('/api/relatorios/consumo', relatorioConsumoRoute);
app.use('/api/agendamentos',agendamentoRoute);
app.use('/api/relatorios/ganhos', relatorioGanhosRoute);
app.use('/api/relatorios/gastos', relatorioGastosRoute);
app.use('/api/historico', HistoricoDeCorridaRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile)) // Configura o Swagger UI

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log('Documentação disponível em http://localhost:5000/api-docs');
});
