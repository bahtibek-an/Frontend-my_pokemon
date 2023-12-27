import React, { useState, useEffect } from 'react';
import { NavLink, Link, useParams, useOutletContext } from 'react-router-dom';
import { Layout, Card, Row, Col } from 'antd';
import URL_SERVER_DOMAIN from '../URL_SERVER_DOMAIN.js';
import '../App.css';

const { Content } = Layout

const cardStyle = { margin: '3rem 0' };

function PokeDetail() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [thisPokemon, setThisPokemon] = useState([])
  const [setTitle, fighters, setFighters, crumbs, setCrumbs, result, setResult] = useOutletContext()
  const [image, setImage] = useState([]);
  const { id } = useParams();

  const getData = () => {
    setLoading(true);
    fetch(`https://${URL_SERVER_DOMAIN}/pokemon/${id}`)
      .then((res) => {
        return res.json()
      })
      .then(
        function (entries) {
          console.log(crumbs)
          if (crumbs[2]?.title.props.children !== entries[0].name.english) {
            setCrumbs(prev => [...prev.slice(0, 2), { title: <NavLink to={`/pokedex/${id}`}>{entries[0].name.english}</NavLink> }]
            )
          }
          if (crumbs?.length > 3) {
            setCrumbs(prev => [...prev.slice(0, 3)])
          }

          const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
          fetch(url)
            .then((res) => res.json())
            .then((res) => {
              console.log(res.sprites.front_default)
              setImage(prev => [...prev, res.sprites.other['official-artwork'].front_default])
            })
            .catch((e) => {
              setError(e.message)
            });

          setTitle(`Details about ${entries[0].name.english}`);
          setThisPokemon(entries[0]);
        }
      )
      .catch((e) => {
        console.log(e.message);
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Content style={{ height: "100%" }}>
      <Layout style={{ width: '100%', position: 'relative', height: "100%" }}>
        <Row className='back' style={{ height: "100%", overflow: "scroll" }}>
          <Col className="gutter-row" span={10} offset={7}>
            {Object.keys(thisPokemon).length > 0 &&
              <Card className='card1'
                cover={<img alt={thisPokemon.name.english} src={image[0]} />}
                title={thisPokemon.name.english} hoverable='true' style={cardStyle}
              >
                <div className="category">
                  <Link to={`/pokedex/${thisPokemon.id}/name`}>Names:</Link>
                  <div className='a-text'>{Object.keys(thisPokemon.name).map(key => <span>{key[0].toUpperCase() + key.slice(1)}: {thisPokemon.name[key]}</span>)}</div>
                </div>
                <div className="category">
                  <Link to={`/pokedex/${thisPokemon.id}/type`}>Type:</Link>
                  <div className='a-text'> {thisPokemon.type.map(e => <span>{e}</span>)}</div>
                </div>
                <div className="category">
                  <Link to={`/pokedex/${thisPokemon.id}/base`}>Base:</Link>
                  <div className='a-text'>
                    <span>HP: {thisPokemon.base.HP}</span>
                    <span>Attack: {thisPokemon.base.Attack}</span>
                    <span>Defense: {thisPokemon.base.Defense}</span>
                    <span>Sp. Attack: {thisPokemon.base['Sp. Attack']}</span>
                    <span>Sp. Defense: {thisPokemon.base['Sp. Defense']}</span>
                    <span>Speed: {thisPokemon.base.Speed}</span>
                  </div>
                </div>
              </Card>}
          </Col>
        </Row>
      </Layout>
    </Content>
  );
}

export default PokeDetail;