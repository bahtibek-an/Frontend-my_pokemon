import React, { useState, useEffect, Fragment } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

import { Pagination, Spin, Empty, Button } from "antd";

import "../style/Pokemon.css";

import pokeBall from "../../assets/pokeball.ico";

const Pokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = bodyStyle.backgroundColor;
  }, [darkMode]);

  const bodyStyle = {
    backgroundColor: darkMode ? "#333" : "#fff",
  };

  useEffect(() => {
    setLoading(true);
    const offset = (page - 1) * 12;
    const limit = 12;

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
      .then(async (response) => {
        const updatedPokemonList = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const pokemonResponse = await axios.get(pokemon.url);
            return pokemonResponse.data;
          })
        );

        const filteredPokemonList = updatedPokemonList.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setPokemonList(filteredPokemonList);
        setNextPageUrl(response.data.next);
        setLoading(false);
      });
  }, [page, searchTerm]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const getPokemonImage = (pokemon) => {
    if (pokemon.sprites.other.dream_world.front_default) {
      return pokemon.sprites.other.dream_world.front_default;
    } else if (pokemon.sprites.other["dream_world"].front_default) {
      return pokemon.sprites.other["dream_world"].front_default;
    } else {
      return "fallback-image-url.jpg";
    }
  };

  return (
    <Fragment>
      <header style={{ backgroundColor: darkMode ? "#333" : "#f6f0ed" }}>
        <div className="container">
          <div className="pokemon-header">
            <img src={pokeBall} alt="logo" style={{ width: "70px" }} />
            <h3 style={{ color: darkMode ? "#f6f0ed" : "#333" }}>Pokedex</h3>
            <button onClick={() => setDarkMode(!darkMode)}>
              <i
                className={`fa-solid ${darkMode ? "fa-sun" : "fa-moon"}`}
                style={{
                  fontSize: "30px",
                  color: darkMode ? "white" : "black",
                }}
              ></i>
            </button>
          </div>
        </div>
      </header>
      <main>
        <div className="container">
          <div
            className="pokemon-search"
            style={{ textAlign: "center", paddingBottom: "35px" }}
          >
            <input
              placeholder="Search Pokemon"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="pokemon-cards">
            {loading ? (
              <div className="loading-spinner">
                <Spin size="large" />
              </div>
            ) : pokemonList.length > 0 ? (
              pokemonList.map((pokemon, index) => (
                <Link to={`/pokemon/${pokemon.id}`}>
                  <div
                    className="pokemon-card"
                    key={index}
                    style={{
                      backgroundColor: darkMode ? "#f6f0ed" : "#1e1e1e",
                    }}
                  >
                    <div>
                      <h3 style={{ color: darkMode ? "#333" : "#fff" }}>
                        {pokemon.name}
                      </h3>
                      <div>
                        {pokemon.types.map((t, index) => (
                          <button key={index}>{t.type.name}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <img src={getPokemonImage(pokemon)} alt="" />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <Empty className="empty-antd" description="No Pokemon" />
            )}
          </div>
          {pokemonList.length > 0 && (
            <div className="pagination">
              <Pagination
                current={page}
                total={1281}
                pageSize={12}
                onChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </main>
    </Fragment>
  );
};

export default Pokemon;
