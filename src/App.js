import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokeList from './component/PokeList';
import PokeCard from './component/PokeCard';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const searchPokemon = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <Router>
      <div className="Container">
        <div className="name">
          <h1> Pokémon</h1>
          <input type="text" placeholder="Search..."value={searchQuery}onChange={searchPokemon}/>
        </div>
        <Routes>
          <Route path="/" element={<PokeList searchQuery={searchQuery} />}/>
          <Route path="/box/:name" element={<PokeCard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
