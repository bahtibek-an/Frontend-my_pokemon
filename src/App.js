import { Route, Routes } from "react-router-dom";
import Pokemons from "./components/Pokemons/Pokemons";
import "./App.css"
import PokemonDetail from "./components/PokemonDetail/PokemonDetail";
function App() {
  console.log(window.document.location.pathname)
  return (
    <div className="container">
    <Routes>
      <Route path="/" element={<Pokemons/>}/>
      <Route path="/pokemon/:id" element={<PokemonDetail/>}/>
    </Routes>
    </div>
  );
}

export default App;
