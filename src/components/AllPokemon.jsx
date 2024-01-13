import React from 'react';
import './allPokemon.css'

const AllPokemon = ({ pokemonList, fetchPokemon, selectedPokemon }) => {
  return (
    <div className="resultCard container">
      {pokemonList.map((poke, index) => (
        <div
          key={index}
          className={`card ${selectedPokemon && selectedPokemon.name === poke.name ? "selected" : ""}`}
          onClick={() => fetchPokemon(poke.name)}
        >
          <h1>{poke.name}</h1>
          <img src={poke.img} alt={poke.name} />
          <h5>Attack: {poke.attack}</h5>
          <h5>Defense: {poke.defense}</h5>
          <h5>Type: {poke.type}</h5>
        </div>
      ))}
    </div>
  );
};

export default AllPokemon;
