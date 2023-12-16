import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pokemon from "./components/page/Pokemon";
import AboutPokemon from "./components/page/AboutPokemon";
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
