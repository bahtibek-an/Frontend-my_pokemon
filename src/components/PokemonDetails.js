import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import './PokemonDetails.css';

const PokemonDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        setPokemonDetails(response.data);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
        setPokemonList(response.data.results);
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    };

    fetchPokemonList();
  }, []);

  const handleBackToList = () => {
    history.push('/');
  };

  const findPokemonIndex = () => {
    return pokemonList.findIndex(pokemon => pokemon.name === id);
  };

  const handlePreviousPokemon = () => {
    const currentIndex = findPokemonIndex();
    if (currentIndex > 0) {
      const previousPokemonId = pokemonList[currentIndex - 1].name;
      history.push(`/pokemon/${previousPokemonId}`);
    }
  };

  const handleNextPokemon = () => {
    const currentIndex = findPokemonIndex();
    if (currentIndex < pokemonList.length - 1) {
      const nextPokemonId = pokemonList[currentIndex + 1].name;
      history.push(`/pokemon/${nextPokemonId}`);
    }
  };

  if (!pokemonDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pokemon-details">
      <h1>{pokemonDetails.name}</h1>
      <img className="pokemon-image" src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
      <p>Weight: {pokemonDetails.weight}</p>
      <p>Height: {pokemonDetails.height}</p>
      <p>Types: {pokemonDetails.types.map(type => type.type.name).join(', ')}</p>
      <p>Abilities: {pokemonDetails.abilities.map(ability => ability.ability.name).join(', ')}</p>
      {/* Другие дополнительные данные о покемоне */}
      <div className="navigation-buttons">
        <button onClick={handlePreviousPokemon}>Previous Pokemon</button>
        <button onClick={handleBackToList}>Back to List</button>
        <button onClick={handleNextPokemon}>Next Pokemon</button>
      </div>
    </div>
  );
}

export default PokemonDetails;
