import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Poke from '../Poke';
import { Link } from 'react-router-dom';

const PokemonList = () => {
  const [pokes, setPokes] = useState([]);
  const [filteredPokes, setFilteredPokes] = useState([]);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [prevPage, setPrevPage] = useState();
  const [nextPage, setNextPage] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Function to generate random background color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then((res) => {
        setPokes(res.data.results);
        setPrevPage(res.data.previous);
        setNextPage(res.data.next);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, [url]);

  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredPokes = pokes.filter((poke) =>
      poke.name.toLowerCase().includes(searchQuery)
    );
    setFilteredPokes(filteredPokes);
  };

  return (
    <div className="container">
      <div className="container ser navbar">
        <div className="ser col-4 justify-item-center">
          <form className="d-flex" role="search">          
            <input className="form-control me-2" type="search" placeholder="Search a Pokemon" aria-label="Search" onChange={handleSearch} />
          </form>
        </div>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <section className="card-list">
            {filteredPokes.length > 0
              ? filteredPokes.map((poke) => (
                  <Link
                    className="pokemon-link text-capitalize"
                    key={poke.name}
                    to={`/pokemon/${poke.name}`}
                  >
                    <Poke url={poke.url} color={getRandomColor()} />
                  </Link>
                ))
              : pokes.map((poke) => (
                  <Link
                    className="pokemon-link text-capitalize"
                    key={poke.name}
                    to={`/pokemon/${poke.name}`}
                  >
                    <Poke url={poke.url} color={getRandomColor()} />
                  </Link>
                ))}
          </section>
          <div>
            <button
              className="prev-btn btn btn-primary"
              disabled={!prevPage}
              onClick={() => setUrl(prevPage)}
            >
              Back
            </button>
            <button
              className="next-btn btn btn-primary"
              disabled={!nextPage}
              onClick={() => setUrl(nextPage)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonList;
