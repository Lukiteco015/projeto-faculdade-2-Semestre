// Função para salvar o cadastro no localStorage
function cadastrarMotoristaLocal(nome, cpf, email, senha) {
    const motoristas = JSON.parse(localStorage.getItem("motoristas")) || [];
    const novoMotorista = { nome, cpf, email, senha };
    motoristas.push(novoMotorista);
    localStorage.setItem("motoristas", JSON.stringify(motoristas));
    alert("Cadastro realizado com sucesso! Faça login.");
    window.location.href = "login.html"; // Redireciona para a página de login
  }
  
  // Função para fazer login local
  function loginMotoristaLocal(email, senha) {
    const motoristas = JSON.parse(localStorage.getItem("motoristas")) || [];
    const motorista = motoristas.find(
      (m) => m.email === email && m.senha === senha
    );
  
    if (motorista) {
      localStorage.setItem("motoristaLogado", JSON.stringify(motorista));
      alert("Login realizado com sucesso!");
      window.location.href = "../index.html"; // Redireciona para a página principal
    } else {
      alert("Email ou senha inválidos. Tente novamente.");
    }
  }
  
  // Função para verificar login
  function verificarLogin() {
    const token = localStorage.getItem("token");
    console.log("Token encontrado:", token); // Adicionado para depuração
    if (!token) {
      console.log("Redirecionando para login...");
      window.location.href = "login.html";
    }
  }
  
  
  // Função para logout
  function logout() {
    localStorage.removeItem("motoristaLogado");
    window.location.href = "pages/login.html"; // Redireciona para login
  }
  