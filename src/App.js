import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pokemon from "./components/pokemonjsx/Pokemon";
import AboutPokemon from "./components/pokemonjsx/About_Poke";
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
