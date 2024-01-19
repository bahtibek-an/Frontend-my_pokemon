import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './PokeCard.css';

function PokeCard() {
  const { name } = useParams();
  const [pokemonDatas, setPokemonDatas] = useState();
  const navigate = useNavigate();
  const back = () => {
    navigate(-1); 
  };
  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => {
        setPokemonDatas(response.data);
      })
      .catch(error => {
        console.error(`Error ${name}:`, error);
      });
  }, [name]);
  if (!pokemonDatas) {
    return <div className='load'>Loading...</div>
  }
  return (
    <div className="container">
      <div className='min-container'>
        <h3>{pokemonDatas.name}</h3>
        <p>Type: {pokemonDatas.types[0].type.name}</p>
        <p>Speed: {pokemonDatas.stats.find(stat => stat.stat.name === 'speed').base_stat}</p>
        <p>Height: {pokemonDatas.height}</p>
        <p>Weight: {pokemonDatas.weight}</p>
        {pokemonDatas.sprites && pokemonDatas.sprites.front_default && (
          <img className='image' src={pokemonDatas.sprites.front_default} alt={pokemonDatas.name} />
        )}<br/>
        <button onClick={back}>Back</button>
      </div>
    </div>
  );
}

export default PokeCard;
