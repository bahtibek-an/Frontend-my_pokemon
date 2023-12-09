import React, { useEffect, useState } from 'react'
import ViewCard from './ViewCard';
import './Style.css'
function AllCard(props) {
    const [poke, setPoke] = useState([])
    const [search,setSearch] = useState("");
    const [loading,setLoading] = useState(false)
    const [click, setClick] = useState([])

    function handelCard(pokemonItem) {
        setClick(pokemonItem)
    }

    useEffect(() => {
        setPoke(props.fetchPokemonList)
        console.log({
            poke,
            loading
        });
    }, [props.fetchPokemonList]);
    
    return (
    <>  
        

            <header className='header'>
                <input 
                    type="text" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} 
                />
            </header>
            <ViewCard handelCard = {[click]}/>
            <div className='wrape-cards'>
            {
                loading ? setLoading(true) (
                    <h1>Loading ...</h1>
                )
                :
                (poke  
                    .filter(type => {
                        return  search.toLowerCase() === "" 
                            ? type
                            : type.name.toLowerCase().includes(search)
                        }
                    )
                .map((item,index) => {
                    return(
                        <div className='pokemon-card' onClick={() => handelCard(item)} key={index}>
                            <h1>{item.name}</h1>
                            <img src={item.img} alt="" />
                            <div className="base_stats">
                                <p>DEFENSE : {item.defense} </p>
                                <p>ATTACK : {item.attack} </p>
                                <b>Type : {item.type}</b>
                            </div>
                        </div>
                    )
                })
            )}
        </div>
    </>
  )
}

export default AllCard