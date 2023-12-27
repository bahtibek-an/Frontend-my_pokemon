import React, { useState, useEffect } from 'react';
import { NavLink, useOutletContext, Outlet } from 'react-router-dom';
import { Button, Layout } from 'antd';
import { CloseOutlined } from '@ant-design/icons'
import '../App.css';

const { Content, Sider } = Layout

let siderStyle = {
  padding: '2rem',
  textAlign: 'center',
  color: 'white',
  backgroundColor: 'rgb(10, 40, 95)'
};

function Pokedex() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [setTitle, fighters, setFighters, crumbs, setCrumbs, result, setResult] = useOutletContext()

  useEffect(() => setTitle('Pokedex'), [])

  function onDelete(event) {
    event.preventDefault();
    let el = fighters.find(i => i.name.english == event.currentTarget.parentNode.getAttribute('id'))
    if (fighters.length <= 0) return
    if (fighters[0] == fighters[1]) return setFighters([fighters[0]])
    return setFighters(prev => prev.filter(e => e != el))
  }

  return (
    <Layout style={{ height: '100%' }}>
      {fighters.length != 0 &&
        <Sider className="fight-list" style={siderStyle} width='20%'  >
          <h2>Your fighters:</h2>
          {fighters.length > 0 && fighters.map((e, index) =>
            <div className="fighters" id={e.name.english}>
              <div className='fighter' key={index}>{e.name.english}</div>
              <Button style={{ top: "2px", fontWeight: "bold" }} onClick={onDelete} shape="circle" danger ghost><CloseOutlined /></Button>
            </div>
          )}
          {fighters.length == 2 && <NavLink to='/pokefight'><Button style={{ marginTop: "3rem" }} type="primary" danger>Go to Arena</Button></NavLink>}
        </Sider>}
      <Content style={{ height: '100%' }}>
        <Outlet context={[setTitle, fighters, setFighters, crumbs, setCrumbs, result, setResult]} />
      </Content>
    </Layout>
  );
}

export default Pokedex;
