import React from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Search from "./Search";
const Main=()=>{
    const [pokeData,setPokeData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [url,setUrl]=useState("https://pokeapi.co/api/v2/pokemon/")
    const [nextUrl,setNextUrl]=useState();
    const [prevUrl,setPrevUrl]=useState();
    const [pokeDex,setPokeDex]=useState();

    const pokeFun=async()=>{
        setLoading(true)
        const res=await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results)
        setLoading(false)
    }
    const getPokemon=async(res)=>{
       res.map(async(item)=>{
          const result=await axios.get(item.url)
          setPokeData(state=>{
              state=[...state,result.data]
              state.sort((a,b)=>a.id>b.id?1:-1)
              return state;
          })
       })   
    }
     const[allPokemons, s_a_p] = useState([]);
  const[loadMore, s_l_mor] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');
    const get_all_pokm = async() =>{
        const rest = await fetch(loadMore)
        const malumot = await rest.json()
        s_l_mor(malumot.next)
        function cr_pok_obj(results)  {
            results.forEach( async pokemon => {
              const rest = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
              const malumot =  await rest.json()
              s_a_p( currentList => [...currentList, malumot])
              await allPokemons.sort((a, b) => a.id - b.id)
            })
          }
        cr_pok_obj(malumot.results)
    }
    useEffect(()=>{
        pokeFun();
    },[url])
    return(
        <>
        <div className="Search">
                    <Search />
                </div>
            <div className="container">
                
                <div className="left-content">
                    <Card pokemon={pokeData} loading={loading} infoPokemon={poke=>setPokeDex(poke)}/>
                    
                    <div className="btn-group">
                    {  prevUrl && <button onClick={()=>{
                            setPokeData([])
                           setUrl(prevUrl) 
                        }}>Previous</button>}

                        { nextUrl && <button onClick={()=>{
                            setPokeData([])
                            setUrl(nextUrl)
                        }}>Next</button>}

                    </div>
                </div>
                <div className="right-content">
                   <Pokeinfo data={pokeDex}/>
                </div>
            </div>
        </>
    )
}
export default Main;