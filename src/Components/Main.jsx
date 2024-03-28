import React, { useState, useEffect } from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";

const Main = () => {
    const [pokeData, setPokeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [pokeDex, setPokeDex] = useState();
    const [searchQuery, setSearchQuery] = useState("");

    const pokeFun = async () => {
        setLoading(true);
        const res = await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results);
        setLoading(false);
    };

    const getPokemon = async (res) => {
        res.map(async (item) => {
            const result = await axios.get(item.url);
            setPokeData((state) => {
                state = [...state, result.data];
                state.sort((c, d) => (c.id > d.id ? 1 : -1));
                return state;
            });
        });
    };

    useEffect(() => {
        pokeFun();
    }, [url]);

    const SearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const pokemonFilterData = () => {
        if (searchQuery.trim() === "") {
            return pokeData;
        } else {
            return pokeData.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
    };

    return (
        <>
            <input
                type="text"
                placeholder="Search Pokemon"
                value={searchQuery}
                onChange={SearchChange}
                id="search_input"
            />
            <div className="container">
                <div className="left-list">
                    <Card
                        pokemon={pokemonFilterData()}
                        loading={loading}
                        infoPokemon={(poke) => setPokeDex(poke)}
                    />

                    <div className="button_group">
                        {prevUrl && (
                            <button
                                onClick={() => {
                                    setPokeData([]);
                                    setUrl(prevUrl);
                                }}
                            >
                                Previous
                            </button>
                        )}

                        {nextUrl && (
                            <button
                                onClick={() => {
                                    setPokeData([]);
                                    setUrl(nextUrl);
                                }}
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
                <div className="right_list">
                    <Pokeinfo data={pokeDex} />
                </div>
            </div>
        </>
    );
};

export default Main;
