import React from "react";
const Card = ({ pokemon, loading, infoPokemon }) => {
    return (
        <>
            {pokemon.map((item) => {
                return (
                    <>
                        <div
                            className="card"
                            key={item.id}
                            onClick={() => infoPokemon(item)}
                        >
                            <h2 className="pop">{item.id}</h2>
                            <img
                                className="pop"
                                src={item.sprites.front_default}
                                alt=""
                            />
                            <h2 className="pop">{item.name}</h2>
                        </div>
                    </>
                );
            })}
        </>
    );
};
export default Card;
