import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";
import SearchAppBar from "../components/PokedexAppBar";

const PokemonView = () => {
  const { generationId } = useParams();

  const [searchInput, setSearchInput] = useState("");
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);

  return (
    <div>
      <SearchAppBar generationId={generationId} onSearch={(input) => setSearchInput(input)} />
      <PokemonCard generationId={generationId} searchInput={searchInput} />
    </div>
  );
};

export default PokemonView;
