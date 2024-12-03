const RelatorioGanhos = require('../models/RelatorioGanhos');

// Criar relatório de ganhos
exports.criarRelatorioGanhos = async (req, res) => {
    try {
        const { motoristaId, data, valorGanho, despesasId } = req.body;
        const novoRelatorio = await RelatorioGanhos.create({
            motoristaId, data, valorGanho, despesasId
        });
        res.status(201).json({ mensagem: 'Relatório de ganhos criado com sucesso!', novoRelatorio });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao criar relatório de ganhos', error });
    }
};

// Obter todos os relatórios de ganhos
exports.obterRelatoriosGanhos = async (req, res) => {
    try {
        const relatorios = await RelatorioGanhos.find().populate('motoristaId').populate('despesasId');
        res.status(200).json(relatorios);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao obter relatórios de ganhos', error });
    }
};

// Obter um relatório de ganhos específico por ID
exports.obterRelatorioGanhosPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const relatorio = await RelatorioGanhos.findById(id).populate('motoristaId').populate('despesasId');
        if (!relatorio) {
            return res.status(404).json({ mensagem: 'Relatório não encontrado!' });
        }
        res.status(200).json(relatorio);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao obter relatório de ganhos', error });
    }
};

// Atualizar relatório de ganhos
exports.atualizarRelatorioGanhos = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, valorGanho, despesasId } = req.body;
        const relatorio = await RelatorioGanhos.findByIdAndUpdate(id, {
            data, valorGanho, despesasId
        }, { new: true });
        if (!relatorio) {
            return res.status(404).json({ mensagem: 'Relatório não encontrado!' });
        }
        res.json({ mensagem: 'Relatório de ganhos atualizado com sucesso!', relatorio });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao atualizar relatório de ganhos', error });
    }
};

// Excluir relatório de ganhos
exports.excluirRelatorioGanhos = async (req, res) => {
    try {
        const { id } = req.params;
        const relatorio = await RelatorioGanhos.findByIdAndDelete(id);
        if (!relatorio) {
            return res.status(404).json({ mensagem: 'Relatório não encontrado!' });
        }
        res.json({ mensagem: 'Relatório de ganhos excluído com sucesso!' });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao excluir relatório de ganhos', error });
    }
};
