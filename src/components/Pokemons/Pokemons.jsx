/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import styles from "./Pokemons.module.css";
import { Button } from "antd";
import Navbar from "../Navbar/Navbar";

const Pokemons = () => {
  const [pokemonData, setPokemonData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [filteredPokemonData, setFilteredPokemonData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(false);

  const getAllPoks = async (url) => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      setPokemonData(response.data);
      setFilteredPokemonData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleNextClick = () => {
    if (pokemonData.next) {
      setCurrentPage(currentPage + 1);
      getAllPoks(pokemonData.next);
    }
  };

  const handlePrevClick = () => {
    if (pokemonData.previous) {
      setCurrentPage(currentPage - 1);
      getAllPoks(pokemonData.previous);
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllPoks(
      `https://pokeapi.co/api/v2/pokemon/?offset=${
        (currentPage - 1) * pageSize
      }&limit=${pageSize}`
    );
  }, [currentPage, pageSize]);
  const [searchValue, setSearchValue] = useState("");

  const onSearch = (value) => {
    const searchTerm = value.toLowerCase();
    setSearchValue(value);
    if (!value) {
      setPokemonData(pokemonData);
      return;
    }
    const filteredData = pokemonData.results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm)
    );

    setPokemonData({
      count: filteredData.length,
      next: null,
      previous: null,
      results: filteredData,
    });

    if (filteredData.length === 0) {
    }
  };
  return (
    <>
      <Navbar
        pokemonData={pokemonData}
        setPokemonData={setFilteredPokemonData}
      />
      <div>
        <div className={styles.pokemon_card}>
          {filteredPokemonData?.results?.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
        <div className={styles.buttons}>
          <Button
            type='primary'
            onClick={handlePrevClick}
            loading={loading}
            disabled={!pokemonData.previous}>
            prev
          </Button>
          <Button
            type='primary'
            onClick={handleNextClick}
            loading={loading}
            disabled={!pokemonData.next}>
            next
          </Button>
        </div>
      </div>
    </>
  );
};

export default Pokemons;
