import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Poke.css';
import { Link } from 'react-router-dom';

const Poke = ({ url, color }) => {
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then((res) => {
        setPokemon(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, [url]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Check if the Pokemon data is fetched successfully
  if (!pokemon) {
    return <div>Error fetching Pokemon data</div>;
  }

  
  return (
    <Link to={`/pokemon/${pokemon.name}`} className="pokemon-link">
      <div className="pokemon-card" style={{ background: color }}>
        {/* Display Pokemon details */}
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <h3>{pokemon.name}</h3>
        <p>Height: {pokemon.height / 10} m</p>
        <p>Weight: {pokemon.weight / 10} kg</p>
        <p>Types: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
      </div>
    </Link>
  );
};

export default Poke;
