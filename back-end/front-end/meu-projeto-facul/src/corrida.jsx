import React, { useState, useEffect } from 'react';
import { TextField, Button, Autocomplete, Container, Grid, Box } from '@mui/material';
import axios from 'axios';
import './corrida.css';

const Corrida = () => {
  const [clientes, setClientes] = useState([]);
  const [nomeCliente, setNomeCliente] = useState(null); // Definindo como null inicialmente
  const [enderecoOrigem, setEnderecoOrigem] = useState('');
  const [enderecoDestino, setEnderecoDestino] = useState('');
  const [tarifaPorKm, setTarifaPorKm] = useState('');
  const [message, setMessage] = useState('');

  // Função para buscar clientes do motorista logado
  useEffect(() => {
    const fetchClientes = async () => {
      const token = localStorage.getItem('token'); // Supondo que o token esteja no localStorage

      if (!token) {
        setMessage('Token de autenticação não encontrado');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/cliente/clientes', {
          headers: {
            'Authorization': `Bearer ${token}`, // Inclui o token JWT na requisição
          },
        });
        setClientes(response.data.clientes); // Salva os clientes recebidos
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        setMessage('Erro ao buscar clientes');
      }
    };

    fetchClientes();
  }, []);

  // Função para cadastrar a corrida
  const cadastrarCorrida = async () => {
    const token = localStorage.getItem('token'); // Verifica se o token está presente

    if (!token) {
      setMessage('Token de autenticação não encontrado');
      return;
    }

    if (!nomeCliente || !enderecoOrigem || !enderecoDestino || !tarifaPorKm) {
      setMessage('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/corridas/cadastrar', {
        enderecoOrigem,
        enderecoDestino,
        tarifaPorKm,
        nomeCliente: nomeCliente.nome, // Enviar o nome do cliente selecionado
      }, {
        headers: {
          'Authorization': `Bearer ${token}`, // Envia o token JWT na requisição
        },
      });
      setMessage(response.data.message); // Exibe a mensagem de sucesso ou erro
    } catch (error) {
      console.error('Erro ao cadastrar corrida:', error);
      setMessage('Erro ao cadastrar corrida');
    }
  };

  return (
    <Container maxWidth="sm" className="corrida-container">
      <Box mb={3}>
        <h2>Cadastrar Corrida</h2>
      </Box>
      <div className="corrida-form">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              value={nomeCliente}
              onChange={(event, newValue) => setNomeCliente(newValue)} // Agora passa o objeto do cliente
              options={clientes}
              getOptionLabel={(option) => option.nome}
              renderInput={(params) => <TextField {...params} label="Nome do Cliente" fullWidth />}
              isOptionEqualToValue={(option, value) => option._id === value._id}
            />
            {/* Condicional para exibir a mensagem "Seus clientes cadastrados" quando nenhum cliente for selecionado */}
            {!nomeCliente && <p>Seus clientes cadastrados</p>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Endereço de Origem"
              value={enderecoOrigem}
              onChange={(e) => setEnderecoOrigem(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Endereço de Destino"
              value={enderecoDestino}
              onChange={(e) => setEnderecoDestino(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Tarifa por KM"
              type="number"
              value={tarifaPorKm}
              onChange={(e) => setTarifaPorKm(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={cadastrarCorrida} fullWidth>
              Cadastrar Corrida
            </Button>
          </Grid>
        </Grid>
        {message && <p className="message">{message}</p>}
      </div>
    </Container>
  );
};

export default Corrida;
