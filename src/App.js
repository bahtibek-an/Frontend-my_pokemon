import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './Components/Layouts/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashBoard from './Components/Layouts/pokemonDashBoard';
import backgroundImage from './pattern.png';
import Pokemon from './Components/pokemon/Pokemon';

function App() {
  return (
    <Router>
      <div className="App" style={{ background: `url(${backgroundImage})` }}>
        <NavBar />
        <div className='container'>
          <Switch>
            <Route exact path="/" component={DashBoard} />
            <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
