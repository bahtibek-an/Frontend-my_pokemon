import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Component/Navbar/Navbar';
import PokemonDetailPage from './Component/DetailPage/PokemonDetailPage';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
    };
  }

  componentDidMount() {
    this.getPokemons();
  }

  getPokemons = () => {
    const endpoints = [];
    for (let i = 1; i < 201; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }

    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => {
      this.setState({ pokemons: res });
    });
  };

  pokemonFilter = (name) => {
    let filteredPokemons = [];
    const { pokemons } = this.state;

    if (name === "") {
      this.getPokemons();
    }

    for (let i in pokemons) {
      if (pokemons[i].data.name.includes(name)) {
        filteredPokemons.push(pokemons[i]);
      }
    }

    this.setState({ pokemons: filteredPokemons });
  };

  render() {
    const { pokemons } = this.state;

    return (
      <div>
        <Navbar pokemonFilter={this.pokemonFilter} />
        {pokemons.map((pokemon) => (
          <PokemonDetailPage
            key={pokemon.data.id}
            id={pokemon.data.id}
            name={pokemon.data.name}
            image={pokemon.data.sprites.front_default}
            hp={pokemon.data.stats[0].base_stat}
            attack={pokemon.data.stats[1].base_stat}
            defense={pokemon.data.stats[2].base_stat}
            types={pokemon.data.types[0].type.name}
            species={pokemon.data.species.name}
            speed={pokemon.data.stats[0].base_stat}
            spattack={pokemon.data.stats[3].base_stat}
            spaddeffens={pokemon.data.stats[4].base_stat}
            weight={pokemon.data.weight}
            height={pokemon.data.height}
            base_experience={pokemon.data.base_experience}
            game_index={pokemon.data.game_indices[0].game_index}
            move={pokemon.data.moves[0].move.name}
          />
        ))}
      </div>
    );
  }
}

export default App;
