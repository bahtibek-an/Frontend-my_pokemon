import React, { useEffect, useState } from "react";
import "./Pokemon.css";
import PokemonWiew,{set} from "./PokemonWiew";
import { useNavigate } from "react-router-dom";
const Pokemon = ({ pokemons ,value}) => {
  const [data,setData] = useState([]);
  const [show,setShow] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setData(pokemons)
  })
  const handleClick = (item) => { 
    setShow([item.data])
    console.log("item",item);
    navigate(`/pokemon/${item.data.name}`)
   }

  return (
    <div className="pokemon">
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
