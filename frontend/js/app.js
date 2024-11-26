// Verifica se o usuário está logado
function verificarLogin() {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "pages/login.html"; // Redireciona para o login se não estiver logado
    }
  }
  
  // Função para realizar o logout
  function logout() {
    localStorage.removeItem("token"); // Remove o token de autenticação
    window.location.href = "pages/login.html"; // Redireciona para o login
  }
  
  // Inicialização dos eventos
  document.addEventListener("DOMContentLoaded", () => {
    verificarLogin(); // Garante que o usuário está autenticado
  
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
      logoutButton.addEventListener("click", logout);
    }
  
    // Configuração para clientes
    const clienteForm = document.getElementById("clienteForm");
    const listaClientes = document.getElementById("listaClientes");
  
    if (clienteForm) {
      clienteForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nome = document.getElementById("nome").value;
        const telefone = document.getElementById("telefone").value;
        const email = document.getElementById("email").value;
  
        salvarCliente(nome, telefone, email);
        alert("Cliente cadastrado com sucesso!");
        exibirClientes();
      });
    }
  
    if (listaClientes) {
      exibirClientes();
    }
  });
  
  // Funções auxiliares (exemplo para clientes)
  function salvarCliente(nome, telefone, email) {
    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    clientes.push({ nome, telefone, email });
    localStorage.setItem("clientes", JSON.stringify(clientes));
  }
  
  function exibirClientes() {
    const listaClientes = document.getElementById("listaClientes");
    if (!listaClientes) return;
  
    listaClientes.innerHTML = ""; // Limpa a lista antes de renderizar
    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    clientes.forEach((cliente) => {
      const li = document.createElement("li");
      li.textContent = `${cliente.nome} - ${cliente.telefone} - ${cliente.email}`;
      listaClientes.appendChild(li);
    });
  }
  