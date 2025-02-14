import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react"
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("login-page");

    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      setMensagem("Por favor, preencha todos os campos.");
      return;
    }

    const usuario = { email, senha };
    setLoading(true);
    setMensagem("");

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
      const token = data.token;

      localStorage.setItem("token", token);
      setMensagem("Login realizado com sucesso!");
      setTimeout(() => navigate("/pagina-inicial"), 1500); // Pequeno delay para exibir mensagem
    } catch (error) {
      setMensagem(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
      <h1><User size={48} style={{ marginRight: '10px' }} /></h1>

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
          {loading ? <span className="spinner" /> : "Entrar"}
        </button>

        <p>
          Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
