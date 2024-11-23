const Agendamento = require('../models/Agendamento');

// Criar agendamento
exports.criarAgendamento = async (req, res) => {
    try {
        const { motoristaId, clienteId, dias, horario, localOrigem, localDestino } = req.body;
        const novoAgendamento = await Agendamento.create({
            motoristaId, clienteId, dias, horario, localOrigem, localDestino
        });
        res.status(201).json({ mensagem: 'Agendamento criado com sucesso!', novoAgendamento });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao criar agendamento', error });
    }
};

// Adicionar dias a um agendamento existente
exports.adicionarDias = async (req, res) => {
    try {
        const { id } = req.params;
        const { dias } = req.body;
        const agendamento = await Agendamento.findById(id);
        if (!agendamento) {
            return res.status(404).json({ mensagem: 'Agendamento não encontrado!' });
        }
        agendamento.dias = [...new Set([...agendamento.dias, ...dias])]; // Adicionar novos dias sem duplicados
        await agendamento.save();
        res.json({ mensagem: 'Dias adicionados com sucesso!', agendamento });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao adicionar dias', error });
    }
};

// Remover dias de um agendamento existente
exports.removerDias = async (req, res) => {
    try {
        const { id } = req.params;
        const { dias } = req.body;
        const agendamento = await Agendamento.findById(id);
        if (!agendamento) {
            return res.status(404).json({ mensagem: 'Agendamento não encontrado!' });
        }
        agendamento.dias = agendamento.dias.filter(dia => !dias.includes(dia)); // Remover dias específicos
        await agendamento.save();
        res.json({ mensagem: 'Dias removidos com sucesso!', agendamento });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao remover dias', error });
    }
};

// Atualizar agendamento
exports.atualizarAgendamento = async (req, res) => {
    try {
        const { id } = req.params;
        const { horario, localOrigem, localDestino } = req.body;
        const agendamento = await Agendamento.findById(id);
        if (!agendamento) {
            return res.status(404).json({ mensagem: 'Agendamento não encontrado!' });
        }
        agendamento.horario = horario;
        agendamento.localOrigem = localOrigem;
        agendamento.localDestino = localDestino;
        await agendamento.save();
        res.json({ mensagem: 'Agendamento atualizado com sucesso!', agendamento });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao atualizar agendamento', error });
    }
};

// Cancelar agendamento
exports.cancelarAgendamento = async (req, res) => {
    try {
        const { id } = req.params;
        const agendamento = await Agendamento.findById(id);
        if (!agendamento) {
            return res.status(404).json({ mensagem: 'Agendamento não encontrado!' });
        }
        await agendamento.remove();
        res.json({ mensagem: 'Agendamento cancelado com sucesso!' });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao cancelar agendamento', error });
    }
};
// concluido
