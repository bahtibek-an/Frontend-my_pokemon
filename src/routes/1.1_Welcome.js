import React, { useState, useEffect } from 'react';
import { NavLink, useOutletContext } from 'react-router-dom';
import { Button, Row, Col } from 'antd';
import '../App.css';

function Welcome() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [setTitle, fighters, setFighters, crumbs, setCrumbs, result, setResult] = useOutletContext()

  useEffect(() => {
    setCrumbs([{ title: <NavLink to="/">Home</NavLink> }])
  }, [])

  setTitle('Welcome')

  return (
    <Row className='back' style={{height: '100%'}}>
      <Col className="gutter-row" span={15} offset={5}>
        <div className="card1" style={{marginTop : "20%"}}>
          <h1>Welcome!</h1>
          <p>This is Pokéfight, a small app for Pokébouts!</p>
          <p>Follow these steps for your Pokéfight!</p>
          <ol>
            <li>Browse the Pokemon.</li>
            <li>Select two Pokémon to enter the arena.</li>
            <li>Enter the arena and let your fighters compete.</li>
            <li>See the results! You may submit the fight to the Leaderboard.</li>
          </ol>
        </div>
        <div className='btn-n' style={{ display: "flex", justifyContent: "space-between" }}>
         <NavLink to="/pokedex">Goo</NavLink>
        </div>
      </Col>
    </Row>
  );
}

export default Welcome;