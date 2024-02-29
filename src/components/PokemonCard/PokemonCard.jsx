/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./Pokemon.module.css";
import PokemonDetail from "../PokemonDetail/PokemonDetail";
import { Link } from "react-router-dom";
const PokemonCard = ({ pokemon }) => {
  const [loading, setLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState();
  const [modal, setModal] = useState(false);
  const getOnePok = async () => {
    try {
      const response = await axios.get(pokemon?.url);
      setPokemonData(response.data);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    setLoading(true);
    getOnePok();
  }, []);

  return (
    <>
    
      <div className={styles.pokemon_card}>
        <Link className={styles.link} to={`pokemon/${pokemonData?.id}`}>
          <div className={styles.pokemon_card_image}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
                pokemonData ? pokemonData?.id : null
              }.svg`}
              alt=''
            />
          </div>
          <p>{pokemon.name}</p>
        </Link>
      </div>
      {modal ? (
        <PokemonDetail
          pokemonDetail={pokemon}
          modal={modal}
          setModal={setModal}
        />
      ) : null}
    </>
  );
};

export default PokemonCard;
