import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Certifique-se de importar o useNavigate
import './cadastro.css';

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate(); // Inicializa o hook de navegação

  const formatarCpf = (value) => {
    value = value.replace(/\D/g, '');
    if (value.length <= 3) return value;
    else if (value.length <= 6) return value.replace(/(\d{3})(\d{1,})/, '$1.$2');
    else if (value.length <= 9) return value.replace(/(\d{3})(\d{3})(\d{1,})/, '$1.$2.$3');
    else return value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,})/, '$1.$2.$3-$4');
  };

  const handleCpfChange = (e) => {
    const { value } = e.target;
    setCpf(formatarCpf(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome || !cpf || !email || !senha) {
      setMensagem("Todos os campos são obrigatórios!");
      return;
    }

    const motorista = { nome, cpf, email, senha };
    setLoading(true);
    setMensagem("");

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

      // Redireciona para a tela de login após o cadastro bem-sucedido
      navigate("/login");
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      setMensagem(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Cadastro de Motorista</h1>
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
            onChange={handleCpfChange}
            maxLength="14"
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
        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
};

export default Cadastro;
