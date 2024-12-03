const express = require('express')
const router = express.Router()
const agendamentoController = require('../controllers/agendamentoController')

// Rota para criar um novo agendamento
router.post('/', agendamentoController.criarAgendamento)

// Rota para atualizar um agendamento existente
router.put('/:id', agendamentoController.atualizarAgendamento)

// Rota para cancelar um agendamento existente
router.delete('/:id', agendamentoController.cancelarAgendamento)

// Rota para adicionar dias a um agendamento existente
router.put('/:id/dias/adicionar', agendamentoController.adicionarDias)

// Rota para remover dias de um agendamento existente
router.put('/:id/dias/remover', agendamentoController.removerDias)

module.exports = router;
