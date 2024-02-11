import React, { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";

const FilterBar = () => {

  const {active, handleCheckBox} = useContext(PokemonContext)

  return (
    <div className={`container-filters ${active ? 'active' : ''} xs:text-sm lg:mt-5 xs:mt-2`}>
      <div className="filter-by-type">
        <span className="mb-5">Types</span>
        <div className="group-type">
          <input
            onChange={handleCheckBox}
            type="checkbox"
            name="grass"
            id="grass"
          />
          <label htmlFor="grass">Grass</label>
        </div>
        <div className="group-type">
          <input
            onChange={handleCheckBox}
            type="checkbox"
            name="normal"
            id="normal"
          />
          <label htmlFor="normal">Normal</label>
        </div>
        <div className="group-type">
          <input
            onChange={handleCheckBox}
            type="checkbox"
            name="fighting"
            id="fighting"
          />
          <label htmlFor="fighting">Fighting</label>
        </div>
        <div className="group-type">
          <input
            onChange={handleCheckBox}
            type="checkbox"
            name="flying"
            id="flying"
          />
          <label htmlFor="flying">Flying</label>
        </div>
        <div className="group-type">
          <input
            onChange={handleCheckBox}
            type="checkbox"
            name="poison"
            id="poison"
          />
          <label htmlFor="poison">Poison</label>
        </div>
        <div className="group-type">
          <input
            onChange={handleCheckBox}
            type="checkbox"
            name="ground"
            id="ground"
          />
          <label htmlFor="ground">Ground</label>
        </div>
        <div className="group-type">
          <input
            onChange={handleCheckBox}
            type="checkbox"
            name="rock"
            id="rock"
          />
          <label htmlFor="rock">Rock</label>
        </div>
        <div className="group-type">
          <input
            onChange={handleCheckBox}
            type="checkbox"
            name="bug"
            id="bug"
          />
          <label htmlFor="bug">Bug</label>
        </div>
        <div className="group-type">
          <input
            onChange={handleCheckBox}
            type="checkbox"
            name="ghost"
            id="ghost"
          />
          <label htmlFor="ghost">Ghost</label>
        </div>
        <div className="group-type">
          <input
            onChange={handleCheckBox}
            type="checkbox"
            name="steel"
            id="steel"
          />
          <label htmlFor="steel">Steel</label>
        </div>
        <div className="group-type">
          <input
            onChange={handleCheckBox}
            type="checkbox"
            name="fire"
            id="fire"
          />
          <label htmlFor="fire">Fire</label>
        </div>
        <div className="group-type">
          <input
            onChange={handleCheckBox}
            type="checkbox"
            name="water"
            id="water"
          />
          <label htmlFor="water">Water</label>
        </div>
        <div className="group-type">
          <input
            onChange={handleCheckBox}
            type="checkbox"
            name="electric"
            id="electric"
          />
          <label htmlFor="electric">Electric</label>
        </div>
        <div className="group-type">
          <input
            onChange={handleCheckBox}
            type="checkbox"
            name="psychic"
            id="psychic"
          />
          <label htmlFor="psychic">Psychic</label>
        </div>
        <div className="group-type">
          <input
            onChange={handleCheckBox}
            type="checkbox"
            name="ice"
            id="ice"
          />
          <label htmlFor="ice">Ice</label>
        </div>
        <div className="group-type">
          <input
            onChange={handleCheckBox}
            type="checkbox"
            name="dragon"
            id="dragon"
          />
          <label htmlFor="dragon">Dragon</label>
        </div>
        <div className="group-type">
          <input
            onChange={handleCheckBox}
            type="checkbox"
            name="dark"
            id="dark"
          />
          <label htmlFor="dark">Dark</label>
        </div>
        <div className="group-type">
          <input
            onChange={handleCheckBox}
            type="checkbox"
            name="fairy"
            id="fairy"
          />
          <label htmlFor="fairy">Fairy</label>
        </div>
        <div className="group-type">
          <input
            onChange={handleCheckBox}
            type="checkbox"
            name="unknown"
            id="unknown"
          />
          <label htmlFor="unknown">Unknown</label>
        </div>
        <div className="group-type">
          <input
            onChange={handleCheckBox}
            type="checkbox"
            name="shadow"
            id="shadow"
          />
          <label htmlFor="shadow">Shadow</label>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
