import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Spin, Tabs } from "antd";

import "../style/overlook.css";

const { TabPane } = Tabs;

const About_Poke = () => {
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

  return (
    <section className="pokemon-about">
      {loading ? (
        <div className="loading-spinner-about">
          <Spin size="large" />
        </div>
      ) : (
        <div className="about-pokemon-charts">
          <div className="about-pokemon-chart-left">
            <div className="about-left container">
              <img src={data.image} alt={data.name} />
              <h2>{data.name}</h2>
              <Link to="/">
                <h4>Outing</h4>
              </Link>
            </div>
          </div>
          <div className="pokemon_sort">
            <Tabs defaultActiveKey="1">
              <div tab="Pokemon Sort">
                <span className="pokemon-stats">
                  Stats Name:</span> 
                  
                  {data.statsName.join(", ")} <br />
                
                <span className="pokemon-types"><br />
                  Types: </span> 
                  
                  {data.types.join(", ")} <br />
                  
                <span className="pokemon-moves"><br />
                  Moves: </span> 
                  
                  {data.moves.join(", ")} <br />
                 
                <span className="pokemon-abilities"><br />
                  Abilities: </span> 
                  
                  {data.abilities.join(", ")} <br />
                  
                <span className="pokemon-stats_res"> <br />
                Stats Res: </span> 
                
                {data.statsRes.join(", ")}
                   <br />
                
              </div>
            </Tabs>
          </div>
        </div>
      )}
      
    </section>
  );
};

export default About_Poke;
