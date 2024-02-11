import React, { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";
import Card from "../components/card";
import { Link, useLocation } from "react-router-dom";
import IMG from '../assets/sad.png'

const SearchPage = () => {
  const location = useLocation();
  const { globalPokemons, loading } = useContext(PokemonContext);

  const filterPokemons = globalPokemons.filter((pokemon) =>
    pokemon.name.includes(location.state)
  );
  return (
    <div className="flex flex-col">
      <Link to={'/'} className="flex justify-center rounded-s-full m-2 lg:w-[10%] xs:w-[20%]  md:w-1/12 lg:text-sm xs:text-xs items-center bg-red-600 p-2 rounded-md text-white "> Go Home</Link>
      {filterPokemons.length > 0 ? (
        <div className="m-4">
          <div className="justify-between flex flex-row items-center">
            <p className="float-right my-4 lg:text-4xl xs:text-2xl font-extrabold">Results</p>
            <p className="float-left lg:text-2xl xs:text-sm font-bold text-red-600">
              Similar pokemons:{"  "}
              <span className="font-normal text-slate-900">
                 {filterPokemons.length}pc
              </span>
            </p>
          </div>
          <div className="grid items-center justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filterPokemons?.map((pokemon) => (
              <Card pokemon={pokemon} key={pokemon.id} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center my-10 gap-10  lg:text-4xl xs:text-3xl text-red-600 font-bold">
          <h1 >Pokemon Not Found</h1>
          <img className="w-60" src={IMG} alt="" />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
