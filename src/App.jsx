import React, { useState } from 'react';
import './App.css';
import List from './components/List.jsx';
import Info from './components/Info.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const App = () => {
  const [searchPokemon, setSearchPokemon] = useState('');
  const filterSearch = (event) => {
    setSearchPokemon(event.target.value);
  };
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<List searchPokemon={searchPokemon} filterSearch={filterSearch} />} />
          <Route path='/info/:id' element={<Info />} />
        </Routes>
      </BrowserRouter>
      <div className='nav'>   
        <h1>Pokemon</h1>
        <input
          type="text"
          placeholder="Search Pokemon"
          value={searchPokemon}
          onChange={filterSearch}
        />
      </div>
    </main>
  );
}
export default App;