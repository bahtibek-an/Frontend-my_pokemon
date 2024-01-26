// Main.jsx

import React, { useEffect, useState } from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import SearchBar from "./SearchBar"; // Добавлено

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();
  const [searchQuery, setSearchQuery] = useState(''); // Добавлено

  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results);
    setLoading(false);
  };

  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setPokeData((state) => {
        state = [
          ...state,
          {
            ...result.data,
            key: result.data.id,
          },
        ];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };

  useEffect(() => {
    pokeFun();
  }, [url]);

  // Добавлен обработчик для поиска
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <div className="search-bar">
        {/* Передаем функцию для обработки поиска в SearchBar */}
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="container">
          <Card
            pokemon={pokeData.filter(pokemon => pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()))}
            loading={loading}
            infoPokemon={(poke) => setPokeDex(poke)}
          />

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
          <Pokeinfo data={pokeDex} />
      </div>
    </>
  );
};

export default Main;
