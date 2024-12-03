const Motorista = require('../models/Motorista');

exports.criarMotorista = async (req, res) => {
  try {
    const { nome, cpf, senha, email } = req.body;

    if (!nome || !cpf || !senha || !email) {
      return res
        .status(400)
        .json({ mensagem: 'Dados insuficientes para cadastrar motorista.' });
    }

    const motoristaCriado = new Motorista({ nome, cpf, senha, email });
    await motoristaCriado.save();

    res.status(201).json({
      mensagem: 'Motorista criado com sucesso!',
      motorista: motoristaCriado,
    });
  } catch (err) {
    res
      .status(500)
      .json({ mensagem: 'Erro ao criar motorista.', erro: err.message });
  }
};

