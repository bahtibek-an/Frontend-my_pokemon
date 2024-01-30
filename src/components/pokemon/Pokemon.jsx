import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import loader from "../../img/poke.png";

import "./Pokemon.css";
import NotFound from "../not-found/Not-Found";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectAbility, setSelectAbility] = useState("stats");
  const { name } = useParams();

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      setPokemon(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setPokemon(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [name]);

  return (
    <div className="container">
      <Link to={"/"}>
        <button className="btn btn-outline-success my-3">Home</button>
      </Link>
      {isLoading ? (
        <img src={loader} alt="loader" className="loader" />
      ) : pokemon ? (
        <div className="about">
          <div className="d-flex gap-5">
            <div className="pokemon-img">
              <img
                src={pokemon.sprites?.other?.dream_world?.front_default}
                alt="pokemon"
                width={400}
              />
            </div>
            <div className="details">
              <h3>{pokemon.name}</h3>
              <div className="btn-groups">
                <span
                  className={`${selectAbility === "stats" && "active"}`}
                  onClick={() => setSelectAbility("stats")}
                >
                  stats
                </span>
                <span
                  className={`${selectAbility === "types" && "active"}`}
                  onClick={() => setSelectAbility("types")}
                >
                  types
                </span>
                <span
                  className={`${selectAbility === "moves" && "active"}`}
                  onClick={() => setSelectAbility("moves")}
                >
                  moves
                </span>
                <span
                  className={`${selectAbility === "abilities" && "active"}`}
                  onClick={() => setSelectAbility("abilities")}
                >
                  abilities
                </span>
              </div>
              <div className="board overflow-y-auto">
                {selectAbility === "stats"
                  ? pokemon.stats.map((stat, index) => (
                      <div key={index} className="stat-bar">
                        <h5 className="stat-name">{stat.stat.name}</h5>
                        <div
                          className="stat-value"
                          style={{
                            width: `${stat.base_stat * 5}px`,
                          }}
                        >
                          {stat.base_stat}
                        </div>
                      </div>
                    ))
                  : selectAbility === "types"
                  ? pokemon.types.map((type, index) => (
                      <div key={index} className="types">
                        <h4>
                          {type.slot}. {type.type.name}
                        </h4>
                      </div>
                    ))
                  : selectAbility === "moves"
                  ? pokemon.moves.map((move, index) => (
                      <div key={index}>
                        <h4>
                          {index + 1}. {move.move.name}
                        </h4>
                      </div>
                    ))
                  : pokemon.abilities.map((ability, index) => (
                      <div key={index} className="ability">
                        <h4>
                          {ability.slot}. {ability.ability.name}
                        </h4>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Pokemon;
