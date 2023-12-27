import React, { useState, useEffect } from 'react';
import { NavLink, useOutletContext } from 'react-router-dom';
import { Button, Layout, Card, Row, Col } from 'antd';
import URL_SERVER_DOMAIN from '../URL_SERVER_DOMAIN.js';
import '../App.css';

const { Content } = Layout

const cardStyle = { margin: '1rem 0' }

function Winner() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [setTitle, fighters, setFighters, crumbs, setCrumbs, result, setResult] = useOutletContext()
  const [loadingButton, setLoadingButton] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  setTitle(`${result[0]?.name?.english} won!`)

  useEffect(() => {
    setCrumbs([{ title: <NavLink to='/'>Home</NavLink> }, { title: <NavLink to='/winner'>Winner</NavLink> }])
  }, [])

  let raw = JSON.stringify({
    winner: result[0]?.name?.english,
    loser: result[1]?.name?.english,
    date: new Date()
  });

  let fetchData = {
    method: 'POST',
    body: raw,
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    credentials: "same-origin"
  }

  function onSubmit(event) {
    event.preventDefault()
    console.log('submit triggered')
    fetch(`https://${URL_SERVER_DOMAIN}/leaderboard/save`, fetchData)
      .then((res) => res.json())
      .then(
        function (entries) {
          console.log('POST to SERVER')
          console.log(entries)
        }
      )
      .catch((e) => {
        setError(e.message);
      })

    setLoadingButton((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[0] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadingButton((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[0] = false;
        setSubmitted(true);
        return newLoadings;
      });
    }, 2000);
  }

  return (
    <Content style={{ height: "100%" }}>
      <Layout style={{ width: '100%', position: 'relative', height: "100%" }}>
        <Row style={{ height: "100%", overflow: "scroll" }}>
          <Col className="gutter-row" span={15} offset={5}>
            <div className="winner">
              <h1>Congratulations!</h1>
              <p>{result[0]?.name?.english} won!</p>
            </div>
            {Object.keys(result[0]).length > 0 &&
              <Card title={result[0]?.name?.english} hoverable='true' style={cardStyle}>
                <div className="category">
                  <span className="category-title">Names:</span>
                  <div>{Object.keys(result[0]?.name).map(key => <span>{key[0].toUpperCase() + key.slice(1)}: {result[0]?.name[key]}</span>)}</div>
                </div>
                <div className="category">
                  <span className="category-title">Type:</span>
                  <div>{result[0]?.type?.map(e => <span>{e}</span>)}</div>
                </div>
                <div className="category">
                  <span className="category-title">Base:</span>
                  <div className="info">
                    <span>HP: {result[0]?.base?.HP}</span>
                    <span>Attack: {result[0]?.base?.Attack}</span>
                    <span>Defense: {result[0]?.base?.Defense}</span>
                    <span>Sp. Attack: {result[0]?.base['Sp. Attack']}</span>
                    <span>Sp. Defense: {result[0]?.base['Sp. Defense']}</span>
                    <span>Speed: {result[0]?.base?.Speed}</span>
                  </div>
                </div>
              </Card>}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: '2rem' }}>
              {!submitted && <Button loading={loadingButton[0]} onClick={onSubmit}>Submit to Leaderboard</Button>}
              <NavLink to='/leaderboard'><Button>See Leaderboard</Button></NavLink>
            </div>
          </Col>
        </Row>
      </Layout>
    </Content>
  );
}

export default Winner;