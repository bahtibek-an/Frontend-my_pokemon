import React, { useContext } from "react";
import "./Home.css"; 
import PokemonList from '../../components/PokemonList/PokemonList';
import { PokemonContext } from '../../components/PokemonContext/PokemonContext';

const Home = () => {
  const { onClickLoadMore } = useContext(PokemonContext);

  return (
    <div className="home-container">
      <div className="content-container">
        <PokemonList />
        <div className="load-more-container">
          <button
            onClick={onClickLoadMore}
            className="load-more-button"
          >
            Load more ...
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
