import React, { useEffect, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
//import PokemonList from './components/PokemonList/PokemonList';
import ErrorHandler from './components/Others/ErrorHandler';
import Navbar from './components/Navbar/Navbar';
import DetailsLazyLoading from './components/PokemonDetails/DetailsLazyLoading';

// Lazy loading for the components
const LazyPokemonList = React.lazy(() => import('./components/PokemonList/PokemonList'));

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="App">
      <ErrorHandler>
        <Navbar />
        <Routes>
          <Route path="/" element={<LazyPokemonList />} />
          <Route path="/pokemon/:id" element={<DetailsLazyLoading />} />
        </Routes>
      </ErrorHandler>
    </div>
  );
}

export default App;
