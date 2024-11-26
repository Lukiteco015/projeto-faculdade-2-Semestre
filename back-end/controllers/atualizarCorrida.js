const Corrida = require('../models/Corrida');

// Função para atualizar o status da corrida
const atualizarStatus = async (req, res) => {
  const { id } = req.params; // O ID da corrida vem da URL
  const { status } = req.body; // O novo status vem do corpo da requisição

  const statusPermitidos = ['Pendente', 'Concluida', 'Cancelada', 'Em Andamento'];
  if (!statusPermitidos.includes(status)) {
    return res.status(400).json({ message: 'Status inválido. Valores permitidos: Pendente, Concluida, Cancelada, Em Andamento.' });
  }

  try {
    const corrida = await Corrida.findById(id);
    if (!corrida) {
      return res.status(404).json({ message: 'Corrida não encontrada.' });
    }

    // Atualiza o status da corrida
    corrida.status = status;
    await corrida.save();

    return res.status(200).json({ message: 'Status da corrida atualizado com sucesso.', corrida });
  } catch (error) {
    console.error('Erro ao atualizar o status da corrida:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

module.exports = { atualizarStatus };
