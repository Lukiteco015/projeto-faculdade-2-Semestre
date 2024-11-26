const express = require('express');
const clienteController = require('../controllers/clienteController');
const buscarCliente = require('../controllers/buscarCliente')

const router = express.Router();
router.post('/cadastrar', clienteController.criarCliente);
router.get('/clientes', buscarCliente.getClientesDoMotorista)

module.exports = router;