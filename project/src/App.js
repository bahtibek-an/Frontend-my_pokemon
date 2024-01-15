// Import necessary dependencies and components
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Component/Navbar/Navbar';
import PokemonDetailPage from './Component/DetailPage/PokemonDetailPage';
import Details from './Component/Details/Details';
import './App.css';

const App = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = async () => {
    try {
      const endpoints = Array.from({ length: 200 }, (_, index) =>
        `https://pokeapi.co/api/v2/pokemon/${index + 1}/`
      );

      const responses = await Promise.all(endpoints.map((endpoint) => axios.get(endpoint)));
      const pokemonDetails = responses.map((response) => response.data);

      setPokemons(pokemonDetails);
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
    }
  };

  const pokemonFilter = (name) => {
    if (!name) {
      getPokemons();
      return;
    }

    const filteredPokemons = pokemons.filter((pokemon) => pokemon.name.includes(name));
    setPokemons(filteredPokemons);
  };

  return (
    <Router>
      <div>
        <Navbar pokemonFilter={pokemonFilter} />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {pokemons.map((pokemon) => (
                  <PokemonDetailPage
                    id={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.sprites.front_default}
                    types={pokemon.types[0].type.name}
                  />
                ))}
              </div>
            }
          />
          <Route path="/details/:id" element={<Details pokemons={pokemons} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
