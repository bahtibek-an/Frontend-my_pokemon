import React from "react";
import { Link } from "react-router-dom";
import Loader from "./loader";

const Card = ({ pokemon, loading }) => {
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Link
          to={`/pokemon/${pokemon.id}`}
          className="cursor-pointer p-[1rem] "
        >
          <div
            className={`bg-slate-900 text-white shadow-card rounded-large overflow-hidden flex py-[3rem] pr-[1rem] ps-[3rem] items-center justify-between`}
          >
            <div className="self-start">
              <h1 className="lg:text-3xl xs:text-xl font-bold ">
                {pokemon.name.toUpperCase()}
              </h1>
              <div className="flex flex-col mt-[1rem]">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className={`${type.type.name} self-start xs:text-sm lg:text-base  mb-[0.5rem] text-start rounded-max bg-secondary table px-[0.9rem] py-[0.3rem]`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="self-end flex-col flex items-center justify-end max-w-[50%]  ">
              <div className="pokemon-id lg:-mb-[20px] lg:text-[2.5rem] text-secondary xs:text-3xl xs:m-0">
                #{pokemon.id}
              </div>
              <img
                className="max-w-[100%] max-h-[100%] drop-shadow-card"
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

export default Card;
