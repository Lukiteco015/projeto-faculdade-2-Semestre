const bcrypt = require('bcryptjs');
const Motorista = require('../models/Motorista');


exports.loginMotorista = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const motorista = await Motorista.findOne({ email });

    if (!motorista) {
      return res.status(400).json({ mensagem: 'Email ou senha inválidos' });
    }

    const senhaCorreta = await bcrypt.compare(senha, motorista.senha);
    
    if (!senhaCorreta) {
      return res.status(400).json({ mensagem: 'Email ou senha inválidos' });
    }

    res.status(200).json({
      mensagem: 'Login bem-sucedido!',
      motorista: motorista
    });

  } catch (err) {
    console.error('Erro ao fazer login:', err);
    res.status(500).json({ mensagem: 'Erro ao fazer login', erro: err.message });
  }
};
