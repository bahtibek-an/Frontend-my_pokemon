import React, { Component } from "react";
import './Navbar.css';
import pikachu from './pikachu.png'

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  handleInputChange = (e) => {
    const value = e.target.value;
    this.setState({ inputValue: value });
    this.props.pokemonFilter(value);
  }

  render() {
    return (
      <div className="nav" style={{ padding: '15px', borderRadius: '0 0 5px 5px'}}>
        <img src={ pikachu } className='logo' alt="Pokemon Logo" />
        <input 
          onChange={this.handleInputChange}
          value={this.state.inputValue}
          className='search'
          type={"text"}
          placeholder="Pokemon search"
        />
      </div>
    );
  }
}

export default Navbar;
