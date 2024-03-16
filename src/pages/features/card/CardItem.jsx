import { Card, Spin } from "antd";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./Card.module.css";
import Image from "next/image";
const CardItem = ({ pokemon }) => {
  const [loading, setLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState();
  const [modal, setModal] = useState(false);
  const getOnePok = async () => {
    setLoading(false);
    try {
      const response = await axios.get(pokemon?.url);
      setPokemonData(response.data);
      setLoading(true);
    } catch (error) {}
  };
  useEffect(() => {
    setLoading(true);
    getOnePok();
  }, [pokemon]);

  return (
    <>
      {loading ? (
        <Link href={`/${pokemonData?.id}`}>
          <Card hoverable style={{ width: 240 }}>
            <div className={styles.pokemon_card_image}>
              <Image
                width={160}
                height={160}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
                  pokemonData ? pokemonData?.id : pokemonData?.id
                }.svg`}
                alt=''
              />
            </div>
            <p>{pokemon?.name}</p>
          </Card>
        </Link>
      ) : (
        <Spin />
      )}
    </>
  );
};

export default CardItem;
