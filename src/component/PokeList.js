import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import './PokeList.css';
function PokeList({ searchQuery }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const featchApi = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1400');
        const results = response.data.results;
        const pokemondetals = await Promise.all(results.map(async (pokemon) => {
          const detailsResponse = await axios.get(pokemon.url);
          return detailsResponse.data;
        }));
        setPokemonList(pokemondetals);
      } catch (error) {
        console.error('Error Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };
    featchApi();
  }, []);

  const filteredPokemonList = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  if (loading) {
    return <div className="load">Loading...</div>;
  }

  return (
    <div className="container2">
      {filteredPokemonList.map((pokemon) => (
        <div className="min" key={pokemon.name}>
          <Link to={`/box/${pokemon.name}`}>
            {pokemon.name}
            {pokemon.sprites && pokemon.sprites.front_default && (
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            )}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default PokeList;
