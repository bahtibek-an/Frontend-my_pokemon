/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./PokemonDetail.module.css";
import { Spin } from "antd";

const PokemonDetail = () => {
  var { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState();
  const [loading, setLoading] = useState(false);
  const getPokemonWithId = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      setPokemon(response.data);
      setLoading(false);

      return;
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    setLoading(true);
    getPokemonWithId();
  }, []);
  console.log(loading);
  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <>
          <div className={styles.pokemon}>
            <div className={styles.back_page} onClick={() => navigate(-1)}>
              ← Back
            </div>
            <div className={styles.pokemon_detail}>
              <div className={styles.pokemon_image}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
                    pokemon ? pokemon.id : null
                  }.svg`}
                  alt=''
                />
              </div>
              <div style={{ padding: "10px" }}>
                <div className='ability'>
                  <h1>Abilities</h1>
                  {pokemon?.abilities.map((el, index) => (
                    <p key={index} className='ability-item'>
                      {el.ability.name}
                    </p>
                  ))}
                </div>
                <div className='stats'>
                  <h2>Stats</h2>
                  <ul style={{ listStyle: "none" }}>
                    {pokemon?.stats?.map((item, index) => (
                      <li key={index} className='stats-item'>
                        {item.stat.name}: {item.base_stat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PokemonDetail;
