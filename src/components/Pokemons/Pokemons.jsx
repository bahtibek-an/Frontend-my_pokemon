import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Pagination, Spin, Empty } from "antd";
import "./Pokemons.scss";
import { Link } from "react-router-dom";

const Pokemons = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchLet, setSearchLet] = useState("");
  const colours = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };

  useEffect(() => {
    setLoading(true);
    const offset = (page - 1) * 20;
    const limit = 20;

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
          pokemon.name.toLowerCase().includes(searchLet.toLowerCase())
        );

        setPokemonList(filteredPokemonList);
        setLoading(false);
      });
  }, [page, searchLet]);

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
      <header>
        <div className="container">
          <div className="head_inner">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
              alt=""
            />
            <input
              placeholder="Search Pokemon"
              value={searchLet}
              onChange={(e) => setSearchLet(e.target.value)}
            />
          </div>
        </div>
      </header>
      <main className="main">
        <div className="container">
          <div className="main_cards">
            {loading ? (
              <div className="loading_spinner">
                <Spin />
              </div>
            ) : pokemonList.length > 0 ? (
              pokemonList.map((pokemon) => (
                <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
                  <div
                    className="main_card"
                    style={{
                      backgroundColor: colours[pokemon.types[0].type.name],
                    }}
                  >
                    <div className="card_left">
                      <h3>{pokemon.name}</h3>
                      <div>
                        {pokemon.types.map((t, index) => (
                          <button key={index}>{t.type.name}</button>
                        ))}
                      </div>
                    </div>
                    <div className="card_right">
                      <img src={getPokemonImage(pokemon)} alt="" />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <Empty className="empty" description="Not Found" />
            )}
          </div>
          {pokemonList.length > 0 && (
            <div className="pagination">
              <Pagination
                current={page}
                total={638}
                pageSize={20}
                onChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </main>
    </Fragment>
  );
};

export default Pokemons;
