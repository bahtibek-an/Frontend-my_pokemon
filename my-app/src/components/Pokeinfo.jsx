import React from "react";

const Pokeinfo = ({ data }) => {
  return (
    <>
      {!data ? (
        ""
      ) : (
        <>
          <h1>{data.name}</h1>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
            alt=""
          />
          <div className="abilities">
            {data.abilities.map((ability) => (
              <div className="group" key={ability.ability.name}>
                <h2>{ability.ability.name}</h2>
              </div>
            ))}
          </div>
          <div className="base-stat">
            {data.stats.map((stat) => (
              <h3 key={stat.stat.name}>
                {stat.stat.name}:{stat.base_stat}
              </h3>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Pokeinfo;
