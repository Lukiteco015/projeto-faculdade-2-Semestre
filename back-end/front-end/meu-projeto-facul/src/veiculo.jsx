import React, { useState } from 'react';
import axios from 'axios';
import './veiculo.css'; // Arquivo de estilos

function CadastroVeiculo() {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [placa, setPlaca] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validação simples do formulário
    if (!marca || !modelo || !ano || !placa) {
      setMessage('Por favor, preencha todos os campos.');
      setMessageType('error');
      return;
    }

    setLoading(true);

    try {
      // Pegando o token do localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Token não encontrado. Faça login novamente.');
        setMessageType('error');
        setLoading(false);
        return;
      }

      // Realizando a requisição para cadastrar o veículo
      const response = await axios.post(
        'http://localhost:5000/api/veiculo/cadastrar',
        { marca, modelo, ano, placa },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Incluindo o token no cabeçalho
          },
        }
      );

      // Sucesso no cadastro
      if (response.status === 201) {
        setMessage('Veículo cadastrado com sucesso!');
        setMessageType('success');
        // Limpar o formulário
        setMarca('');
        setModelo('');
        setAno('');
        setPlaca('');
      }
    } catch (error) {
      console.error('Erro ao cadastrar veículo:', error);
      setMessage('Erro ao cadastrar o veículo. Tente novamente.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-veiculo-container">
      <h1>Cadastro de Veículo</h1>
      
      {/* Feedback de carregamento */}
      {loading && <p className="loading">Carregando...</p>}

      {/* Mensagem de sucesso ou erro */}
      {message && <p className={`message ${messageType}`}>{message}</p>}

      <form onSubmit={handleSubmit} className="cadastro-veiculo-form">
        <div className="form-group">
          <label>Marca:</label>
          <input
            type="text"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            placeholder="Ex: Toyota"
            required
          />
        </div>

        <div className="form-group">
          <label>Modelo:</label>
          <input
            type="text"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            placeholder="Ex: Corolla"
            required
          />
        </div>

        <div className="form-group">
          <label>Ano:</label>
          <input
            type="number"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            placeholder="Ex: 2021"
            required
          />
        </div>

        <div className="form-group">
          <label>Placa:</label>
          <input
            type="text"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            placeholder="Ex: ABC1234"
            required
          />
        </div>

        <button type="submit" className="btn-submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroVeiculo;
