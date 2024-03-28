import React from "react";

const Pokeinfo = ({ data }) => {
    return (
        <>
            {!data ? (
                ""
            ) : (
                <>
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
                        alt=""
                    />
                    <h1>{data.name}</h1>

                    <div className="skills">
                        {data.abilities.map((poke) => {
                            return (
                                <>
                                    <div className="group">
                                        <h2>{poke.ability.name}</h2>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                    <div className="camp-stat">
                        {data.stats.map((poke) => {
                            return (
                                <>
                                    <h3 id="h3_info">
                                        {poke.stat.name}: {poke.base_stat}
                                    </h3>
                                </>
                            );
                        })}
                    </div>
                </>
            )}
        </>
    );
};
export default Pokeinfo;
