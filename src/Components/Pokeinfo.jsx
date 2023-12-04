
import React from "react";
import "./style.css"

const Pokeinfo=({data, closePage})=>{
    console.log(data)
    return (
        <>
            {
                (!data)?"":(
                    <>
                     
                        <h1 className="poke">data.name</h1>
                        <button className="close" onClick={closePage} >close</button>
                        <div className="pokemon__img">
                            < img className="speed" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`} alt="" />
                        </div>
                        <div className="abilities">
                            {
                                    
                                data.abilities.map(poke=> {
                                    return(
                                         <>
                                            <div className="group">
                                                <h2>{poke.ability.name}</h2>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                            <div className="base-stat">
                                {
                                    data.stats.map(poke=>{
                                        return(
                                            <>
                                            <h3 className="now1">{poke.stat.name}:{poke.base_stat}</h3>
                                            </>
                                        )
                                    })
                                }
                            </div>
                            
                    </>
                )
            }
        
        </>
    )
}
export default Pokeinfo;