import React from 'react';
import './allPokemon.css'

const AllPokemon = ({ pokemonList, fetchPokemon, selectedPokemon }) => {
  return (
    <div className="resultCard">
      {pokemonList.map((poke, index) => (
        <div
          key={index}
          className={`card ${selectedPokemon && selectedPokemon.name === poke.name ? "selected" : ""}`}
          onClick={() => fetchPokemon(poke.name)}
        >
          <h1>{poke.name}</h1>
          <img src={poke.img} alt={poke.name} />
          <p>Species: {poke.species}</p>
          <h3>Attack: {poke.attack}</h3>
          <h4>Defense: {poke.defense}</h4>
          <p>Type: {poke.type}</p>
          <p>term: {}</p>
        </div>
      ))}
    </div>
  );
};

export default AllPokemon;
