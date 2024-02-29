import React, { useState } from 'react'
import styles from "./Navbar.module.css"
const Navbar = ({pokemonData, setPokemonData}) => {
    const onSearch = (value) => {
        const searchTerm = value?.target?.value?.toLowerCase();
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
        if (filteredData.length === 0)return<h1>Pokemon not found</h1>
      };
  return (
    <div className={styles.navbar}>
        <input type='search' placeholder='Search...'  onChange={onSearch}/>
    </div>
  )
}

export default Navbar