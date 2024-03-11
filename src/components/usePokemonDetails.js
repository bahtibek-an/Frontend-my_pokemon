// usePokemonDetails.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const usePokemonDetails = (id) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);

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

  return pokemonDetails;
};

export default usePokemonDetails;
