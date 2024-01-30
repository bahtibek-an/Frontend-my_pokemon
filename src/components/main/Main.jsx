import axios from "axios";
import { useEffect, useState } from "react";
import loader from "../../img/poke.png";
import { Card } from "../";

import "./Main.css";

const Main = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0limit=20"
  );
  const [nextPage, setNextPage] = useState("");
  const [prevPage, setPrevPage] = useState("");

  const getData = async () => {
    setIsLoading(true);
    try {
      const data = await axios.get(url).then((res) => res.data);

      setNextPage(data.next);
      setPrevPage(data.previous);

      const pokemonsData = await Promise.all(
        data.results.map(async (item) => {
          const response = await axios.get(item.url);

          return response.data;
        })
      );

      setPokemons(pokemonsData);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [url]);

  return (
    <>
      <main>
        <div className="container mb-5">
          {isloading ? (
            <img src={loader} alt="loader" className="loader" />
          ) : (
            <>
              <div className="row row-col-4 gap-3">
                {pokemons.map((pokemon, idx) => {
                  return (
                    <Card
                      name={pokemon.name}
                      key={idx}
                      img={pokemon.sprites.other.dream_world.front_default}
                      types={pokemon.types}
                      id={pokemon.id}
                    />
                  );
                })}
              </div>
              <div className="pages ">
                <button className="btn btn-success mx-5 fs-5" onClick={() => setUrl(prevPage)}>prev</button>
                <button className="btn btn-success mx-5 fs-5" onClick={() => setUrl(nextPage)}>next</button>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Main;
