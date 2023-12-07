import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Spin, Tabs } from "antd";

import "../style/About_Poke.css";

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
        <div className="about-pokemon-cards">
          <div className="about-pokemon-card-left">
            <div className="about-left container">
              <img src={data.image} alt={data.name} />
              <h2>{data.name}</h2>
              <Link to="/">
                <h4>Back Home</h4>
              </Link>
            </div>
          </div>
          <div className="pokemon_character">
            <Tabs defaultActiveKey="1">
              <div tab="Pokemon Character">
                <span className="stats">
                  Stats Name:</span> 
                  
                  {data.statsName.join(", ")} <br />
                
                <span className="types"><br />
                  Types: </span> 
                  
                  {data.types.join(", ")} <br />
                  
                <span className="moves"><br />
                  Moves: </span> 
                  
                  {data.moves.join(", ")} <br />
                 
                <span className="abilities"><br />
                  Abilities: </span> 
                  
                  {data.abilities.join(", ")} <br />
                  
                <span className="stats_res"> <br />
                Stats Res: </span> 
                
                {data.statsRes.join(", ")}
                   <br />
                
              </div>

              {/* <TabPane tab="Types" key="2">
                <span>Types: {data.types.join(", ")}</span>
              </TabPane>

              <TabPane tab="Moves" key="3">
                <span>Moves: {data.moves.join(", ")}</span>
              </TabPane>

              <TabPane tab="Abilities" key="4">
                <span>Abilities: {data.abilities.join(", ")}</span>
              </TabPane> */}
            </Tabs>
          </div>
        </div>
      )}
      
    </section>
  );
};

export default About_Poke;
