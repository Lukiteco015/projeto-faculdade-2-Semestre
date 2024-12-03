const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Motorista = require('../models/Motorista');
require('dotenv').config({ path: '.env'})
const JWT_SECRET = process.env.SECRET_KEY;

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

    const payload = {
      id: motorista._id,
      email: motorista.email
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '10h' });

    res.status(200).json({
      mensagem: 'Login bem-sucedido!',
      motorista: motorista,
      token: token
    })

  } catch (err) {
    console.error('Erro ao fazer login:', err);
    res.status(500).json({ mensagem: 'Erro ao fazer login', erro: err.message });
  }
};