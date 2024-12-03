const express = require('express')
const router = express.Router()
const relatorioConsumoController = require('../controllers/RelatorioConsumoController')

// Rota para criar um novo relatório de consumo
router.post('/criar', relatorioConsumoController.criarRelatorioConsumo)

// Rota para obter todos os relatórios de consumo
router.get('/', relatorioConsumoController.obterRelatoriosConsumo)

// Rota para obter um relatório de consumo específico por ID
//router.get('/:id', relatorioConsumoController.obterRelatoriosConsumo)

// Rota para atualizar um relatório de consumo existente
router.put('/:id', relatorioConsumoController.atualizarRelatorioConsumo)

// Rota para excluir um relatório de consumo existente
router.delete('/:id', relatorioConsumoController.excluirRelatorioConsumo)

module.exports = router
