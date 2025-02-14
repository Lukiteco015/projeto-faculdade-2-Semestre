import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from 'react-input-mask';
import './cadastro.css';

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const [senhaForte, setSenhaForte] = useState({
    minLength: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const navigate = useNavigate();

  const handleSenhaChange = (e) => {
    const value = e.target.value;
    setSenha(value);

    const newSenhaForte = {
      minLength: value.length >= 8,
      hasUppercase: /[A-Z]/.test(value),
      hasNumber: /\d/.test(value),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    };

    setSenhaForte(newSenhaForte);
  };

  const [showPassword, setPassword] = useState(false);

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
      navigate("/login");
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      setMensagem(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-wrapper">
      <div className="cadastro-box">
        <h1>Cadastro de Motorista</h1>
        {mensagem && (
          <p className={`alert ${mensagem.includes("sucesso") ? "success" : "error"}`}>
            {mensagem}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              placeholder="Digite seu nome"
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div>
            <label>CPF:</label>
            <InputMask
              mask="999.999.999-99"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Digite seu cpf"
            >
              {(inputProps) => <input {...inputProps} />}
            </InputMask>
          </div>
          <div>
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Digite seu e-mail"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="senha-container">
            <label htmlFor="senha">Senha:</label>
            <input
              type={showPassword ? "text" : "password"}
              id="senha"
              value={senha}
              placeholder="Digite sua senha"
              onChange={handleSenhaChange}
              required
            />
            <button type="button" onClick={() => setPassword(!showPassword)} className="eye-icon">
              &#128065;
            </button>
          </div>

          {/* Caixinha de requisitos de senha */}
          <div className="requisitos-box">
            <h2>Requisitos para a senha forte:</h2>
            <ul>
              <li>Deve ter pelo menos 8 caracteres.</li>
              <li>Deve conter pelo menos uma letra maiúscula.</li>
              <li>Deve conter pelo menos um número.</li>
              <li>Deve ter um caractere especial (ex: !, @, #, etc.).</li>
            </ul>
          </div>

          <button type="submit" disabled={loading || !Object.values(senhaForte).every(Boolean)}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
