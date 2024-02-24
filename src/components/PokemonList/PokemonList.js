import React, { useContext } from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import "./PokemonList.css"; 
import { PokemonContext } from '../PokemonContext/PokemonContext';

const PokemonList = () => {
  const { allPokemons, loading } = useContext(PokemonContext);

  return (
    <>
      {loading ? (
        <span>loading...</span>
      ) : (
        <div className="pokemon-list-container">
          <>
            {allPokemons.map((pokemon) => (
              <PokemonCard loading={loading} pokemon={pokemon} key={pokemon.id} />
            ))}
          </>
        </div>
      )}
    </>
  );
};

export default PokemonList;
