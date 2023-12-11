import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './PokemonDetails.css'; // Add the CSS file import her



const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => {
        setPokemon(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Define the background color for the card based on the Pokemon's type

  return (
    <div className="container details_page">
      
      {pokemon ? (
        <div className="text-#fff">
          
          <div className="row poke-details rounded mx-auto d-block">
              <h2>{pokemon.name}</h2>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />

              {/* Tab-based navigation */}
              <ul className="nav nav-pills" id="myTab" role="tablist">
                <li className="nav-item">
                <a className="nav-link active" data-bs-toggle="pill" href="#about">About</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" data-bs-toggle="pill" href="#abilities">Abilities</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" data-bs-toggle="pill" href="#stats">Base Stats</a>
                </li>
              </ul>

              {/* Tab content */}
              <div className="tab-content">
                <div className="container tab-pane active" id="about">
                  <br />
                  <ul className="list-group about">
                    <li className="d-flex"><p>Id: <span className="align-items-center justify-content-between badge bg-primary rounded-pill">{pokemon.id}</span></p></li>
                    <li className="d-flex justify-content-between "><p>Height: <span className="align-items-center badge bg-primary rounded-pill">{pokemon.height} cm</span></p></li>
                    <li className="d-flex justify-content-between "><p>Weight: <span className="align-items-center badge bg-primary rounded-pill">{pokemon.weight} kg</span></p></li>
                    <li className="d-flex justify-content-between "><p>Types: <span className="align-items-center badge bg-primary rounded-pill">{pokemon.types.map((type) => type.type.name).join(', ')}</span></p></li>
                  </ul>
                </div>
                <div className="container tab-pane fade" id="abilities">
                <br />
                  
                  <ul className="list-group">
                    {pokemon.abilities.map((ability) => (
                      <li className="d-flex justify-content-between align-items-center badge abilities"  key= {ability.ability.name}> {ability.ability.name}</li>
                    ))}
                  </ul>
                </div>
                <div className="stats container tab-pane fade" id="stats">
                <br />
                  <ul className="list-group">
                    {pokemon.stats.map((stat) => (
                      <li className="d-flex justify-content-between align-items-center" key={stat.stat.name}>
                        {stat.stat.name}: <span className="badge bg-primary rounded-pill">{stat.base_stat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>   
              </div>
        </div>
      ):(
        <div></div>
      )}
    </div>
  );
};

export default PokemonDetails;