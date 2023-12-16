import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Progress, Spin } from "antd";

import "../style/AboutPokemon.css";

import pokeBall from "../../assets/pokeball.ico";

const AboutPokemon = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    id: "",
    name: "",
    statsName: [],
    statsRes: [],
    types: [],
    moves: [],
    abilities: [],
    height: "",
    weight: "",
    exp: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const pokemonData = response.data;

        const statsName = pokemonData.stats.map((stat) => stat.stat.name);
        const statsRes = pokemonData.stats.map((stat) => stat.base_stat);
        const types = pokemonData.types.map((type) => type.type.name);
        const moves = pokemonData.moves.map((move) => move.move.name);
        const abilities = pokemonData.abilities.map(
          (ability) => ability.ability.name
        );

        setData({
          id: pokemonData.id,
          name: pokemonData.name,
          statsName,
          statsRes,
          types,
          moves,
          abilities,
          height: pokemonData.height,
          weight: pokemonData.weight,
          exp: pokemonData.base_experience,
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

  const twoColors = {};

  const progressComponents = data.statsRes.map((value, index) => (
    <div key={index} style={{ textAlign: "center" }}>
      <Progress
        type="circle"
        percent={value}
        strokeColor={twoColors[index % twoColors.length]}
        width={100}
      />
      <span
        style={{
          color: "#fff",
          fontSize: "14px",
          position: "relative",
          bottom: "-30px",
          textTransform: "capitalize",
        }}
      >
        {data.statsName[index]}
      </span>
    </div>
  ));

  return (
    <section className="pokemon-about">
      {loading ? (
        <div className="loading-spinner-about">
          <Spin size="large" />
        </div>
      ) : (
        <Fragment>
          <header className="about-poke-header">
            <div className="container">
              <div className="about-poke-link">
                <Link to="/" style={{ cursor: "pointer", color: "red" }}>
                  <i
                    style={{ fontSize: "30px" }}
                    class="fa-solid fa-arrow-left"
                  ></i>
                </Link>
                <h3 style={{ textTransform: "capitalize" }}>{data.name}</h3>
                <img src={pokeBall} alt="logo" style={{ width: "70px" }} />
              </div>
            </div>
          </header>
          <main>
            <div className="container">
              <div className="about-poke-img-txt">
                <div className="about-poke-img-txt-left">
                  <img src={data.image} style={{ width: "250px" }} alt="img" />
                </div>
                <div className="about-poke-img-txt-right">
                  <h2 style={{ color: "#fff" }}>Name</h2> <br />
                  <div
                    className="progress-box-left"
                    style={{ display: "flex", gap: "10px" }}
                  >
                    {progressComponents}
                  </div>
                </div>
              </div>
              <center>
                <div className="pokedex-abilities">
                  {data.abilities.map((ability, index) => (
                    <button key={index} className="ability-button">
                      {ability}
                    </button>
                  ))}
                </div>
              </center>
            </div>
          </main>
        </Fragment>
      )}
    </section>
  );
};

export default AboutPokemon;
