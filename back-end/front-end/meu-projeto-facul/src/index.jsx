import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { Car, Users, Activity, MapPin, Settings, LogOut } from 'lucide-react';
import './index.css';

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [driverName, setDriverName] = useState("");
  const [tipOfTheDay, setTipOfTheDay] = useState("");
  const navigate = useNavigate();

  const tips = [
    "Evite pegar trânsito nas horas de pico!",
    "Revise o estado do seu veículo antes de pegar a estrada.",
    "Lembre-se de usar o cinto de segurança.",
    "Mantenha uma distância segura do carro da frente.",
    "Verifique os pneus e o óleo antes de cada viagem.",
    "Siga as sinalizações de trânsito para evitar acidentes.",
    "Não use o celular enquanto dirige.",
    "Evite ultrapassar em curvas ou em locais com pouca visibilidade.",
    "Sempre respeite o limite de velocidade.",
    "Se beber, não dirija. A segurança vem em primeiro lugar."
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      navigate("/login");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/login");
      } else {
        setIsAuthenticated(true);
        setDriverName(decodedToken.nome);
      }
    } catch (error) {
      console.error("Erro ao verificar o token:", error);
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      navigate("/login");
    }

    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTipOfTheDay(randomTip);

    const interval = setInterval(() => {
      const newRandomTip = tips[Math.floor(Math.random() * tips.length)];
      setTipOfTheDay(newRandomTip);
    }, 30000);

    return () => clearInterval(interval);


  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  if (isAuthenticated === null) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="home-container">
      <nav className="navbar">
        <Link to="/cliente" className="navbar-link">
          <Users className="navbar-icon" /> Cliente
        </Link>
        <Link to="/consumo" className="navbar-link">
          <Activity className="navbar-icon" /> Consumo
        </Link>
        <Link to="/corrida" className="navbar-link">
          <Car className="navbar-icon" /> Corrida
        </Link>
        <Link to="/buscar-corrida" className="navbar-link">
          <MapPin className="navbar-icon" /> Buscar Corrida
        </Link>
        <Link to="/veiculo" className="navbar-link">
          <Settings className="navbar-icon" /> Veículos
        </Link>
        <button onClick={handleLogout} className="navbar-button">
          <LogOut className="navbar-icon" /> Logout
        </button>
      </nav>
      <main className="content">
        <h1>Bem-vindo, {driverName} ao DriverPro</h1>
        <p>Gerencie seus clientes, veículos e muito mais!</p>

        <div className="tip-box">
          <h2>Dica do Dia:</h2>
          <p>{tipOfTheDay}</p>
        </div>
      </main>
    </div>
  );
};

export default Home;