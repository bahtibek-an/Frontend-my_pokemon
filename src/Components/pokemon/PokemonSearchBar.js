import React, { Component } from 'react';

export default class pokemonSearchBar extends Component {
  handleChange = event => {
    const { value } = event.target;
    this.props.onSearch(value);
  };

  render() {
    return (
      <div style={{ marginBottom: '20px' }}>
        <form>
          <input
            placeholder="Pokemon"
            className="form-control mx-auto"
            style={{
              backgroundColor: 'white',
              height: '1.75em',
              width: '45%',
              borderRadius: '15px',
              opacity: '0.8',
              fontSize: '1.5em' // Adjusted the font size to make it smaller
            }}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}