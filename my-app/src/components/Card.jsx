import React, { useState } from "react";
import Modal from "./Modal";
import Pokeinfo from "./Pokeinfo"; // Добавьте правильный импорт
import "./Modal.css";

const Card = ({ pokemon, loading, infoPokemon }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const openModal = (poke) => {
    setSelectedPokemon(poke);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
    setIsModalOpen(false);
  };

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        pokemon.map((item) => (
          <div
            className="card"
            key={item.id}
            onClick={() => openModal(item)}
          >
            <h2>{item.id}</h2>
            <img src={item.sprites.front_default} alt="" />
            <h2>{item.name}</h2>
          </div>
        ))
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {/* Передаем информацию о выбранном покемоне в модальное окно */}
          <Pokeinfo data={selectedPokemon} />
        </Modal>
      )}
    </>
  );
};

export default Card;
