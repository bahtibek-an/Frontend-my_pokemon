import React, { Component } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import SearchBar from './PokemonSearchBar';

export default class PokemonList extends Component {
  state = {
    url: "https://pokeapi.co/api/v2/pokemon",
    pokemon: null,
    searchQuery: "", // Initialize searchQuery
  };

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ pokemon: res.data['results'] });
  }

  // Define the handleSearch method to update the searchQuery state
  handleSearch = (value) => {
    this.setState({ searchQuery: value });
  };

  render() {
    const { pokemon, searchQuery } = this.state;

    // Filter the Pokemon based on the search query
    const searchResults = pokemon ? pokemon.filter(p => p.name.includes(searchQuery.toLowerCase())) : [];

    return (
      <React.Fragment>
        <div>
          <SearchBar onSearch={this.handleSearch} />
          {pokemon ? (
            <div className="row">
              {searchResults.map(pokemon => ( // Updated the variable name here
                <PokemonCard
                  key={pokemon.name}
                  name={pokemon.name}
                  url={pokemon.url}
                />
              ))}
            </div>
          ) : (
            <h1>Loading Pokemon</h1>
          )}
        </div>
      </React.Fragment>
    );
  }
}
