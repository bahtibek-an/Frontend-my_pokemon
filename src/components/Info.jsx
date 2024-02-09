import './Info.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Info = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pokemonInfo, setPokemonInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemonInfo(response.data);
      } catch (error) {
        console.error( error);
      }
    };
    fetchData();
  }, [id]);
  const goBack = () => {
    navigate('/');
  };
  if (!pokemonInfo) {
    return(
      <div className='ldPage'>
        <div className='ld'></div>
        </div>
    )
  }
  return (
    <div className="all">
      <button className='btn' onClick={goBack}>Back</button>
      <div className="info">
        <div className="inf">
          <h2>{pokemonInfo.name}</h2>
          <div className='in'>
            <h3>Type: {pokemonInfo.types.map(type => type.type.name).join(', ')}</h3>
          </div>         
          <div className='in'>
            <h3>Height: {pokemonInfo.height / 10} m</h3>
          </div>
          <div className='in'>
            <h3>Weight: {pokemonInfo.weight / 10} kg</h3>
          </div>
          <div className='in'>
            <h3>Abilities: {pokemonInfo.abilities.map(ability => ability.ability.name).join(', ')}</h3>
          </div>
          <div className='in'>
            <h3>Base Experience: {pokemonInfo.base_experience}</h3>
          </div>
          <div className='in'>
            <h3>Moves:</h3>
            <ul>
              {pokemonInfo.moves.map(move => (
                <li key={move.move.name}>{move.move.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="img">
        <div className="image">
          <img src={pokemonInfo.sprites.front_default} alt={pokemonInfo.name} />
        </div>
      </div>
    </div>
  );
};
export default Info;