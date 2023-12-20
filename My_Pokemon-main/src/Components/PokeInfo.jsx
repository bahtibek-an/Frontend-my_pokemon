import React, { Fragment, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const PokeInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [pokemonData, setPokemonData] = useState(null);

    const goBack = () => {
        navigate('/')
    }

    useEffect(() => {
        const getPokeData = async (id) => {
            try {
                setIsLoading(true);
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                console.log("DATA RESULT", result.data);
                setPokemonData(result.data)
                setIsLoading(false);
            } catch (e) {
                console.log({ Error: e });
            }
        };

        getPokeData(id);

    }, [id]);

    console.log("STATE", pokemonData);

    return (
        <Fragment>
            {!pokemonData && isLoading ? (
                "Working to display the pokemon data..."
            ) : (
                    <div style={{ width: '100%' }}>
                        <h3 onClick={goBack} style={{cursor:'pointer'}}> &#8592; Back</h3>
                        <h1 style={{ textAlign: 'center', margin: '3rem' }}>{pokemonData?.name}</h1>
                        <p style={{ textAlign: 'center' }}>
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonData?.id}.svg`}
                                alt=""
                                style={{
                                    border: '1px solid #000',
                                    padding: '3rem',
                                    borderRadius: '1rem',
                                }}
                            />
                        </p>

                        <div style={{ textAlign: 'center' }}>
                            {
                                pokemonData?.abilities.map((pokeData) => {
                                    return (
                                        <>
                                            <div>
                                                <h2>{pokeData?.ability.name}</h2>
                                            </div>
                                        </>
                                    );
                                })
                        }
                        </div>

                        <div style={{ textAlign: 'center', fontWeight: 200, margin: '3rem' }}>
                            {
                                pokemonData?.stats.map((pokeData)=>{
                                    return(
                                        <div>
                                            <p>{pokeData?.stat.name} {'=>'} {pokeData?.base_stat}</p>
                                        </div>
                                    )
                                })
                            }
                             
                        </div>
                    </div>
                )}
        </Fragment>
    );
};

export default PokeInfo