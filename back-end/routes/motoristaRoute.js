const express = require('express');
const motoristaController = require('../controllers/motoristaController');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.post('/cadastrar', motoristaController.criarMotorista);
router.post('/login', loginController.loginMotorista);

module.exports = router;
