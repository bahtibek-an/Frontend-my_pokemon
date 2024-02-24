import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PokemonContext } from "../../components/PokemonContext/PokemonContext";
import "./PokemonDetails.css"; // Import your CSS file

const PokemonDetails = () => {
  const { getPokemonById } = useContext(PokemonContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState({});

  const fetchPokemon = async (id) => {
    const data = await getPokemonById(id);
    setPokemon(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemon(id);
  }, []);

  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <div className="pokemon-details-container">
          <div className="header-container">
            <Link to='/' className="back-link">
              ← Back
            </Link>
            <div key={pokemon.id} className="pokemon-name">
              {pokemon?.name?.toUpperCase()}
            </div>
            <div className="pokemon-id">#{pokemon?.id}</div>
          </div>
          <div className="types-container">
            {pokemon.types?.map((type) => (
              <span
                key={type.type.name}
                className={`type-badge ${type.type.name}`}
              >
                {type.type.name}
              </span>
            ))}
          </div>
          <div className="image-container">
            <img
              className="pokemon-image"
              alt={pokemon?.name}
              src={pokemon?.sprites?.other.dream_world.front_default}
            />
          </div>
          <div className="about-container">
            <div className="about-section">
              <h1 className="about-heading">About</h1>
              <div className="about-details">
                <div>
                  <h4>Species</h4>
                  <h4 className="">{pokemon?.species?.name}</h4>
                </div>
                <div>
                  <h4>Height</h4>
                  <h4 className="">{pokemon?.height}m</h4>
                </div>
                <div>
                  <h4>Weight</h4>
                  <h4 className="">{pokemon?.weight}kg</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonDetails;
