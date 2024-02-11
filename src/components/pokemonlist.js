import React, { useContext } from "react";
import Card from "../components/card";
import { Link } from "react-router-dom";
import { PokemonContext } from "../context/PokemonContext";
import Loader from "./loader";

const PokemonList = () => {
  const { allPokemons, filteredPokemons, loading } = useContext(PokemonContext);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid items-center justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPokemons.length ? (
            <>
              {filteredPokemons.map((pokemon) => (
                <Card loading={loading} pokemon={pokemon} key={pokemon.id} />
              ))}
            </>
          ) : (
            <>
              {allPokemons.map((pokemon) => (
                <Card loading={loading} pokemon={pokemon} key={pokemon.id} />
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default PokemonList;
