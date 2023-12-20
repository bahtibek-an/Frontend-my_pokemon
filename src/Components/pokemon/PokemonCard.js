import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import spinner from '../pokemon/spinner.gif';

const Sprite = styled.img`
  width: 5em;
  height: 5em;
`;

const CustomCard = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -ms-user-select: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default class PokemonCard extends Component {
  state = {
    name: '',
    imageUrl: '',
    pokemonIndex: '',
    imageLoading: true,
    tooManyRequests: false,
  };

  componentDidMount() {
    const { name, url } = this.props;
    const pokemonIndex = url.split("/")[url.split('/').length - 2];
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;

    this.setState({
      name,
      imageUrl,
      pokemonIndex,
    });
  }

  render() {
    const { name, tooManyRequests, imageLoading, pokemonIndex } = this.state;
    return (
      <div className='col-md-3 col-sm-6 mb-5'>
        <StyledLink to={`/pokemon/${pokemonIndex}`}>
          <CustomCard className='card'>
            <h5 className='card-header'>{pokemonIndex}</h5>
            {imageLoading ? (
              <img
                src={spinner}
                style={{ width: "5em", height: "5em" }}
                className="card-img-top rounded mx-auto d-block mt-2"
                alt="loading"
              />
            ) : null}
            <Sprite
              className="card-img-top rounded mx-auto mt-2"
              style={
                tooManyRequests ? { display: "none" } :
                imageLoading ? null : { display: "block" }
              }
              onLoad={() => this.setState({ imageLoading: false })}
              onError={() => this.setState({ tooManyRequests: true })}
              src={this.state.imageUrl}
              alt={name}
            />
            {tooManyRequests ? (
              <h6 className='mx-auto'>
                <span className="badge badge-danger mt-2">too many requests</span>
              </h6>
            ) : null}
            <div className='card-body mx-auto'>
              <h6 className='card-title'>
                {name.toLowerCase().split(" ").map(letter => letter.charAt(0).toUpperCase() + letter.substring(1)).join(' ')}
              </h6>
            </div>
          </CustomCard>
        </StyledLink>
      </div>
    );
  }
}
