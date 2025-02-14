import React, { useState } from 'react';
import axios from 'axios';
import { formatInTimeZone } from 'date-fns-tz';
import './consumo.css';

function CriarRelatorioConsumo() {
  const [data, setData] = useState('');
  const [precoCombustivel, setPrecoCombustivel] = useState('');
  const [quilometragemPorLitro, setQuilometragemPorLitro] = useState('');
  const [consumoCombustivel, setConsumoCombustivel] = useState('');
  const [relatorioCriado, setRelatorioCriado] = useState(null);

  const calcularConsumoCombustivel = () => {
    const kmPorLitro = parseFloat(quilometragemPorLitro);
    const preco = parseFloat(precoCombustivel);

    if (!isNaN(kmPorLitro) && !isNaN(preco)) {
      const consumo = preco * (1 / kmPorLitro);
      setConsumoCombustivel(consumo.toFixed(2));
    }
  };

  const criarRelatorio = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/relatorios/consumo/criar',
        {
          data: new Date(data).toISOString(),
          consumoCombustivel
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

  const ajustarEFormatarDataBrasileira = (dataString) => {
    const timeZone = 'America/Sao_Paulo'; // Fuso horário de São Paulo
    const dataUTC = new Date(dataString);

    // Converte a data UTC para a data no fuso horário local
    return formatInTimeZone(dataUTC, timeZone, 'dd/MM/yyyy');
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
            value={quilometragemPorLitro}
            onChange={(e) => setQuilometragemPorLitro(e.target.value)}
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
            <strong>Data:</strong> {ajustarEFormatarDataBrasileira(relatorioCriado.data)}
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
