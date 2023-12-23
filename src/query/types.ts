export interface Moves {
  move: {
    name: string;
  };
}
export interface Types {
  type: {
    name: string;
  };
}

export interface Pokemon {
  id?: number;
  name: string;
  moves?: Moves[];
  types?: Types[];
  image?: string;
  nickname?: string;
}

interface PokemonResult {
  count: number;
  nextOffset: number;
  prevOffset: number;
  results: Pokemon[];
}

export interface PokemonData {
  pokemons: PokemonResult;
}

export interface PokemonDetail {
  pokemon: Pokemon;
}

export interface PokemonVars {
  limit?: number;
  offset?: number;
  name?: string;
}
