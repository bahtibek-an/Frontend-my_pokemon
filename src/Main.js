import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import PropTypes from "prop-types";
import MainCard from "./components/CardsType/MainCard";
import Loader from "./components/Loader/Loader";
import Pagination from "./Pagination";

function Main({ searchTerm, openBigCard, children }) {
  const [page, setPage] = useState(1);
  const limit = 25;

  const {
    data: pokemonData,
    isLoading,
    isError,
  } = useQuery(
    ["pokemon", searchTerm, page],
    () =>
      searchTerm
        ? Axios.get(
            `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
          ).then((res) => res.data)
        : Axios.get(
            `https://pokeapi.co/api/v2/pokemon?offset=${
              (page - 1) * limit
            }&limit=${limit}`
          ).then((res) => {
            const { results } = res.data;
            const requests = results.map((result) => Axios.get(result.url));
            return Promise.all(requests).then((pokemonResponses) =>
              pokemonResponses.map((pokemonRes) => pokemonRes.data)
            );
          }),
    {
      keepPreviousData: false,
    }
  );

  function hasHomeSprite(data) {
    if (data?.id >= 500 && data?.id <= 700) {
      return false;
    } else {
      return true;
    }
  }

  function isPokemonAvailable(data) {
    if (data?.id >= 300) {
      return false;
    } else {
      return true;
    }
  }

  const getHomeSprite = useMemo(
    () => (data) => data.sprites.other.home.front_default,
    []
  );

  const getArtworkSprite = useMemo(
    () => (data) => data.sprites.other["official-artwork"]["front_default"],
    []
  );

  function handlePrevClick() {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  }

  function handleNextClick() {
    setPage((prevPage) => prevPage + 1);
  }

  if (isLoading) {
    return <Loader></Loader>;
  } else if (searchTerm) {
    let imageValue;

    if (hasHomeSprite(pokemonData)) {
      imageValue = getHomeSprite(pokemonData);
    } else {
      imageValue = getArtworkSprite(pokemonData);
    }

    return (
      <div className="m-4 flex flex-wrap justify-center gap-14 ">
        <MainCard
          height={pokemonData.height}
          id={pokemonData.id}
          image={imageValue}
          key={pokemonData.id}
          name={pokemonData.species.name}
          weight={pokemonData.weight}
          openBigCard={openBigCard}
        />
        {children}
      </div>
    );
  } else {
    return (
      <>
        <div className="m-4 flex flex-wrap justify-center gap-14 ">
          {Array.isArray(pokemonData) &&
            pokemonData.map((pokemon) => {
              let imageValue;

              if (!isPokemonAvailable(pokemon)) {
                return null;
              }

              if (hasHomeSprite(pokemon)) {
                imageValue = getHomeSprite(pokemon);
              } else {
                imageValue = getArtworkSprite(pokemon);
              }

              return (
                <MainCard
                  height={pokemon.height}
                  id={pokemon.id}
                  image={imageValue}
                  key={pokemon.id}
                  name={pokemon.species.name}
                  weight={pokemon.weight}
                  openBigCard={openBigCard}
                />
              );
            })}
          { children }
        </div>
        <Pagination
          page={page}
          handlePrevClick={handlePrevClick}
          handleNextClick={handleNextClick}
        />
      </>
    );
  }
}

Main.propTypes = {
  searchTerm: PropTypes.string,
  openBigCard: PropTypes.func,
};

export default Main;
