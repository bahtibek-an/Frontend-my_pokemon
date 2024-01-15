// Element.js

import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Element = ({ name, image, types, id }) => {
  const containerStyle = {
    width: "213px",
    height: "270px",
    margin: "20px",
    float: "left",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const frontStyle = {
    position: "absolute",
    width: "220px",
    height: "250px",
    backfaceVisibility: "hidden",
    transition: "transform 0.6s",
    border: "2px outset #000",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgb(255, 255, 255)",
    backfaceVisibility: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Link to={`/details/${id}`} style={{ textDecoration: "none" }}>
      <div style={containerStyle}>
        <div className={types + " front"} style={frontStyle}>
          <div className="image">
            <img src={image} alt={name} style={{ width: "130px", height: '150px' }} />
            <h2>{name}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Element;
