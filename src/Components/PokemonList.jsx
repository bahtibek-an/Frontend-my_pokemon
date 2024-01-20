import React, { useEffect, useState } from "react";
import Pokemon from "./Pokemon";
import axios from "axios";
import "./PokemonList.css";
import './Header.css'
const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [search,setSearch] = useState("");
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
      .then((res) => {
        const pokemon = res.data.results;
        const promise = pokemon.map((item) => axios.get(item.url));
        axios
          .all(promise)
          .then((res) => {
            
            setPokemons(res);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [pokemons]);

  const prevClick = () => {
    if(offset >= 20){
      setOffset((setOffset) => setOffset - 20)
    }
  }
  const nextClick = () => {
    setOffset(offset + 20)
  }
  return (
    <div className="pokemons-wrap">
      
      <header className="header">
        <h1>Pokemon App</h1>
        <div className="search_panel">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

      </header>
      <Pokemon pokemons={pokemons} value={search}/>
      <div className="btns_wrap">
      <button className="prev" onClick={prevClick} disabled={offset === 0}>Previous</button>
      <button className="next" onClick={nextClick}>Next</button>
      </div>
       
    </div>
  );
};

export default PokemonList;
