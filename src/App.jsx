import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pokemons from "./components/Pokemons/Pokemons";
import Pokemon from "./components/Pokemon/Pokemon";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pokemons />} />
        <Route path="/pokemon/:id" element={<Pokemon />} />
      </Routes>
    </Router>
  );
}

export default App;
