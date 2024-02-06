import React from "react";

const Pokeinfo = ({ data }) => {
    return (
        <>
            {!data ? (
                ""
            ) : (
                <div className="pokeInfo-container">
                    <div className="pokeInfo-right">
                        <h1>{data.name}</h1>
                        <img
                            className="pokeInfo-image"
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
                            alt=""
                        />
                    </div>

                    <div className="base-stat">
                        {data.stats.map((poke) => {
                            return (
                                <>
                                    <p className="pokeInfo-txt">
                                        {poke.stat.name}:{poke.base_stat}
                                    </p>
                                </>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};
export default Pokeinfo;
