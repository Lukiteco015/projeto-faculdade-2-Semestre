import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './buscar.css';

function CorridasDoMotorista() {
  const [corridas, setCorridas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Função para buscar as corridas
  const buscarCorridas = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/corridas/buscar', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCorridas(response.data.corridas);
    } catch (error) {
      console.error('Erro ao buscar corridas:', error);
      setMessage('Erro ao buscar as corridas.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar o status da corrida (Concluir ou Cancelar)
  const atualizarStatus = async (id, novoStatus) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/corridas/atualizar/${id}`,
        { status: novoStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setCorridas((prevCorridas) =>
          prevCorridas.map((corrida) =>
            corrida._id === id ? { ...corrida, status: novoStatus } : corrida
          )
        );
        setMessage('Status atualizado com sucesso!');
        setMessageType('success');
      }
    } catch (error) {
      console.error('Erro ao atualizar o status:', error);
      setMessage('Erro ao atualizar o status.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarCorridas();
  }, []);

  return (
    <div className="container">
      <h1>Minhas Corridas</h1>

      {/* Feedback de carregamento */}
      {loading && <p className="loading">Carregando...</p>}

      {/* Exibindo as corridas */}
      <div className="corridas-list">
        {corridas.map((corrida) => (
          <div key={corrida._id} className="corrida-item">
            <p><strong>Cliente:</strong> {corrida.cliente.nome}</p>
            <p><strong>Endereço de origem:</strong> {corrida.enderecoOrigem}</p>
            <p><strong>Status:</strong> <span className={`status ${corrida.status.toLowerCase()}`}>{corrida.status}</span></p>

            {/* Exibindo o preço total e a distância */}
            <p><strong>Preço Total:</strong> R$ {corrida.precoTotal}</p>
            <p><strong>Distância:</strong> {corrida.distancia} km</p>

            {/* Botões para alterar o status sempre visíveis */}
            <div className="buttons">
              <button
                className="btn-concluir"
                onClick={() => atualizarStatus(corrida._id, 'Concluida')}
              >
                Concluir
              </button>
              <button
                className="btn-cancelar"
                onClick={() => atualizarStatus(corrida._id, 'Cancelada')}
              >
                Cancelar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Exibindo mensagens de sucesso ou erro */}
      {message && <p className={`message ${messageType}`}>{message}</p>}
    </div>
  );
}

export default CorridasDoMotorista;
