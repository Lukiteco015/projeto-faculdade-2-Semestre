const express = require('express');
const router = express.Router();
const corridaController = require('../controllers/corridaController');

router.post('/corrida', corridaController.criarCorrida);

module.exports = router;
