import React from "react";
import { Route, Routes } from "react-router-dom";
import { PokemonList, Pokemon, Navbar, Search } from "../";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<Pokemon />} />
        <Route path="/search/:id" element={<Search />} />
      </Routes>
    </>
  );
};

export default App;
