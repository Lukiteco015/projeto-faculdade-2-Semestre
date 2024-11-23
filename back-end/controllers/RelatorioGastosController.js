const RelatorioGastos = require('../models/RelatorioGastos');

// Criar relatório de gastos
exports.criarRelatorioGastos = async (req, res) => {
    try {
        const { motoristaId, data, tipoDespesa, valorDespesa } = req.body;
        const novoRelatorio = await RelatorioGastos.create({
            motoristaId, data, tipoDespesa, valorDespesa
        });
        res.status(201).json({ mensagem: 'Relatório de gastos criado com sucesso!', novoRelatorio });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao criar relatório de gastos', error });
    }
};

// Obter todos os relatórios de gastos
exports.obterRelatoriosGastos = async (req, res) => {
    try {
        const relatorios = await RelatorioGastos.find().populate('motoristaId');
        res.status(200).json(relatorios);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao obter relatórios de gastos', error });
    }
};

// Obter um relatório de gastos específico por ID
exports.obterRelatorioGastosPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const relatorio = await RelatorioGastos.findById(id).populate('motoristaId');
        if (!relatorio) {
            return res.status(404).json({ mensagem: 'Relatório não encontrado!' });
        }
        res.status(200).json(relatorio);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao obter relatório de gastos', error });
    }
};

// Atualizar relatório de gastos
exports.atualizarRelatorioGastos = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, tipoDespesa, valorDespesa } = req.body;
        const relatorio = await RelatorioGastos.findByIdAndUpdate(id, {
            data, tipoDespesa, valorDespesa
        }, { new: true });
        if (!relatorio) {
            return res.status(404).json({ mensagem: 'Relatório não encontrado!' });
        }
        res.json({ mensagem: 'Relatório de gastos atualizado com sucesso!', relatorio });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao atualizar relatório de gastos', error });
    }
};

// Excluir relatório de gastos
exports.excluirRelatorioGastos = async (req, res) => {
    try {
        const { id } = req.params;
        const relatorio = await RelatorioGastos.findByIdAndDelete(id);
        if (!relatorio) {
            return res.status(404).json({ mensagem: 'Relatório não encontrado!' });
        }
        res.json({ mensagem: 'Relatório de gastos excluído com sucesso!' });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao excluir relatório de gastos', error });
    }
};
