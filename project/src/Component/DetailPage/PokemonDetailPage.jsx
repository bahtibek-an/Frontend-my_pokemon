// Element.js

import React, { useState } from "react";
import "./style.css";

const Element = ({
  name,
  image,
  hp,
  attack,
  types,
  id,
  speed,
  spattack,
  spaddeffens,
  weight,
  height,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const style = types + " front";

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleBackClick = () => {
    setIsFlipped(false);
  };

  const containerStyle = {
    perspective: "1000px",
    width: "200px",
    height: "300px",
    margin: "26px",
    float: "left",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  };

  const frontStyle = {
    position: "absolute",
    width: '220px',
    height: '280px',
    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)",
    backfaceVisibility: "hidden",
    transition: "transform 0.6s",
    border: "2px outset #000",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgb(255, 255, 255)",
    backfaceVisibility: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const backStyle = {
    border: "2px outset #000",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgb(255, 255, 255)",
    position: "absolute",
    width: "220px",
    height: "280px",
    transform: isFlipped ? "rotateY(0deg)" : "rotateY(-180deg)",
    backfaceVisibility: "hidden",
    transition: "transform 0.6s",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    color: "black",
  };

  return (
    <div style={containerStyle} onClick={handleClick}>
      <div style={backStyle} className={ style }>
        <h2>#{id}</h2>
        <p>
          hp: {hp} <br />
          attack: {attack} <br />
          type: {types} <br />
          Speed: {speed} <br />
          special-attack: {spattack} <br />
          special-defense: {spaddeffens} <br />
          weight: {weight} <br />
          height: {height} <br />
        </p>
        <button className="backButton" onClick={handleBackClick}>
          Back
        </button>
      </div>
      <div  className={style} style={frontStyle}>
        <div className="image" onClick={handleClick}>
          <img src={image} alt={name} style={{ width: '130px'}} />
          <h2>{name}</h2>
        </div>
      </div>
    </div>
  );
};

export default Element;
