import React, { useState } from "react";
import './cadastro.css';

const Cadastro = () => {
  // Definindo o estado para os campos do formulário
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false); // Estado para controle de carregamento
  const [mensagem, setMensagem] = useState(""); // Estado para mostrar mensagens de erro ou sucesso
  
  // Função para formatar o CPF
  const formatarCpf = (value) => {
    // Remove tudo que não for número
    value = value.replace(/\D/g, '');
    
    // Aplica a máscara de CPF: XXX.XXX.XXX-XX
    if (value.length <= 3) {
      return value;
    } else if (value.length <= 6) {
      return value.replace(/(\d{3})(\d{1,})/, '$1.$2');
    } else if (value.length <= 9) {
      return value.replace(/(\d{3})(\d{3})(\d{1,})/, '$1.$2.$3');
    } else {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,})/, '$1.$2.$3-$4');
    }
  };
  
  // Função chamada quando o usuário digita no campo CPF
  const handleCpfChange = (e) => {
    const { value } = e.target;
    setCpf(formatarCpf(value));
  };
  
  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verifica se todos os campos estão preenchidos
    if (!nome || !cpf || !email || !senha) {
      setMensagem("Todos os campos são obrigatórios!");
      return;
    }
    
    const motorista = { nome, cpf, email, senha };
    
    // Marca o início do carregamento
    setLoading(true);
    setMensagem(""); // Limpa a mensagem de erro/sucesso
    
    try {
      const response = await fetch("http://localhost:5000/api/motorista/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(motorista),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensagem || "Erro ao cadastrar o motorista.");
      }
      
      setMensagem("Cadastro realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      setMensagem(`Erro: ${error.message}`);
    } finally {
      // Marca o fim do carregamento
      setLoading(false);
    }
  };
  
  return (
    <div>
      <h1>Cadastro de Motorista</h1>
      
      {/* Mostra mensagem de erro ou sucesso */}
      {mensagem && (
        <p className={`alert ${mensagem.includes("sucesso") ? "success" : "error"}`}>
          {mensagem}
        </p>
      )}
      
      <form onSubmit={handleSubmit} id="cadastroForm">
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            value={cpf}
            onChange={handleCpfChange} // Atualiza com a máscara
            maxLength="14" // Limita o número de caracteres para o CPF
            required
          />
        </div>
        
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        
        {/* Botão de envio, desabilitado enquanto carrega */}
        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
};

export default Cadastro;
