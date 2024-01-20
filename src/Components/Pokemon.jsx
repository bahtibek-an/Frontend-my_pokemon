import React, { useEffect, useState } from "react";
import "./Pokemon.css";

const Pokemon = ({ pokemons ,value}) => {
  const [data,setData] = useState([]);
  const [show,setShow] = useState([]);
  useEffect(() => {
    setData(pokemons)
  })
  const handleClick = (item) => { 
    setShow([item.data])
   }

  return (
    <div className="pokemon">
        {
            show
            .map((pokemon,index) => {
                return (
                    <div className="pokemon_view" key={index}>
                    <img className="pokemon-view-img" src={pokemon.sprites.front_default} alt="" />
                    <div className="pokemon-info">
                        <div className="pokemon_name">
                            <b>{pokemon.name}</b>
                        </div>
                        <div className="pokemon_stats">
                        <span>attack: {pokemon.stats[1].base_stat}</span>
                        <span>hp: {pokemon.stats[0].base_stat}</span>
                        <span>speed: {pokemon.stats[5].base_stat}</span>
                        <span>defence: {pokemon.stats[3].base_stat}</span>
                        <span>type: {pokemon.types[0].type.name}</span>
                        </div>
                    </div>
                </div>
                )
            })
        }

        <div className="pokemons_wrap">
        {data
        .filter((type) => {
            return value.toLowerCase() === ""
            ? type
            : type.data.name.toLowerCase().includes(value)
        })
        .map((item) => {
        return (
            <div className="card" onClick={() => handleClick(item)}>
            <h3>{item.data.name}</h3>
            <img
              src={item.data.sprites.front_default}
              alt=""
            />
          </div>
        )
      })}
        </div>

    </div>
  );
};

export default Pokemon;
