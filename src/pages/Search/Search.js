import React, { useContext } from "react";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import { Link, useLocation } from "react-router-dom";
import "./Search.css"; 
import { PokemonContext } from '../../components/PokemonContext/PokemonContext';

const Search = () => {
  const location = useLocation();
  const { globalPokemons, loading } = useContext(PokemonContext);

  const filterPokemons = globalPokemons.filter((pokemon) =>
    pokemon.name.includes(location.state)
  );

  return (
    <div className="search-container">
      <Link to={'/'} className="home-link">Go Home</Link>
      {filterPokemons.length > 0 ? (
        <div className="search-results">
          <div className="search-info">
            <p className="search-results-label">Results</p>
          </div>
          <div className="search-pokemons">
            {filterPokemons?.map((pokemon) => (
              <PokemonCard pokemon={pokemon} key={pokemon.id} />
            ))}
          </div>
        </div>
      ) : (
        <div className="pokemon-not-found">
          <h1>Pokemon Not Found</h1>
        </div>
      )}
    </div>
  );
};

export default Search;
