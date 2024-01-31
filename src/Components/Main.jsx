// Main.js
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import "./style.css";

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [searchPokeData, setSearchPokeData] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState(null);

  const pokeFun = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setNextUrl(res.data.next);
      setPrevUrl(res.data.previous);
      getPokemon(res.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  };

  const getPokemon = async (pokemonList) => {
    try {
      const pokemonData = await Promise.all(
        pokemonList.map(async (poke) => {
          const result = await axios.get(poke.url);
          return result.data;
        })
      );
      setPokeData(pokemonData);
      setSearchPokeData(pokemonData);
    } catch (error) {
      console.error("Error fetching individual Pokemon data:", error);
    }
  };

  useEffect(() => {
    pokeFun();
  }, [url]);

  useEffect(() => {
    if (input.trim().length === 0) {
      setSearchPokeData(pokeData);
    } else {
      setSearchPokeData((prev) =>
        prev.filter((item) =>
          item.name.toLowerCase().includes(input.trim().toLowerCase())
        )
      );
    }
  }, [input, pokeData]);

  if (pokeDex !== null) {
    return <Pokeinfo data={pokeDex} closePage={() => setPokeDex(null)} />;
  }

  return (
    <>
      <div className="container">
        <div className="App">
          <h1 className="poki">Pokemon</h1>
          <div className="Poke-Api">
            <input
              value={input}
              type="text"
              placeholder="Search Pokemon..."
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>
        <div className="pokemon__list-container">
          {searchPokeData.map((poke) => (
            <Card
              key={poke.id}
              pokemon={poke}
              loading={loading}
              infoPokemon={(item) => setPokeDex(item)}
            />
          ))}
        </div>
        <div className="btn-group">
          {prevUrl && (
            <button
              onClick={() => {
                setPokeData([]);
                setUrl(prevUrl);
              }}
            >
              Previous
            </button>
          )}

          {nextUrl && (
            <button
              onClick={() => {
                setPokeData([]);
                setUrl(nextUrl);
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Main;
