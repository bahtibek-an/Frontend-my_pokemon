import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Pokemon.css'
const PokemonWiew = () => {
    const name = useParams();
    const [show,setShow] = useState([]);
    useEffect(() => {
        axios
        .get(`https://pokeapi.co/api/v2/pokemon/${name.name}`)
       .then((res) => {
           console.log(res);
           setShow([res.data]);
       }).catch((e) => {
           console.log(e);
       })
       console.log("effect");
    },[])

  return (
    <div>
        {
            show
            .map((pokemon,index) => {
                return (
                    <div className="pokemon_view" key={index}>
                    <img className="pokemon-view-img" src={pokemon.sprites.front_default} alt="" />
                    <div className="pokemon-info">
                        <div className="pokemon_name">
                            <b>{pokemon.name}</b>
                        </div>
                        <div className="pokemon_stats">
                        <span>attack: {pokemon.stats[1].base_stat}</span>
                        <span>hp: {pokemon.stats[0].base_stat}</span>
                        <span>speed: {pokemon.stats[5].base_stat}</span>
                        <span>defence: {pokemon.stats[3].base_stat}</span>
                        <span>type: {pokemon.types[0].type.name}</span>
                        <span>special-attack: {pokemon.stats[3].base_stat}</span>
                        <span>special-defence: {pokemon.stats[4].base_stat}</span>
                        </div>
                    </div> 
                </div>
                )
            })
        }

    </div>
  )
}

export default PokemonWiew