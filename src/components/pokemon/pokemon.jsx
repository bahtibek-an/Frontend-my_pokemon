import { Link, useParams } from "react-router-dom";
import "./pokemon.css";
import axios from "axios";
import { useEffect, useState } from "react";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchPokemonStats = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        console.log(response);
        setPokemon(response.data);
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemonStats();
  }, [id]);

  return (
    <div className="poke">
      {loading ? (
        <div className="content">
          <div className="pokeStats">
            <Link to={"/"}>
              <button>Back</button>
            </Link>
            <p>{id} #</p>
            <img src={pokemon.sprites?.front_default} alt="" />
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
      ) : (
        <div className="loader">
          <h1>Loading...</h1>
          <div className="loader__spinner"></div>
        </div>
      )}
    </div>
  );
};

export default Pokemon;
