import React from "react";
import "./style.css";

const Pokeinfo = ({ data, closePage }) => {
  return (
    <>
      {!data ? (
        ""
      ) : (
        <div className="poke-info-container">
          <button className="close" onClick={closePage}>
            Close
          </button>
          <h1 className="poke">{data.name}</h1>
          <div className="pokemon__img">
            <img
              className="speed"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
              alt=""
            />
          </div>
          <div className="abilities">
            {data.abilities.map((poke, index) => (
              <div className="group" key={index}>
                <button>{poke.ability.name}</button>
              </div>
            ))}
          </div>
          <div className="base-stat">
            {data.stats.map((poke, index) => (
              <h3 className="now1" key={index}>
                {poke.stat.name}: {poke.base_stat}
              </h3>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Pokeinfo;
