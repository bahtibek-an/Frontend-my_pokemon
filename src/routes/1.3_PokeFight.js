import React, { useState, useEffect } from 'react';
import { NavLink, useOutletContext, useNavigate } from 'react-router-dom';
import { Layout, Button, Card, Row, Col } from 'antd';
import '../App.css';

const cardStyle = { margin: '1rem 0' };

const { Content } = Layout

function PokeFight() {
    const [setTitle, fighters, setFighters, crumbs, setCrumbs, result, setResult] = useOutletContext()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [images, setImages] = useState([]);
    const [loadingButton, setLoadingButton] = useState([])
    const navigate = useNavigate();

    const getData = () => {
        setLoading(true);

        const promises = [];

        const urlFirstFighter = `https://pokeapi.co/api/v2/pokemon/${fighters[0]?.id}`
        const urlSecondFighter = `https://pokeapi.co/api/v2/pokemon/${fighters[1]?.id}`
        promises.push(fetch(urlFirstFighter).then((res) => res.json()))
        promises.push(fetch(urlSecondFighter).then((res) => res.json()));

        Promise.all(promises).then((res) => {
            setImages([res[0].sprites.other['official-artwork'].front_default, res[1].sprites.other['official-artwork'].front_default]);
        })
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
        setTitle(`${fighters[0]?.name.english} vs. ${fighters[1]?.name.english}`)
        setCrumbs([{ title: <NavLink to='/'>Home</NavLink> }, { title: <NavLink to='/pokefight'>Fight</NavLink> }])
    }, [])

    function onFight(event) {
        event.preventDefault()
        console.log(images)
        let winner = fighters[0].base.HP > fighters[1].base.HP ? fighters[0] : fighters[1]
        let loser = fighters.find(e => e != winner) || fighters[0];
        console.log(winner, loser)
        setLoadingButton((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[0] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadingButton((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[0] = false;
                setResult([winner, loser])
                setFighters([])
                navigate("/winner")
                return newLoadings;
            });
        }, 2000);
    }

    return (
        <Content style={{ height: "100%" }}>
            <Layout style={{ width: '100%', position: 'relative', height: "100%" }}>
                <Row style={{ height: "100%", overflow: "scroll" }} justify="space-around">
                    {fighters.length > 0 && images && fighters.map((e, j) =>
                        <Col className="gutter-row" span={8} >
                            <Card
                                cover={<img alt={e.name.english} src={images[j]} />}
                                title={e.name.english} hoverable='true' style={cardStyle}>
                                <div className="category">
                                    <span className="category-title">Type:</span>
                                    <div>{e.type.map((i, index) => <span key={index}>{i}</span>)}</div>
                                </div>
                                <div className="category">
                                    <span className="category-title">Base:</span>
                                    <div>
                                        <span>HP: {e.base.HP}</span>
                                        <span>Attack: {e.base.Attack}</span>
                                        <span>Defense: {e.base.Defense}</span>
                                        <span>Sp. Attack: {e.base['Sp. Attack']}</span>
                                        <span>Sp. Defense: {e.base['Sp. Defense']}</span>
                                        <span>Speed: {e.base.Speed}</span>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    )}
                </Row>
                <Button type="primary" style={{ position: "relative", width: "10%", left: "45%", top: "-50%", padding: "0rem" }} loading={loadingButton[0]} onClick={onFight} danger>FIGHT!</Button>
            </Layout>
        </Content>
    );
}

export default PokeFight;