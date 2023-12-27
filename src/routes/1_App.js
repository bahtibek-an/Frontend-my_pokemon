import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Breadcrumb, Layout, Typography } from 'antd'
import '../App.css'

const { Title } = Typography
const { Footer, Header } = Layout

const topLayoutStyle = {
  border: '1px solid black',
 
  overflow: 'hidden',
  margin: '1rem'
}

const midLayoutStyle = {
  hight: '100%'
}

const headerStyle = {
  margin: '0',
  height: '7rem',
  backgroundColor: "#041E42"
}

const footerStyle = {
  backgroundColor: "#041E42"
}

function App() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [title, setTitle] = useState('Welcome')
  const [fighters, setFighters] = useState([])
  const [crumbs, setCrumbs] = useState([])
  const [result, setResult] = useState([{}, {}])

  return (
    <Layout style={topLayoutStyle}>
      <Header className='header' style={headerStyle}>
        <Title style={{ margin: "0" }}><NavLink className="title" to="/">Pokemon</NavLink></Title>
        
        <Breadcrumb className='navbarr' items={crumbs} />
      </Header>
      <Layout style={midLayoutStyle}>
        <Outlet context={[setTitle, fighters, setFighters, crumbs, setCrumbs, result, setResult]} />
      </Layout>
      <Footer className='footer' style={footerStyle}>
        <ul className='nav'>
          <li ><NavLink to='pokedex' className='title'>Pokemons</NavLink></li>
          <li><NavLink to='about' className='title'>About</NavLink></li>
        </ul>
      </Footer>
    </Layout>
  );
}

export default App;
