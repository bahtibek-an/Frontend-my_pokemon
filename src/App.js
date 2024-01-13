import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import PokemonCard from './components/PokemonCard';
import AllPokemon from './components/AllPokemon';
import Header from './components/Header';
import Next from './next.png';

const App = () => {
  const [pokeName, setpokeName] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPokemonList();
  }, [offset]);

  const fetchPokemonList = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
      .then((response) => {
        const results = response.data.results;
        const promises = results.map((result) => axios.get(result.url));
        axios
          .all(promises)
          .then((res) => {
            const data = res.map((item) => ({
              name: item.data.name,
              species: item.data.species.name,
              img: item.data.sprites.front_default,
              attack: item.data.stats[1].base_stat,
              defense: item.data.stats[2].base_stat,
              type: item.data.types[0].type.name,
            }));
            setPokemonList(data);
          })
          .catch((error) => {
            console.error("Error!", error);
          });
      })
      .catch((error) => {
        console.error("Error!", error);
      });
  };

  const fetchPokemon = (pokemonName) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        const data = {
          name: response.data.name,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
        };
        setPokemon(data);
        setError(false);
      })
      .catch(() => {
        setPokemon(null);
        setError(true);
      });
  };

  const handleNext = () => {
    setOffset((prevOffset) => prevOffset + 20);
  };

  const handlePrevious = () => {
    if (offset >= 20) {
      setOffset((prevOffset) => prevOffset - 20);
    }
  };

  const handleSearch = () => {
    fetchPokemon(pokeName);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchPokemon(pokeName);
    }
  };

  return (
    <>
      <Header
        pokeName={pokeName}
        setpokeName={setpokeName}
        handleKeyPress={handleKeyPress}
        handleSearch={handleSearch}
      />

      {error && (
        <div className="error container">
          <b>Not found !</b>
        </div>
      )}

      <div className="pagination container">
        <button className='prev' onClick={handlePrevious} disabled={offset === 0}>
        <img className='next prev-1' src={Next}></img>
        </button>
        <button className='prev' onClick={handleNext}><img className='next' src={Next}></img></button>
      </div>
      {pokemon && <PokemonCard pokemon={pokemon} fetchPokemon={fetchPokemon} />}
      <AllPokemon pokemonList={pokemonList} fetchPokemon={fetchPokemon} selectedPokemon={pokemon} />

    </>
  );
};

export default App;
