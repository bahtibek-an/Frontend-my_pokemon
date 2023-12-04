import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PokemonDetails.css'
import axios from 'axios';

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPokemon();
  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pokemon-details">
      <Link to="/" className="back-button">Back</Link>
      <h2>{pokemon.name}</h2>
      <div className="pokemon-image">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
      <div className="details">
        <p>Type: {pokemon.types[0].type.name}</p>
        <p>Speed: {pokemon.stats[0].base_stat}</p>
        <p>Weight: {pokemon.weight} kg</p>
        <p>Height: {pokemon.height / 10} m</p>
      </div>
    </div>
  );
}

export default PokemonDetails;
