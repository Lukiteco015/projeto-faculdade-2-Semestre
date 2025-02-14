const jwt = require('jsonwebtoken');
const RelatorioConsumo = require('../models/RelatorioConsumo');
const Corrida = require('../models/Corrida');
require('dotenv').config({ path: '.env'})

const pegarMotoristaIdDoToken = (token) => {
    const JWT_SECRET = process.env.SECRET_KEY;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded.id;

    } catch (error) {
        throw new Error('Token inválido');
    }
};

exports.criarRelatorioConsumo = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');

        const motoristaId = pegarMotoristaIdDoToken(token);

        const { data, consumoCombustivel } = req.body;

        const dataInicio = new Date(data);
        dataInicio.setUTCHours(0, 0, 0, 0);
        const dataFim = new Date(data);
        dataFim.setUTCHours(23, 59, 59, 999);

        const corridas = await Corrida.find({
            datahora: {
                $gte: dataInicio,
                $lte: dataFim
            }
        });

        if (corridas.length === 0) {
            return res.status(404).json({ mensagem: 'Nenhuma corrida encontrada para a data especificada' });
        }

        const quilometragem = corridas.reduce((total, corrida) => total + corrida.distancia, 0);

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
