import { useEffect, useState } from 'react';
import axios from 'axios';
import AllCard from './Components/AllCard';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ViewCard from './Components/ViewCard';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0)

  const fetchPokemonList = () => {
    axios
    .get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
    .then(data => {
      const res  = data.data.results;
      const promise = res.map(item => axios.get(item.url));
      axios
      .all(promise)
      .then(data => {
        console.log("dataa",data);
        const res = data.map(item => ({
          name : item.data.name,
          img : item.data.sprites.front_default,
          defense : item.data.stats[2].base_stat,
          attack : item.data.stats[1].base_stat,
          type : item.data.types[0].type.name,
          hp: item.data.stats[0].base_stat,
          id:item.data.id
        }))
        setPokemon(res)
      })
    })
  }
  function handelNext() {
    setOffset(offset + 20)
  }
  function handelPrevius() {
    if(offset >= 20 ) {
      setOffset((setOffset) => setOffset - 20)
    }
  }
  useEffect(() => {
    fetchPokemonList()
  },[offset])


  console.log(pokemon);
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <AllCard fetchPokemonList={pokemon} /> } />
        <Route path='/pokemon/:url' element={<ViewCard/>}/>
      </Routes>
      <button onClick={handelPrevius} disabled={offset === 0}>PREV</button>
      <button onClick={handelNext}>NEXT</button>
    </div>
  );
}

export default App;
