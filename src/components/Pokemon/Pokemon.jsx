import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Spin } from "antd";
import "./Pokemon.scss";

const Pokemon = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    id: "",
    name: "",
    stats: [],
    types: [],
    moves: [],
    abilities: [],
    image: "",
  });

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

  const [loading, setLoading] = useState(true);

  let count = 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const pokemonData = response.data;

        const stats = pokemonData.stats.map((stat) => stat);
        const types = pokemonData.types.map((type) => type.type.name);
        const moves = pokemonData.moves.map((move) => move.move.name);
        const abilities = pokemonData.abilities.map(
          (ability) => ability.ability.name
        );

        setData({
          id: pokemonData.id,
          name: pokemonData.name,
          stats,
          types,
          moves,
          abilities,
          image: getPokemonImage(pokemonData),
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const getPokemonImage = (pokemon) => {
    if (pokemon.sprites.other.dream_world.front_default) {
      return pokemon.sprites.other.dream_world.front_default;
    } else if (pokemon.sprites.other["dream_world"].front_default) {
      return pokemon.sprites.other["dream_world"].front_default;
    } else {
      return "fallback-image-url.jpg";
    }
  };

  console.log(data.types[0]);

  return (
    <section id="pokemon">
      {loading ? (
        <div className="loading_spinner">
          <Spin size="large" />
        </div>
      ) : (
        <div className="pokemon_info">
          <div
            className="pokemon_info_head"
            style={{ backgroundColor: colours[data.types[0]] }}
          >
            <div className="head_container container">
              <Link to="/">
                <h4>◄ Back</h4>
              </Link>
              <h2>{data.name}</h2>
              <img src={data.image} alt={data.name} />
            </div>
          </div>
          <div className="container pokemon_info_main">
            <div className="cards">
              <div
                className="card"
                style={{ backgroundColor: colours[data.types[0]] }}
              >
                <h1>Stats</h1>
                {data.stats.map((el) => (
                  <ul key={count++}>
                    <li>
                      {el.stat.name}: {el.base_stat};
                    </li>
                  </ul>
                ))}
              </div>
              <div
                className="card"
                style={{ backgroundColor: colours[data.types[0]] }}
              >
                <h1>Types</h1>
                {data.types.map((el) => (
                  <ul key={count++}>
                    <li>{el};</li>
                  </ul>
                ))}
              </div>
              <div
                className="card"
                style={{ backgroundColor: colours[data.types[0]] }}
              >
                <h1>Moves</h1>
                {data.moves.map((el) => (
                  <ul key={count++}>
                    <li>{el};</li>
                  </ul>
                ))}
              </div>
              <div
                className="card"
                style={{ backgroundColor: colours[data.types[0]] }}
              >
                <h1>Abilities</h1>
                {data.abilities.map((el) => (
                  <ul key={count++}>
                    <li>{el};</li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Pokemon;
