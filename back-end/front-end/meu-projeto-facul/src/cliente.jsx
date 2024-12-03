import React, { useState } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask'; // Biblioteca para máscaras
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
          cpf: cpf.replace(/\D/g, ''), // Remove máscara para enviar apenas os números
          telefone: telefone.replace(/\D/g, ''), // Remove máscara para enviar apenas os números
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
          <InputMask
            mask="999.999.999-99" // Máscara para CPF
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          >
            {(inputProps) => <input {...inputProps} />}
          </InputMask>
        </div>
        <div className="input-group">
          <label>Telefone:</label>
          <InputMask
            mask="(99) 99999-9999" // Máscara para telefone celular
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          >
            {(inputProps) => <input {...inputProps} />}
          </InputMask>
        </div>
        <button type="submit">Cadastrar Cliente</button>
      </form>

      {mensagem && <p className="success-message">{mensagem}</p>}
      {erro && <p className="error-message">{erro}</p>}
    </div>
  );
};

export default Cliente;

