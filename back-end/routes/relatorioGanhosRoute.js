const express = require('express'); // Importa o módulo express
const router = express.Router(); // Cria uma nova instância do roteador
const relatorioGanhosController = require('../controllers/RelatorioGanhosController'); // Importa o controlador de relatórios de ganhos

// Rota para criar um novo relatório de ganhos
router.post('/criar', relatorioGanhosController.criarRelatorioGanhos);

// Rota para obter todos os relatórios de ganhos
router.get('/', relatorioGanhosController.obterRelatoriosGanhos);

// Rota para obter um relatório de ganhos específico por ID
router.get('/:id', relatorioGanhosController.obterRelatorioGanhosPorId);

// Rota para atualizar um relatório de ganhos existente
router.put('/:id', relatorioGanhosController.atualizarRelatorioGanhos);

// Rota para excluir um relatório de ganhos existente
router.delete('/:id', relatorioGanhosController.excluirRelatorioGanhos);

module.exports = router; // Exporta o roteador para ser utilizado em outros arquivos
