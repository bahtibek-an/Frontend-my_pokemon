import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pokemon from "./components/pokedexjsx/Pokemon";
import AboutPokemon from "./components/pokedexjsx/overlook";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pokemon />} />
        <Route path="/pokemon/:id" element={<AboutPokemon />} />
      </Routes>
    </Router>
  );
}

export default App;
