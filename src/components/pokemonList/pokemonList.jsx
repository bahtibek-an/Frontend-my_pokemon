import React, { useEffect, useState } from "react";
import "./pokemonList.css";
import axios from "axios";
import { Link } from "react-router-dom";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [idx, setIdx] = useState(1);

  const nextHandler = () => {
    setOffset(offset + 20);
    setIdx(idx + 20);
  };

  const previusHandler = () => {
    setOffset(offset - 20);
    setIdx(idx - 20);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`
        );
        console.log(response);
        const results = response.data.results;

        const pokemonDataPromises = results.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            image: pokemonResponse.data.sprites.front_default,
          };
        });
        const pokemonData = await Promise.all(pokemonDataPromises);
        setPokemonList(pokemonData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [offset]);

  return (
    <div className="pokemonList">
      <div className="pokemon">
        {isLoading ? (
          <div className="loader">
            <h1>Loading...</h1>
            <div className="loader__spinner"></div>
          </div>
        ) : null}
        {pokemonList.map((pokemon, index) => {
          return (
            <div className="pokemonCard" key={index}>
              <p>
                {index + idx}# {pokemon.name}
              </p>
              <Link to={`/pokemon/${index + idx}`}>
                <img src={pokemon.image} alt={pokemon.name} />
              </Link>
            </div>
          );
        })}
      </div>
      <div className="info">
        <button
          className="btn btn-success"
          disabled={offset === 0}
          onClick={previusHandler}
        >
          Previus
        </button>
        <button className="btn btn-success" onClick={nextHandler}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
