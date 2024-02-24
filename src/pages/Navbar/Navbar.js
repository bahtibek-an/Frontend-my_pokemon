import { Outlet } from 'react-router-dom';
import React, { useContext, useState } from "react";
import { PokemonContext } from "../../components/PokemonContext/PokemonContext";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const { onInputChange, onResetForm } = useContext(PokemonContext);
  const navigate = useNavigate();

  const useForm = (initialForm = {}) => {
    const [formState, setFormState] = useState(initialForm);

    const handleInputChange = ({ target }) => {
      const { name, value } = target;

      setFormState((prevFormState) => ({
        ...prevFormState,
        [name]: value,
      }));
    };

    const handleResetForm = () => {
      setFormState(initialForm);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      navigate("/search", {
        state: formState.valueSearch,
      });

      handleResetForm();
    };

    return {
      formState,
      handleInputChange,
      handleResetForm,
      handleSubmit,
    };
  };

  const { formState, handleInputChange, handleSubmit } = useForm({
    valueSearch: "",
  });

  return (
    <div className="navigation-container">
      <div className="search-container">
        <form
          onSubmit={handleSubmit}
          className="search-form"
          action=""
        >
          <input
            className="search-input"
            type="search"
            name="valueSearch"
            value={formState.valueSearch}
            onChange={handleInputChange}
            placeholder="Pokemon name.."
            id=""
          />
          <button className="search-button">
            Search
          </button>
        </form>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
