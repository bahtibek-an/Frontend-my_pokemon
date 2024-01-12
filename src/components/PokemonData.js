import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import "./PokemonData.css"; // Import your CSS file

const PokemonData = ({ pokemonId }) => {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const pokemon = response.data;
        setPokemonData(pokemon);
      } catch (error) {
        console.error('Error fetching Pokemon data', error);
      }
    };

    fetchPokemonData();
  }, [pokemonId]);

  if (!pokemonData) {
    return null;
  }

  const name = pokemonData.name;

  const movesList = pokemonData.moves
    ? (
      <ul className="moves-list">
        {pokemonData.moves.map((move, index) => (
          <li key={index}>{move.move.name}</li>
        ))}
      </ul>
    )
    : null;

  const imageUrl = pokemonData.sprites ? pokemonData.sprites.front_default : "";

  const typesList = pokemonData.types ? pokemonData.types.map(type => type.type.name).join(", ") : "";

  const formList = pokemonData.forms
    ? (
      <ul className="form-list">
        {pokemonData.forms.map((form, index) => (
          <li key={index}><p>{form.name}</p></li>
        ))}
      </ul>
    )
    : null;

  const speed = pokemonData.stats ? pokemonData.stats.find(stat => stat.stat.name === "speed").base_stat : null;
  const weight = pokemonData.weight;
  const height = pokemonData.height;
  const baseExperience = pokemonData.base_experience;
  const abilitiesList = pokemonData.abilities ? pokemonData.abilities.map(ability => ability.ability.name).join(", ") : "";

  return (
    <div className="pokemon-container">
      <div className="pokemon-info">
        <div className="pokemon-details">
          <img src={imageUrl} alt={name} className="pokemon-image" />
          <div className="type-details">
          <p style={{ fontSize: '25px'}}>{name}</p>
            <div className="type-info">
            
              <Typography variant="subtitle1">Type: {typesList}</Typography>
              <Typography variant="subtitle1">Speed: {speed}</Typography>
              <Typography variant="subtitle1">Weight: {weight}</Typography>
              <Typography variant="subtitle1">Height: {height}</Typography>
              <Typography variant="subtitle1">Base Experience: {baseExperience}</Typography>
            </div>
          </div>
          <a href="/" style={{ backgroundColor: 'blue', padding: '5px', borderRadius: '5px', marginTop: '10px', width: '100%', color: '#fff', textAlign: 'center'}}>Back</a>

        </div>
      </div>
    </div>
  );
}

export default PokemonData;
