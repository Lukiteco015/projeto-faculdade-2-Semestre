// routes/corridas.js
const express = require('express');
const router = express.Router();
const corridaController = require('../controllers/corridaController');
const buscarCorrida = require('../controllers/buscarCorrida');
const atualizarCorrida = require('../controllers/atualizarCorrida'); // Corrigido: importa o controlador correto

router.post('/cadastrar', corridaController.criarCorrida);
router.get('/buscar', buscarCorrida.getCorridasDoMotorista);

// A rota PUT para atualizar o status da corrida
router.put('/atualizar/:id', atualizarCorrida.atualizarStatus); // Corrigido: adicionar :id na URL para capturar o ID da corrida

module.exports = router;

