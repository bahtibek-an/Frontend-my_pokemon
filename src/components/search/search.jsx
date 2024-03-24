import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./search.css";

const Search = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setPokemon(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading) {
    return <div className="searchPoke">Loading...</div>;
  }

  const { name, sprites } = pokemon;

  return (
    <div className="searchPoke">
      <div className="content">
        <div className="pokeStats">
          <Link to={"/"}>
            <button className="btn btn-success">Back</button>
          </Link>
          {sprites && sprites.front_default && (
            <div id="pokemon">
              <h1>{name}</h1>
              <img src={sprites.front_default} alt="Pokemon" />
            </div>
          )}
          <div className="pokemonStats">
            <p>HP: {pokemon.stats?.[2]?.base_stat}</p>
            <p>Attack: {pokemon.stats?.[3]?.base_stat}</p>
            <p>Defense: {pokemon.stats?.[1]?.base_stat}</p>
            <p>Sp.Atk: {pokemon.stats?.[5]?.base_stat}</p>
            <p>Sp.Def: {pokemon.stats?.[4]?.base_stat}</p>
            <p>Speed: {pokemon.stats?.[0]?.base_stat}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
