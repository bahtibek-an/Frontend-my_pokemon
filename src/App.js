import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonList from './Pokemon/PokemonList/PokemonList';
import PokemonDetails from './Pokemon/PokemonDetails/PokemonDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="content">
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
