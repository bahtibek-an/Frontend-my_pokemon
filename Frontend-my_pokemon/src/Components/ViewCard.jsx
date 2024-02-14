import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ViewCard() {
  const {url} = useParams();

  const [data,setData] = useState([]);

  useEffect(() => {
    axios
    .get(`https://pokeapi.co/api/v2/pokemon/${url}`)
    .then((res) => {
      console.log("res",res.data);
      setData([res.data]);
    }).catch((e) =>{
      console.log(e);
    })
  },[])
  return (
    <div>
      {data.map((item) => {
        return (
          <>
            <h1>{item.name}</h1>
            <img src={item.sprites.front_default} alt="" />
            <div className="base_stats">
              <p>DEFENSE : {item.stats[2].base_stat} </p>
              <p>ATTACK : {item.stats[1].base_stat} </p>
              <p>HP : {item.stats[0].base_stat} </p>
              <p>Special-attack : {item.stats[3].base_stat}</p>
              <p>Special-defense : {item.stats[4].base_stat}</p>
              <p>Speed: {item.stats[5].base_stat}</p>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default ViewCard;
