import React, { useEffect, useState } from "react";
import { PokemonContext } from "./PokemonContext";

const PokemonProvider = ({ children }) => {
  const [globalPokemons, setGlobalPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [typeSelected, setTypeSelected] = useState([
    {
      grass: false,
      normal: false,
      fighting: false,
      flying: false,
      poison: false,
      ground: false,
      rock: false,
      bug: false,
      ghost: false,
      steel: false,
      fire: false,
      water: false,
      electric: false,
      psychic: false,
      ice: false,
      dragon: false,
      dark: false,
      fairy: false,
      unknown: false,
      shadow: false,
    },
  ]);
  const [offset, setOffset] = useState(0);
  const [allPokemons, setAllPokemons] = useState([]);

    const handleResetForm = () => {
      setFormState(initialForm);
    };

    const handleSubmit = (e, onSubmit) => {
      e.preventDefault();
      onSubmit(formState.valueSearch);
      handleResetForm();
    };

  const useForm = (initialForm = {}) => {
    const [formState, setFormState] = useState(initialForm);

    const handleInputChange = ({ target }) => {
      const { name, value } = target;

      setFormState((prevFormState) => ({
        ...prevFormState,
        [name]: value,
      }));
    };

    return {
      formState,
      handleInputChange,
      handleResetForm,
      handleSubmit,
    };
  };

  const { formState, handleInputChange, handleResetForm, handleSubmit } =
    useForm({
      valueSearch: "",
    });

  const getAllPokemons = async (limit = 50) => {
    const baseURL = "https://pokeapi.co/api/v2/";
    const res = await fetch(
      `${baseURL}pokemon?limit=${limit}&offset=${offset}`
    );

    const data = await res.json();
    const promises = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      return data;
    });
    const results = await Promise.all(promises);
    setAllPokemons([...allPokemons, ...results]);
    setLoading(false);
  };

  const getGlobalPokemons = async () => {
    const baseURL = "https://pokeapi.co/api/v2/";
    const res = await fetch(`${baseURL}pokemon?limit=100000&offset=0`);

    const data = await res.json();
    const promises = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      return data;
    });
    const results = await Promise.all(promises);
    setGlobalPokemons(results);
    setLoading(false);
  };

  const getPokemonById = async (id) => {
    const baseURL = "https://pokeapi.co/api/v2/";
    const res = await fetch(`${baseURL}pokemon/${id}`);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    getAllPokemons();
  }, [offset]);

  useEffect(() => {
    getGlobalPokemons();
  }, []);

  const handleCheckBox = (e) => {
    setTypeSelected({
      ...typeSelected,
      [e.target.name]: e.target.checked,
    });

    if (e.target.checked) {
      const filteredResults = globalPokemons.filter((pokemon) =>
        pokemon.types.map((type) => type.type.name).includes(e.target.name)
      );
      setFilteredPokemons([...filteredPokemons, ...filteredResults]);
    } else {
      const filteredResults = filteredPokemons.filter(
        (pokemon) =>
          !pokemon.types.map((type) => type.type.name).includes(e.target.name)
      );
      setFilteredPokemons([...filteredResults]);
    }
  };

  const onClickLoadMore = () => {
    setOffset(offset + 50);
  };

  return (
    <PokemonContext.Provider
      value={{
        valueSearch: formState.valueSearch,
        onInputChange: handleInputChange,
        onResetForm: handleResetForm,
        allPokemons,
        globalPokemons,
        getPokemonById,
        loading,
        onClickLoadMore,
        handleCheckBox,
        handleSubmit: (e) =>
          handleSubmit(e, (searchValue) => console.log(searchValue)), // Modify the onSubmit logic accordingly
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
