
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Button, Card, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import CardItem from "./features/card/CardItem";
import SearchBar from "./features/searchbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [pokemonData, setPokemonData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [filteredPokemonData, setFilteredPokemonData] = useState({
    results: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(false);
  const getAllPoks = async (url: any) => {
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
  console.log(filteredPokemonData);
  const onSearch = (value: any) => {
    const searchTerm = value.target.value.toLowerCase();
    if (!searchTerm) {
      setFilteredPokemonData(pokemonData);
      return;
    }
    const filteredData = pokemonData.results.filter((pokemon: any) =>
      pokemon?.name.toLowerCase().includes(searchTerm)
    );
setFilteredPokemonData((prev)=>({...prev, results:filteredData}))
    if (filteredData.length === 0) {
    }
  };
  const results = filteredPokemonData?.results;
  return (
    <>
    {!loading?<>
      <SearchBar onSearch={onSearch}/>
      <div className={styles.pokemon_list}>
        {results?.map((item: any, idx: number) => (
          <CardItem key={idx} pokemon={item} />
        ))}
      </div>
      <div className={styles.buttons}>
        <Button onClick={handlePrevClick}>prev</Button>
        <Button onClick={handleNextClick}>Next</Button>
      </div>
    </>:<Spin/>}
    </>
  );
}

