const express = require('express');
const router = express.Router();
const corridaController = require('../controllers/corridaController');

router.post('/', corridaController.criarCorrida);

module.exports = router;
