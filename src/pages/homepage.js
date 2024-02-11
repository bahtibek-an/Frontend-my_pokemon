import React, { useContext } from "react";
import PokemonList from "../components/pokemonlist";
import Header from "../components/header";
import { PokemonContext } from "../context/PokemonContext";
import FilterBar from "../components/filterbar";

const Home = () => {
  const { onClickLoadMore, active, setActive } = useContext(PokemonContext);
  return (
    <div className="home-page lg:p-10 xs:px-0 py-4 rounded-[1rem] flex flex-col overflow-hidden">
      
      <FilterBar/>
      <div className="flex items-center justify-center flex-col">
        <PokemonList />
        <div className="pagination flex gap-5 my-10">
          <button
            onClick={onClickLoadMore}
            className="bg-red-600   text-white rounded-md px-4 py-2 "
          >
            Load more ...
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
