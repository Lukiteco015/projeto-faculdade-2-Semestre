import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login.jsx";
import Home from './index.jsx';
import Cadastro  from "./cadastro.jsx";
import Corrida from "./corrida.jsx";
import CorridasDoMotorista from "./buscar.jsx";
import Cliente from "./cliente.jsx";
import Veiculo from "./veiculo.jsx";
import CriarRelatorioConsumo from "./consumo.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pagina-inicial" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/corrida" element={<Corrida />} />
        <Route path="/buscar-corrida" element={<CorridasDoMotorista />} />
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/veiculo" element={<Veiculo />} />
        <Route path="/consumo" element={<CriarRelatorioConsumo />} />
      </Routes>
    </Router>
  );
}

export default App;
