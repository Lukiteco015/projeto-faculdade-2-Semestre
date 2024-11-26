import React, { useState } from 'react';
import axios from 'axios';
import './cliente.css';

const Cliente = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Recupera o token do localStorage

    if (!token) {
      setErro('Token de autenticação ausente!');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/cliente/cadastrar',
        {
          nome,
          cpf,
          telefone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMensagem(response.data.mensagem);
      setErro('');
    } catch (error) {
      setErro('Erro ao cadastrar cliente. Tente novamente.');
      setMensagem('');
    }
  };

  return (
    <div className="cliente-container">
      <h2>Cadastrar Cliente</h2>
      <form onSubmit={handleSubmit} className="cliente-form">
        <div className="input-group">
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>CPF:</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Telefone:</label>
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar Cliente</button>
      </form>

      {mensagem && <p className="success-message">{mensagem}</p>}
      {erro && <p className="error-message">{erro}</p>}
    </div>
  );
};

export default Cliente;
