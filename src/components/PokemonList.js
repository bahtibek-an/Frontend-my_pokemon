import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './PokemonList.css';

const PokemonList = ({ pokemonList }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pokemonListState, setPokemonList] = useState(pokemonList); // Добавляем pokemonListState для хранения списка покемонов
  const history = useHistory();

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${(currentPage - 1) * 20}`);
        setPokemonList(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 20));
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    };

    fetchPokemonList();
  }, [currentPage, setPokemonList]); // Добавляем setPokemonList в массив зависимостей

  const handlePokemonClick = (pokemon) => {
    const pokemonName = pokemon.name.toLowerCase();
    history.push(`/pokemon/${pokemonName}`);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="pokemon-list">
      {pokemonListState.map((pokemon) => (
        <div key={pokemon.name} className="pokemon-card" onClick={() => handlePokemonClick(pokemon)}>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/').slice(-2, -1)}.png`} alt={pokemon.name} />
          <div className="pokemon-name">{pokemon.name}</div>
        </div>
      ))}
      <div className="pagination">
        <button onClick={handlePrevPage}>Prev</button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default PokemonList;
