import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import PokemonDetails from "./pages/PokemonDetails/PokemonDetails";
import SearchPage from "./pages/Search/Search";
import Navbar from "./pages/Navbar/Navbar";
import PokemonProvider from './components/PokemonContext/PokemonProvider';
import './App.css'

function App() {
  return (
    <PokemonProvider>
      <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        
        <Route path="search" element={<SearchPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="pokemon/:id" element={<PokemonDetails />} />
    </Routes>
    </PokemonProvider>
  );
}

export default App;
