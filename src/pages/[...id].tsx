import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CardItem from './features/card/CardItem';
import { useRouter } from 'next/router';
import styles from "../styles/Home.module.css"
import { Card } from 'antd';
import Image from 'next/image';
const PokemonItem = () => {
    const [loading, setLoading] = useState(false);
    const [pokemonData, setPokemonData] = useState(
      {id:null,abilities:[], stats:[]}
    );
    const router = useRouter()
    console.log(router)
    const getOnePok = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon${router.asPath}`);
        setPokemonData(response.data);
        setLoading(false);
      } catch (error) {}
    };
  
    useEffect(() => {
      setLoading(true);
      getOnePok();
    }, [router]);
  return (
    <>
    <div className={styles.pokemon}>
            <div className={styles.back_page} onClick={()=>router.back()} style={{ cursor: 'pointer' }}>
              ← Back
            </div>
            <Card hoverable style={{ width: 240 }}>
                <div className={styles.pokemon_detail}>
              <div className={styles.pokemon_image}>
                <Image
                width={160}
                height={160}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
                    pokemonData ? pokemonData.id : null
                  }.svg`}
                  alt=''
                />
              </div>
              <div style={{ padding: "10px" }}>
                <div className='ability'>
                  <h1>Abilities</h1>
                  {pokemonData?.abilities?.map((el:any, index:number) => (
                    <p key={index} className='ability-item'>
                      {el.ability.name}
                    </p>
                  ))}
                </div>
                <div className='stats'>
                  <h2>Stats</h2>
                  <ul style={{ listStyle: "none" }}>
                    {pokemonData?.stats?.map((item:any, index:number) => (
                      <li key={index} className='stats-item'>
                        {item.stat.name}: {item.base_stat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            </Card>
          
          </div>
    </>
  )
}

export default PokemonItem