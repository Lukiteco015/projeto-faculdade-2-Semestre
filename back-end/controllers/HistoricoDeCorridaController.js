const HistoricoDeCorrida = require('../models/HistoricoDeCorrida');

// Criar histórico de corrida
exports.criarHistorico = async (req, res) => {
    try {
        const { motoristaId, clienteId, corridaId } = req.body;

        // Criar o histórico
        const novoHistorico = await HistoricoDeCorrida.create({
            motoristaId,
            clienteId,
            corridaId,
        });

        res.status(201).json({
            mensagem: 'Histórico de corrida criado com sucesso!',
            historico: novoHistorico,
        });
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao criar histórico de corrida.', error });
    }
};

// Obter todos os históricos de corridas
exports.obterTodosHistoricos = async (req, res) => {
    try {
        // Buscar todos os históricos com os dados populados
        const historicos = await HistoricoDeCorrida.find()
            .populate('motoristaId', 'nome') // Apenas o campo 'nome' do motorista
            .populate('clienteId', 'nome') // Apenas o campo 'nome' do cliente
            .populate('corridaId'); // Todos os campos da corrida

        res.status(200).json(historicos);
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao obter os históricos de corridas.', error });
    }
};

// Obter histórico por ID
exports.obterHistoricoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ mensagem: 'ID inválido.' });
        }

        // Buscar histórico pelo ID
        const historico = await HistoricoDeCorrida.findById(id)
            .populate('motoristaId', 'nome')
            .populate('clienteId', 'nome')
            .populate('corridaId');

        if (!historico) {
            return res.status(404).json({ mensagem: 'Histórico não encontrado.' });
        }

        res.status(200).json(historico);
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao obter histórico de corrida.', error });
    }
};

// Atualizar histórico de corrida
exports.atualizarHistorico = async (req, res) => {
    try {
        const { id } = req.params;
        const { motoristaId, clienteId, corridaId } = req.body;

        // Atualizar histórico pelo ID
        const historicoAtualizado = await HistoricoDeCorrida.findByIdAndUpdate(
            id,
            { motoristaId, clienteId, corridaId },
            { new: true } // Retorna o documento atualizado
        );

        if (!historicoAtualizado) {
            return res.status(404).json({ mensagem: 'Histórico não encontrado.' });
        }

        res.status(200).json({
            mensagem: 'Histórico de corrida atualizado com sucesso!',
            historico: historicoAtualizado,
        });
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao atualizar histórico de corrida.', error });
    }
};

// Excluir histórico de corrida
exports.excluirHistorico = async (req, res) => {
    try {
        const { id } = req.params;

        // Excluir histórico pelo ID
        const historicoExcluido = await HistoricoDeCorrida.findByIdAndDelete(id);

        if (!historicoExcluido) {
            return res.status(404).json({ mensagem: 'Histórico não encontrado.' });
        }

        res.status(200).json({ mensagem: 'Histórico de corrida excluído com sucesso!' });
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao excluir histórico de corrida.', error });
    }
};
