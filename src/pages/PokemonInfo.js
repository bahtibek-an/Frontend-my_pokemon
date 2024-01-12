import React from "react";
import { useParams } from "react-router-dom";
import PokemonData from "../components/PokemonData";

const PokemonInfo = () => {
  const { selectedPokemonId } = useParams();

  return (
    <div className="md:overflow-x-hidden">
      <PokemonData pokemonId={selectedPokemonId} />
    </div>
  );
};

export default PokemonInfo;
