import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importando o useNavigate
import './login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook para navegar para outra página

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      setMensagem("Por favor, preencha todos os campos.");
      return;
    }

    const usuario = { email, senha };
    setLoading(true);
    setMensagem(""); // Limpa mensagens anteriores

    try {
      const response = await fetch("http://localhost:5000/api/motorista/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensagem || "Erro ao fazer login.");
      }

      const data = await response.json();
      const token = data.token; // Supondo que a API retorna um token de autenticação

      localStorage.setItem("token", token); // Armazena o token no localStorage
      setMensagem("Login realizado com sucesso!");
      console.log("Token recebido:", token); // Exibe o token no console
      navigate("/pagina-inicial"); // Redireciona para a página inicial (Home)

    } catch (error) {
      setMensagem(`Erro: ${error.message}`);
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Login</h1>

        {mensagem && (
          <p className={`alert ${mensagem.includes("sucesso") ? "success" : "error"}`}>
            {mensagem}
          </p>
        )}

        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Validando..." : "Entrar"}
        </button>

        <p>
          Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
