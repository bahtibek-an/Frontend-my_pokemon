import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./List.css";

const List = ({ searchPokemon }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectPage, setSelectPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=21&offset=${
            (selectPage - 1) * 21
          }`,
        );
        setPokemonList(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [selectPage]);
  const goNext = () => {
    setSelectPage((prevPage) => prevPage + 1);
  };
  const GooBack = () => {
    setSelectPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };
  const filtered = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase()),
  );
  return (
    <div className="content">
      {filtered.map((pokemon, index) => (
        <div className="box" key={index}>
          <Link to={`/info/${(selectPage - 1) * 20 + index + 1}`}>
            <h3>{pokemon.name}</h3>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                (selectPage - 1) * 20 + index + 1
              }.png`}
              alt={pokemon.name}
            />
          </Link>
        </div>
      ))}
      <div className="navigate">
        <button className="back" onClick={GooBack} disabled={selectPage === 1}>
          Back
        </button>
        <button
          className="next"
          onClick={goNext}
          disabled={filtered.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default List;
