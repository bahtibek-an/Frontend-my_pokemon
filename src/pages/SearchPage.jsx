import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CardPokemon } from '../components';
import { PokemonContext } from '../context/PokemonContext';

export const SearchPage = () => {
  const location = useLocation();
  const { globalPokemons } = useContext(PokemonContext);

  // тут проверяетсяя ааа
  const searchQuery = location.state ? location.state.toLowerCase() : '';

  // а тут фильтруеться под поисковым запросом 
  const filteredPokemons = globalPokemons.filter(pokemon =>
    pokemon.name.includes(searchQuery)
  );

  // если точный названия ёлилса чикарамиз если нет то шутпшопкщоащуктп
  const searchResults = filteredPokemons.length > 0 ? (
    <div className='card-list-pokemon container'>
      {filteredPokemons.map(pokemon => (
        <CardPokemon pokemon={pokemon} key={pokemon.id} />
      ))}
    </div>
  ) : (
    <p>No results found. Please enter a search query.</p>
  );

  return (
    <div className='container'>
      <p className='p-search'>
        found <span>{filteredPokemons.length}</span> results
      </p>
      {searchResults}
    </div>
  );
};