// Card.js
import React from "react";

const Card = ({ pokemon, loading, infoPokemon }) => {
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="card" onClick={() => infoPokemon(pokemon)}>
          <h2>{pokemon.id}</h2>
          <img src={pokemon.sprites.front_default} width="150" alt="" />
          <h2>{pokemon.name}</h2>
        </div>
      )}
    </>
  );
};

export default Card;
