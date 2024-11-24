const express = require('express');
const HistoricoDeCorridaController = require('../controllers/HistoricoDeCorridaController');
const router = express.Router();

// Rota para criar um novo historico
router.post('/criar', HistoricoDeCorridaController.criarHistorico);
// Rota para obter todos os historicos
router.get('/', HistoricoDeCorridaController.obterTodosHistoricos);
// Rota para obter um historico específico por ID
router.get('/:id', HistoricoDeCorridaController.obterHistoricoPorId);
// Rota para atualizar um historico existente
router.put('/:id', HistoricoDeCorridaController.atualizarHistorico);
// Rota para excluir um historico existente
router.delete('/:id', HistoricoDeCorridaController.excluirHistorico);

module.exports = router;