const express = require('express');
const motoristaController = require('../controllers/motoristaController');

const router = express.Router();

router.post('/cadastrar', motoristaController.criarMotoristaEVeiculo);
router.post('/login', motoristaController.loginMotorista);

module.exports = router;
