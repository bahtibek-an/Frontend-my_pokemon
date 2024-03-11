import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import SearchBar from './components/SearchBar';
import './style.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
        setPokemonList(response.data.results);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      }
    };

    fetchPokemon();
  }, []);

  return (
    <Router>
      <div>
        {/* Добавляем ваш SearchBar перед Switch */}
        <SearchBar />

        <Switch>
          <Route exact path="/">
            {/* Передаем список покемонов в компонент PokemonList */}
            <PokemonList pokemonList={pokemonList} />
          </Route>
          <Route
            path="/pokemon/:id"
            render={(props) => <PokemonDetails {...props} />}
          />
          <Route path="/search">
            <SearchBar />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
