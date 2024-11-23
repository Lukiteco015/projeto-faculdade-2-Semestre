const RelatorioConsumo = require('../models/RelatorioConsumo');

// Criar relatório de consumo
exports.criarRelatorioConsumo = async (req, res) => {
    try {
        const { motoristaId, data, quilometragem, consumoCombustivel, veiculoId } = req.body;
        const novoRelatorio = await RelatorioConsumo.create({
            motoristaId, data, quilometragem, consumoCombustivel, veiculoId
        });
        res.status(201).json({ mensagem: 'Relatório de consumo criado com sucesso!', novoRelatorio });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao criar relatório de consumo', error });
    }
};

// Obter todos os relatórios de consumo
exports.obterRelatoriosConsumo = async (req, res) => {
    try {
        const relatorios = await RelatorioConsumo.find().populate('motoristaId').populate('veiculoId');
        res.status(200).json(relatorios);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao obter relatórios de consumo', error });
    }
};

// Atualizar relatório de consumo
exports.atualizarRelatorioConsumo = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, quilometragem, consumoCombustivel, veiculoId } = req.body;
        const relatorio = await RelatorioConsumo.findByIdAndUpdate(id, {
            data, quilometragem, consumoCombustivel, veiculoId
        }, { new: true });
        if (!relatorio) {
            return res.status(404).json({ mensagem: 'Relatório não encontrado!' });
        }
        res.json({ mensagem: 'Relatório de consumo atualizado com sucesso!', relatorio });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao atualizar relatório de consumo', error });
    }
};

// Excluir relatório de consumo
exports.excluirRelatorioConsumo = async (req, res) => {
    try {
        const { id } = req.params;
        const relatorio = await RelatorioConsumo.findByIdAndDelete(id);
        if (!relatorio) {
            return res.status(404).json({ mensagem: 'Relatório não encontrado!' });
        }
        res.json({ mensagem: 'Relatório de consumo excluído com sucesso!' });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao excluir relatório de consumo', error });
    }
};
