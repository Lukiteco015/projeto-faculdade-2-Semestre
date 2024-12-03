const express = require('express');
const router = express.Router();
const veiculoController = require('../controllers/controllerVeiculo');

router.post('/cadastrar', veiculoController.cadastrarVeiculo);

module.exports = router;
