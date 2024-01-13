import React from 'react';
import './pokemonCard.css'

const PokemonCard = ({ pokemon, fetchPokemon }) => {
  return (
    <div className="selectedPokemon container">
      <div className="card">
        <h2>{pokemon.name}</h2>
        <img src={pokemon.img} alt={pokemon.name} />
        <h5>Species: {pokemon.species}</h5>
        <h5>Attack: {pokemon.attack}</h5>
        <h5>Defense: {pokemon.defense}</h5>
        <h3>Type: {pokemon.type}</h3>
      </div>
    </div>
  );
};

export default PokemonCard;
