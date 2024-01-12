import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PokemonView from "./pages/PokemonView";
import PokemonInfo from "./pages/PokemonInfo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokemonView />}></Route>
        <Route path="/pokemon-info/:selectedPokemonId" element={<PokemonInfo />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
