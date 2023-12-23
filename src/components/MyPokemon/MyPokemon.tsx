import { createContext, useState, useContext } from "react";
import {
  PokemonProviderContextState,
  PokemonProviderProps,
  RemovePokemonType,
  CreatePokemonType,
} from "./types";

const PokemonContext = createContext({} as PokemonProviderContextState);

const storageKey = "my-pokemon";

export function PokemonProvider({ children }: PokemonProviderProps) {
  const [data, setData] = useState(() => {
    const pokemons = localStorage.getItem(storageKey);
    return pokemons !== null ? JSON.parse(pokemons) : null;
  });

  const create: CreatePokemonType = (nickname, pokemon) => {
    if (!nickname || !pokemon) {
      throw new Error("Nickname required");
    }
    if (data?.[nickname]) {
      throw new Error("Nickname already exist, use different name");
    }
    const toBeSaved = { [nickname]: pokemon, ...(data || {}) };
    localStorage.setItem(storageKey, JSON.stringify(toBeSaved));
    setData(toBeSaved);
    return true;
  };

  const remove: RemovePokemonType = (nickname) => {
    const toBeSaved = { ...data };
    if (!nickname || !toBeSaved[nickname]) {
      throw new Error("Pokemon not found");
    }
    delete toBeSaved[nickname];
    if (!Object.keys(toBeSaved).length) {
      localStorage.removeItem(storageKey);
      setData(null);
    } else {
      localStorage.setItem(storageKey, JSON.stringify(toBeSaved));
      setData(toBeSaved);
    }
  };

  const dataAsArray = Object.keys(data || {}).map((item) => ({
    ...data[item],
    nickname: item,
  }));

  return (
    <PokemonContext.Provider value={{ data, dataAsArray, create, remove }}>
      {children}
    </PokemonContext.Provider>
  );
}

export const usePokemon = () => {
  const state = useContext(PokemonContext);
  return state;
};
