import React from 'react';
import './pokemonCard.css'

const PokemonCard = ({ pokemon, fetchPokemon }) => {
  return (
    <div className="selectedPokemon">
      <div className="card">
        <h1>{pokemon.name}</h1>
        <img src={pokemon.img} alt={pokemon.name} />
        <p>Species: {pokemon.species}</p>
        <h3>Attack: {pokemon.attack}</h3>
        <h4>Defense: {pokemon.defense}</h4>
        <p>Type: {pokemon.type}</p>
      </div>
    </div>
  );
};

export default PokemonCard;
