import PokemonCard from './PokemonCard'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { POKEMONS_URL } from '../Resources/Constants.js'
import '../../src/App.css'

const Home = () => {
    const [pokeData, setPokeData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [url, setUrl] = useState(POKEMONS_URL)
    const [nextUrl, setNextUrl] = useState()
    const [prevUrl, setPrevUrl] = useState()
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredList, setFilteredList] = useState([]);
    const filterItems = (query) => {
        console.log(pokeData)
        let updatedList = [...pokeData]
        updatedList = updatedList.filter((item) => {
            return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
        console.log("UPDATED-LIST", updatedList);
        setFilteredList(updatedList)
    };

    const fetchAllPokemons = async (data) => {
        setIsLoading(true)
        const res = await axios.get(url)
        setNextUrl(res.data.next)
        setPrevUrl(res.data.previous)
        fetchPokemon(res.data.results)
        setIsLoading(false)
    };

    const fetchPokemon = async (data) => {
        data.map(async (element) => {
            const result = await axios.get(element.url);
            //Gets individual poke data and append to pokeData state variable
            setPokeData((state) => {
                state = [...state, result.data]
                state.sort((el1, el2) => (el1.id > el2.id ? 1 : -1))
                return state
            })
        })
    };
    useEffect(() => {
        fetchAllPokemons()
        
    }, [url])
    return (
        <>
            <div className="container">
                <div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <input
                            style={{
                                width: '50%',
                                marginTop: '1rem',
                                height: '3rem',
                                fontSize: '22px',
                                border: '1px solid #000',
                                borderRadius: '5px',
                            }}
                            type="search"
                            value={searchQuery}
                            onChange={(event) => {
                                setSearchQuery(event.target.value)
                                filterItems(searchQuery)
                            }}
                        />
                    </div>
                    <PokemonCard
                        pokeData={(filteredList.length > 0) ? [...filteredList] : [...pokeData]}
                        isLoading={isLoading}
                    />
                    <div
                        style={{ display: 'flex', justifyItems: 'center', justifyContent: 'center' }}>
                        {prevUrl && (
                            <button
                                style={{ height: '2rem', width: '100px' }}
                                onClick={() => {
                                    setPokeData([])
                                    setUrl(prevUrl)
                                }}>Prev</button>)}
                        {
                            nextUrl && (
                                <button
                                    style={{ height: '2rem', width: '100px', marginLeft: '5px' }}
                                    onClick={() => {
                                        setPokeData([])
                                        setUrl(nextUrl)
                                    }}>Next</button>
                            )}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;