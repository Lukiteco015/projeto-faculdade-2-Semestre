const express = require('express');
const clienteController = require('../controllers/clienteController');

const router = express.Router();
router.post('/cadastrar', clienteController.criarCliente);

module.exports = router;