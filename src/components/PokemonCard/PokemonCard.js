import React from "react";
import { Link } from "react-router-dom";
import "./PokemonCard.css"; // Import your CSS file

const PokemonCard = ({ pokemon, loading }) => {
  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <Link
          to={`/p/${pokemon.id}`}
          className="pokemon-card-link"
        >
          <div
            className="pokemon-card-container"
          >
            <div className="pokemon-details">
              <h1 className="pokemon-name">
                {pokemon.name.toUpperCase()}
              </h1>
              <div className="pokemon-types">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className={`type-badge ${type.type.name}`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="pokemon-info">
              <img
                className="pokemon-image"
                alt={pokemon.name}
                src={pokemon.sprites.other.dream_world.front_default}
              />
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default PokemonCard;
