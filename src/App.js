import React from 'react';
import './App.css';
import PokemonList from './Components/PokemonList';
import { Route, Routes } from 'react-router-dom';
import PokemonWiew from './Components/PokemonWiew';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<PokemonList/>}/>
        <Route path='/pokemon/:name' element={<PokemonWiew/>}/>
      </Routes>
    </div>
  );
}

export default App;
