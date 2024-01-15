import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Details.css";

const Details = ({ pokemons }) => {
  const { id } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const foundPokemon = pokemons.find((pokemon) => String(pokemon.id) === id);

    if (foundPokemon) {
      setPokemonDetails(foundPokemon);
    } else {
      fetchPokemonDetails();
    }
  }, [id, pokemons]);

  const fetchPokemonDetails = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      setPokemonDetails(response.data);
    } catch (error) {
      console.error("Error fetching Pokemon details:", error);
    }
  };

  if (!pokemonDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="details-container">
      <h2 className="details-heading">{pokemonDetails.name}</h2>
      <img
        className="details-image"
        src={pokemonDetails.sprites.front_default}
        alt={pokemonDetails.name}
      />
      <div className="details-info">
        <p>
          <strong>ID:</strong> {pokemonDetails.id}
        </p>
        <p>
          <strong>Type:</strong>{" "}
          {pokemonDetails.types.map((type) => type.type.name).join(", ")}
        </p>
        <p>
          <strong>Height:</strong> {pokemonDetails.height}
        </p>
        <p>
          <strong>Weight:</strong> {pokemonDetails.weight}
        </p>
        <p>
          <strong>Base Experience:</strong> {pokemonDetails.base_experience}
        </p>
        <p>
          <strong>Abilities:</strong>{" "}
          {pokemonDetails.abilities
            .map((ability) => ability.ability.name)
            .join(", ")}
        </p>
        <a
          href="/"
          style={{
            backgroundColor: "blue",
            color: "#fff",
            textDecoration: "none",
            padding: "6px",
            width: '45px',
            borderRadius: "5px",
          }}
        >
          Back
        </a>
      </div>
    </div>
  );
};

export default Details;
