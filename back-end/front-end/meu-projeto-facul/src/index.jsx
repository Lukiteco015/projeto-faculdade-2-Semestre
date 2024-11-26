import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import './index.css';

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // `null` indica que estamos verificando o token
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Se não houver token, redireciona para login
      setIsAuthenticated(false);
      navigate("/login");
      return;
    }

    try {
      // Decodificar o token e verificar se ele expirou
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;  // Tempo atual em segundos

      if (decodedToken.exp < currentTime) {
        // Se o token expirou, remove do localStorage e redireciona para login
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/login");
      } else {
        // Se o token é válido
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Erro ao verificar o token:", error);
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false); // Define como falso ao fazer logout
    navigate("/login");
  };

  // Verificando se estamos verificando a autenticação
  if (isAuthenticated === null) {
    return <div>Carregando...</div>; // Pode substituir por um spinner ou outra animação
  }

  // Se não for autenticado, não renderiza nada
  if (!isAuthenticated) {
    return null; // Ou pode retornar um "Você não está autenticado" se preferir
  }

  return (
    <div className="home-container">
      <nav className="navbar">
        {/* Navegação com Links do React Router */}
        <Link to="/cliente">Cliente</Link>
        <Link to="/consumo">Consumo</Link>
        <Link to="/corrida">Corrida</Link>
        <Link to="/buscar-corrida">Buscar Corrida</Link>
        <Link to="/veiculo">Veiculos</Link>
        <button onClick={handleLogout} id="logoutButton">Logout</button>
      </nav>
      <main className="content">
        <h1>Bem-vindo ao DriverPro</h1>
        <p>Gerencie seus clientes, veículos e muito mais!</p>
      </main>
    </div>
  );
};

export default Home;

