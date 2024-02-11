import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PokemonContext } from "../context/PokemonContext";
import Loader from "../components/loader";

const Single = () => {
  const { getPokemonById } = useContext(PokemonContext);

  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState({});

  const fetchPokemon = async (id) => {
    const data = await getPokemonById(id);
    setPokemon(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemon(id);
  }, []);
  console.log();

  return (
    <>
    {loading ? <Loader/> : 
    <div className="flex flex-col overflow-hidden bg-white">
    <div className="header flex flex-col bg-slate-900 xs:text-2xl lg:text-5xl p-6 justify-center ">
      <div className=" flex flex-row justify-between items-center text-white">
        <Link to={-1}>←</Link>
        <div key={pokemon.id} className="font-bold ">
          {pokemon?.name?.toUpperCase()}
        </div>
        <div className="text-secondary">#{pokemon?.id}</div>
      </div>
      <div className="lg:text-lg lg:me-5 xs:text-sm justify-center flex flex-row text-center items-center p-7 gap-2">
        {pokemon.types?.map((type) => (
          <span
            key={type.type.name}
            className={`text-white text-start rounded-max ${type.type.name}  px-[0.9rem] py-[0.3rem]`}
          >
            {type.type.name}
          </span>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <img
          className="max-w-[100%] max-h-[100%] drop-shadow-card xs:max-w-[50%]"
          alt={pokemon?.name}
          src={pokemon?.sprites?.other.dream_world.front_default}
        />
      </div>
    </div>
    <div className="bg-white -mt-14 p-20 xs:px-10 shadow-single shadow-slate-200  text-start rounded-t-large ">
      <div className="lg:flex lg:items-start lg:justify-around    xs:mx-0 grid-cols-1 xs:grid-col-1">
        <div className="about flex flex-col gap-6 ">
          <h1 className="text-3xl font-bold pb-10">About</h1>
          <div className="flex gap-20 text-xl  xs:gap-14">
            <h4>Species</h4>
            <h4 className="font-bold xs:text-lg lg:text-xl">{pokemon?.species?.name}</h4>
          </div>
          <div className="flex gap-20 text-xl xs:gap-14">
            <h4>Height</h4>
            <h4 className="font-bold ps-3 xs:text-lg lg:text-xl">{pokemon?.height}m</h4>
          </div>
          <div className="flex gap-20 text-xl xs:gap-14">
            <h4>Weight</h4>
            <h4 className="font-bold ps-1 xs:text-lg lg:text-xl">{pokemon?.weight}kg</h4>
          </div>
          <div className="flex gap-20 text-xl xs:gap-14">
            <h4>Abilities</h4>
            <div className="ability flex gap-1 xs:text-lg lg:text-xl xs:flex-wrap">
              {pokemon?.abilities?.map((ability) => (
                <h4 key={ability.ability.name} className="font-bold ">
                  {ability?.ability.name},
                </h4>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:mx-0 xs:mx-0 lg:mt-0 flex flex-col text-start gap-6 xs:mt-24 ">
          <h1 className="text-3xl font-bold pb-10">Base Stats</h1>
          <div className="hp flex gap-6 items-center text-xl">

            <h4>HP</h4>
            <h4 className="ps-20 font-bold xs:text-lg">
              
              {pokemon?.stats[0]?.base_stat}
            </h4>
            <meter
              className="w-64"
              max={300}
              value={pokemon?.stats[0]?.base_stat}
              low={50}
            ></meter>
          </div>
          <div className="hp flex gap-6 items-center text-xl">
            <h4>Attack</h4>
            <h4 className="font-bold ps-11 xs:text-lg">
              {pokemon?.stats[1]?.base_stat}
            </h4>
            <meter
              className="w-64"
              max={300}
              value={pokemon?.stats[1]?.base_stat}
              low={50}
            ></meter>
          </div>
          <div className="hp flex gap-6 items-center text-xl">
            <h4>Defense</h4>
            <h4 className="font-bold ps-7 xs:text-lg">{pokemon?.stats[2]?.base_stat}</h4>
            <meter
              className="w-64"
              max={300}
              value={pokemon?.stats[2]?.base_stat}
              low={50}
            ></meter>
          </div>
          <div className="hp flex gap-6 items-center text-xl">
            <h4>Sp.Atk</h4>
            <h4 className="font-bold ps-12 lg:text-lg xs:text-lg">
              {pokemon?.stats[3]?.base_stat}
            </h4>
            <meter
              className="w-64"
              max={300}
              value={pokemon?.stats[3]?.base_stat}
              low={50}
            ></meter>
          </div>
          <div className="hp flex gap-6 items-center text-xl ">
            <h4>Sp.Def</h4>
            <h4 className="font-bold ps-12 xs:text-lg">
              {pokemon?.stats[4]?.base_stat}
            </h4>
            <meter
              className="w-64"
              max={300}
              value={pokemon?.stats[4]?.base_stat}
              low={50}
            ></meter>
          </div>
          <div className="hp flex gap-6 items-center text-xl">
            <h4>Speed</h4>
            <h4 className="font-bold ps-12 xs:text-lg">
              {pokemon?.stats[5]?.base_stat}
            </h4>
            <meter
              className="w-64"
              max={300}
              value={pokemon?.stats[5]?.base_stat}
              low={50}
            ></meter>
          </div>
          <div className="hp flex gap-6 items-center text-xl">
            <h4>Total</h4>
            <h4 className="font-bold ps-14 xs:text-lg">
              {pokemon?.stats[0]?.base_stat +
                pokemon?.stats[1]?.base_stat +
                pokemon?.stats[2]?.base_stat +
                pokemon?.stats[3]?.base_stat +
                pokemon?.stats[4]?.base_stat +
                pokemon?.stats[5]?.base_stat}
            </h4>
            <meter
              className="w-64"
              max={1000}
              min={0}
              value={
                pokemon?.stats[0]?.base_stat +
                pokemon?.stats[1]?.base_stat +
                pokemon?.stats[2]?.base_stat +
                pokemon?.stats[3]?.base_stat +
                pokemon?.stats[4]?.base_stat +
                pokemon?.stats[5]?.base_stat
              }
              low={400}
            ></meter>
          </div>
        </div>
      </div>
    </div>
  </div>}
    </>
  );
};

export default Single;
