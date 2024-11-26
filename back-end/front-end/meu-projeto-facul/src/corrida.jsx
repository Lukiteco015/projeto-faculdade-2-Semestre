import React, { useState, useEffect } from 'react';
import { TextField, Button, Autocomplete, Container, Grid, Box } from '@mui/material';
import axios from 'axios';
import './corrida.css';

const Corrida = () => {
  const [clientes, setClientes] = useState([]);
  const [nomeCliente, setNomeCliente] = useState(null);
  const [enderecoOrigem, setEnderecoOrigem] = useState('');
  const [enderecoDestino, setEnderecoDestino] = useState('');
  const [tarifaPorKm, setTarifaPorKm] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // Tipo da mensagem (sucesso/erro)

  // Função para buscar clientes do motorista logado
  useEffect(() => {
    const fetchClientes = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessageType('error');
        setMessage('Token de autenticação não encontrado');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/cliente/clientes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClientes(response.data.clientes);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        setMessageType('error');
        setMessage('Erro ao buscar clientes');
      }
    };

    fetchClientes();
  }, []);

  // Validação do formulário
  const isFormValid = () => {
    if (!nomeCliente) {
      setMessageType('error');
      setMessage('Selecione um cliente.');
      return false;
    }
    if (!enderecoOrigem || !enderecoDestino || !tarifaPorKm) {
      setMessageType('error');
      setMessage('Todos os campos devem ser preenchidos.');
      return false;
    }
    return true;
  };

  // Função para cadastrar a corrida
  const cadastrarCorrida = async () => {
    if (!isFormValid()) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setMessageType('error');
      setMessage('Token de autenticação não encontrado');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/corridas/cadastrar',
        {
          enderecoOrigem,
          enderecoDestino,
          tarifaPorKm,
          nomeCliente: nomeCliente.nome,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessageType('success');
      setMessage(response.data.message);
    } catch (error) {
      console.error('Erro ao cadastrar corrida:', error);
      setMessageType('error');
      setMessage('Erro ao cadastrar corrida');
    }
  };

  // Função para limpar campos
  const limparCampos = () => {
    setNomeCliente(null);
    setEnderecoOrigem('');
    setEnderecoDestino('');
    setTarifaPorKm('');
    setMessage('');
    setMessageType('');
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
              onChange={(event, newValue) => setNomeCliente(newValue)}
              options={clientes}
              getOptionLabel={(option) => option.nome}
              renderInput={(params) => <TextField {...params} label="Nome do Cliente" fullWidth />}
              isOptionEqualToValue={(option, value) => option._id === value._id}
            />
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
            <div className="button-group">
              <Button
                variant="contained"
                color="primary"
                onClick={cadastrarCorrida}
                className="btn-cadastrar"
              >
                Cadastrar Corrida
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={limparCampos}
                className="btn-limpar"
              >
                Limpar Campos
              </Button>
            </div>
          </Grid>
        </Grid>
        {message && (
          <p className={`message ${messageType === 'success' ? 'success' : 'error'}`}>
            {message}
          </p>
        )}
      </div>
    </Container>
  );
};

export default Corrida;
