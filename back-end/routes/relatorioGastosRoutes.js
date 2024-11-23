const express = require('express');
const router = express.Router();
const relatorioGastosController = require('../controllers/RelatorioGastosController');

// Rota para criar um novo relatório de gastos
router.post('/criar', relatorioGastosController.criarRelatorioGastos);

// Rota para obter todos os relatórios de gastos
router.get('/', relatorioGastosController.obterRelatoriosGastos);

// Rota para obter um relatório de gastos específico por ID
router.get('/:id', relatorioGastosController.obterRelatorioGastosPorId);

// Rota para atualizar um relatório de gastos existente
router.put('/:id', relatorioGastosController.atualizarRelatorioGastos);

// Rota para excluir um relatório de gastos existente
router.delete('/:id', relatorioGastosController.excluirRelatorioGastos);

module.exports = router;
