import React from "react";
const Card = ({ pokemon, loading, infoPokemon }) => {
    return (
        <>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                pokemon.map((item) => {
                    return (
                        <>
                            <div
                                className="list"
                                key={item.id}
                                onClick={() => infoPokemon(item)}
                            >
                                <h2>{item.id}</h2>
                                <h2>{item.name}</h2>
                                <img src={item.sprites.front_default} alt="" />
                            </div>
                        </>
                    );
                })
            )}
        </>
    );
};
export default Card;
