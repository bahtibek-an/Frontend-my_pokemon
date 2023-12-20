import { Link } from "react-router-dom";

const PokemonCard = ({ pokeData, isLoading }) => {
    console.log("POKEDATA FROM CARD", pokeData)
    return (
        <div style={{
            display: 'grid', alignItems: 'center',
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))"
        }}
        >
            {isLoading ? (
                <h1>Loading Pokemons...</h1>
            ) : (
                    pokeData.map((element, index) => {
                        return (
                            <div key={index}>
                            <Link
                                to={`/pokemon-details/${element.id}`}
                                style={{ textDecoration: 'none', color: '#000' }}
                                
                            >
                                <div
                                    style={{
                                        border: '1px solid #000',
                                        margin: '1rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        borderRadius: '1rem',
                                        background: '#aaa',
                                        padding: '1rem',
                                    }}
                                   
                                    onClick={f => f}
                                >
                                    <img src={element.sprites.front_default} alt="" />
                                    <p>{element.id}</p>
                                    <p>{element.name}</p>
                                </div>
                            </Link>
                            </div>
                        );
                    })
    )}
        </div>
    );
};

export default PokemonCard;
