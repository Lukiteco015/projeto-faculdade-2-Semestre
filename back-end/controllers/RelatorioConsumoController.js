const jwt = require('jsonwebtoken');
const RelatorioConsumo = require('../models/RelatorioConsumo');
require('dotenv').config({ path: '.env'})

const pegarMotoristaIdDoToken = (token) => {
    const JWT_SECRET = process.env.SECRET_KEY;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded.id; // Retorna o ID do motorista
    } catch (error) {
        throw new Error('Token inválido');
    }
};

// Criar relatório de consumo
exports.criarRelatorioConsumo = async (req, res) => {
    try {
        // Pega o token da requisição
        const token = req.header('Authorization').replace('Bearer ', '');
        
        // Obtém o ID do motorista do token
        const motoristaId = pegarMotoristaIdDoToken(token);

        // Desestruturação dos dados do corpo da requisição
        const { data, quilometragem, consumoCombustivel } = req.body;

        // Cria o novo relatório
        const novoRelatorio = await RelatorioConsumo.create({
            motoristaId, data, quilometragem, consumoCombustivel
        });

        res.status(201).json({ mensagem: 'Relatório de consumo criado com sucesso!', novoRelatorio });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao criar relatório de consumo', error: error.message });
    }
};

// Obter todos os relatórios de consumo
exports.obterRelatoriosConsumo = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const motoristaId = pegarMotoristaIdDoToken(token);

        const relatorios = await RelatorioConsumo.find({ motoristaId }).populate('motoristaId').populate('veiculoId');
        res.status(200).json(relatorios);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao obter relatórios de consumo', error: error.message });
    }
};

// Atualizar relatório de consumo
exports.atualizarRelatorioConsumo = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, quilometragem, consumoCombustivel, veiculoId } = req.body;

        const token = req.header('Authorization').replace('Bearer ', '');
        const motoristaId = pegarMotoristaIdDoToken(token);

        const relatorio = await RelatorioConsumo.findOneAndUpdate(
            { _id: id, motoristaId }, // Verifica se o relatório pertence ao motorista
            { data, quilometragem, consumoCombustivel, veiculoId },
            { new: true }
        );

        if (!relatorio) {
            return res.status(404).json({ mensagem: 'Relatório não encontrado ou você não tem permissão para atualizá-lo!' });
        }

        res.json({ mensagem: 'Relatório de consumo atualizado com sucesso!', relatorio });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao atualizar relatório de consumo', error: error.message });
    }
};

// Excluir relatório de consumo
exports.excluirRelatorioConsumo = async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.header('Authorization').replace('Bearer ', '');
        const motoristaId = pegarMotoristaIdDoToken(token);

        const relatorio = await RelatorioConsumo.findOneAndDelete({ _id: id, motoristaId }); // Verifica se o relatório pertence ao motorista

        if (!relatorio) {
            return res.status(404).json({ mensagem: 'Relatório não encontrado ou você não tem permissão para excluí-lo!' });
        }

        res.json({ mensagem: 'Relatório de consumo excluído com sucesso!' });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao excluir relatório de consumo', error: error.message });
    }
};
