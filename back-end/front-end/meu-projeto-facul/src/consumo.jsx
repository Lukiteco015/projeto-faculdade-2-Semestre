import React, { useState } from 'react';
import axios from 'axios';
import './consumo.css';

function CriarRelatorioConsumo() {
  const [data, setData] = useState('');
  const [quilometragem, setQuilometragem] = useState('');
  const [precoCombustivel, setPrecoCombustivel] = useState('');
  const [kilometragemPorLitro, setKilometragemPorLitro] = useState('');
  const [consumoCombustivel, setConsumoCombustivel] = useState('');
  const [relatorioCriado, setRelatorioCriado] = useState(null);

  const calcularConsumoCombustivel = () => {
    const kmPorLitro = parseFloat(kilometragemPorLitro);
    const preco = parseFloat(precoCombustivel);
    const km = parseFloat(quilometragem);

    if (!isNaN(kmPorLitro) && !isNaN(preco) && !isNaN(km)) {
      const consumo = preco * (km / kmPorLitro);
      setConsumoCombustivel(consumo.toFixed(2));
    }
  };

  const criarRelatorio = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/relatorios/consumo/criar',
        {
          data,
          quilometragem,
          consumoCombustivel,
          motoristaId: 'exemplo-id-do-motorista',
          veiculoId: 'exemplo-id-do-veiculo',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRelatorioCriado(response.data.novoRelatorio);
    } catch (error) {
      console.error('Erro ao criar relatório:', error);
    }
  };

  return (
    <div className="relatorio-container">
      <h2>Criar Relatório de Consumo</h2>

      <form className="relatorio-form">
        <div className="form-group">
          <label>Data:</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Quilometragem:</label>
          <input
            type="number"
            value={quilometragem}
            onChange={(e) => setQuilometragem(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Preço do Combustível:</label>
          <input
            type="number"
            value={precoCombustivel}
            onChange={(e) => setPrecoCombustivel(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Quilometragem por Litro:</label>
          <input
            type="number"
            value={kilometragemPorLitro}
            onChange={(e) => setKilometragemPorLitro(e.target.value)}
          />
        </div>

        <div className="button-group">
          <button type="button" onClick={calcularConsumoCombustivel}>
            Calcular Consumo de Combustível
          </button>
          <button type="button" onClick={criarRelatorio}>
            Criar Relatório
          </button>
        </div>
      </form>

      {consumoCombustivel && (
        <div className="result">
          <p>
            <strong>Consumo de Combustível Calculado:</strong> R${consumoCombustivel}
          </p>
        </div>
      )}

      {relatorioCriado && (
        <div className="result">
          <h3>Relatório Criado com Sucesso:</h3>
          <p>
            <strong>Data:</strong> {relatorioCriado.data}
          </p>
          <p>
            <strong>Quilometragem:</strong> {relatorioCriado.quilometragem} km
          </p>
          <p>
            <strong>Consumo de Combustível:</strong> R${relatorioCriado.consumoCombustivel}
          </p>
        </div>
      )}
    </div>
  );
}

export default CriarRelatorioConsumo;
