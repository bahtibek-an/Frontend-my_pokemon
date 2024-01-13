import React from "react";
import logo from "../pokemon_logo.png";
import "./header.css";

const Header = ({ pokeName, setpokeName, handleKeyPress, handleSearch }) => {
  return (
    <div className="header">
      <div className="container head">
      <div className="logo">
        <img src={logo} alt="Pokemon Logo" />
      </div>
      <div className="searchArea">
        <input
          className="search"
          type="text"
          value={pokeName}
          placeholder="Search for heroes"
          onChange={(event) => {
            setpokeName(event.target.value);
          }}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSearch}>
          {/* <img src={pokeball} alt="search" className="searchbtn"/> <br /> */}
          <b>Search</b>
        </button>
      </div>
    </div>
    </div>
  );
};

export default Header;
