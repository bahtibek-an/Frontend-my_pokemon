import './App.css';
import React, { Suspense, useState } from 'react';
import TypesBar from './components/TypesBar';
import PokemonsContainer from './components/PokemonsContainer';
import Modal from './components/Modal';
import { PokemonModalProvider } from './context/PokemonModalProvider';

function App() {
  const [type, setType] = useState('ice');

  return (
    <Suspense>
      <PokemonModalProvider>
          <div className='wrapper'>
            <h1 className='logo-pokemon'>Pokédex</h1>

            <TypesBar toggleType={ setType } />
            <PokemonsContainer type={ type } />
          </div>

          <Modal />
      </PokemonModalProvider>
    </Suspense>
  )
}

export default App
