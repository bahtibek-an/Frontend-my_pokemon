import React, { useContext } from "react";
import Img from "../assets/logo.png";
import { PokemonContext } from "../context/PokemonContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { onInputChange, active, setActive, valueSearch, onResetForm } =
    useContext(PokemonContext);

  const navigate = useNavigate();

  const onSearchSubmit = (e) => {
    e.preventDefault();
    navigate("/search", {
      state: valueSearch,
    });

    onResetForm();
  };
  return (
    <div className= "xs:flex-col lg:flex p-4 lg:px-10 flex-col xs:items-start  lg:items-center text-center bg-slate-900">
      <img src={Img} alt="Logo" className="lg:w-[50%] xs:w-[100%] mb-10" />

      <div className="flex flex-row lg:items-center lg:justify-between  xs:items-center xs:justify-center xs:gap-10  lg:gap-52">
        <form
          onSubmit={onSearchSubmit}
          className="w-[100%] flex  items-center"
          action=""
        >
          <input
            className="outline-none py-2 w-[100%] xs:h-8 xs:text-[10px] lg:text-lg border-s-[1px] border-y-[1px] border-solid  border-black p-1"
            type="search"
            name="valueSearch"
            value={valueSearch}
            onChange={onInputChange}
            placeholder="Pokemon name.."
            id=""
          />
          <button className="bg-red-600 border-y-[1px] xs:h-8  xs:py-0 border-white text-white rounded-e-md p-2 ">
            Search
          </button>
        </form>
        <div className="w-[50%] float-right">
        <div
          onClick={() => setActive(!active)}
          className="
      
      flex my-4 cursor-pointer bg-red-600 lg:w-24 xs:w-20 lg:text-base  xs:text-[10px] text-white rounded-md p-2 justify-center items-center gap-3"
        >
          <i className="fa fa-sliders" aria-hidden="true"></i>

          <h4>Filter</h4>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
