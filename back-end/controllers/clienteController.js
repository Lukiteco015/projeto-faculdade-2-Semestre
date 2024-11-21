const Cliente = require('../models/Cliente');

exports.criarCliente = async (req, res) => {
    try {
        const { nome, cpf, telefone, foto, preferenciasViagem } = req.body;

        if (!nome || !cpf || !telefone || !foto)
            return res.status(400).json({ mensagem: 'Dados insuficientes para cadastrar cliente.' });

        const clienteExistente = await Cliente.findOne({ cpf });
        if (clienteExistente) {
            return res.status(400).json({ mensagem: 'Cliente já existente com este CPF.' });
        }

        const clienteCriado = new Cliente({ nome, cpf, telefone, foto, preferenciasViagem });
        await clienteCriado.save();

        res.status(201).json({ mensagem: 'Cliente criado com sucesso!', cliente: clienteCriado });
    } catch (err) {
        res.status(500).json({ mensagem: 'Erro ao criar cliente.', erro: err.message });
    }
};
