import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const POKEMON_TYPE_COLORS = {
  beetle: 'B1C12E',
  dark_fighter: '4F3A2D',
  dragon: '755EDF',
  electric: 'FCBC17',
  fairy: 'F4B1F4',
  fighting: '823551D',
  blaze: 'E73B0C',
  aerial: 'A3B3F7',
  phantom: '6060B2',
  grass: '74C236',
  earth: 'D3B357',
  ice: 'A3E7FD',
  normal: 'C8C4BC',
  toxic: '934594',
  psychic: 'ED4882',
  rock: 'B9A156',
  steel: 'B5B5C3',
  water: '3295F6'
};

export default class PokemonDetails extends Component {
  state = {
    pokemonName: '',
    pokemonIndex: '',
    imageUrl: '',
    pokemonTypes: [],
    pokemonStats: {},
    pokemonHeight: '',
    pokemonWeight: '',
    pokemonAbilities: '',
    pokemonDescription: '',
    genderRatioFemale: '',
    genderRatioMale: '',
    pokemonCatchRate: '',
    pokemonEggGroups: '',
    pokemonHatchSteps: '',
    pokemonThemeColor: '#EF5350'
  };

  async initializePokemon() {
    const { pokemonIndex } = this.props.match.params;
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    const pokemonData = await Axios.get(pokemonUrl);
    const pokemonName = pokemonData.data.name;
    const pokemonImageUrl = pokemonData.data.sprites.front_default;

    let pokemonStats = {};
    pokemonData.data.stats.forEach(stat => {
      pokemonStats = { ...pokemonStats, [stat.stat.name]: stat.base_stat };
    });

    const pokemonHeight = Math.round((pokemonData.data.height * 0.328084 + 0.00001) * 100) / 100;
    const pokemonWeight = Math.round((pokemonData.data.weight * 0.220462 + 0.00001) * 100) / 100;
    const pokemonTypes = pokemonData.data.types.map(type => type.type.name);
    const pokemonThemeColor = `#${POKEMON_TYPE_COLORS[pokemonTypes[pokemonTypes.length - 1]]}`;

    const pokemonAbilities = pokemonData.data.abilities
      .map(ability => ability.ability.name
        .toLowerCase()
        .split('-')
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ')
      )
      .join(', ');

    let pokemonDescription = '';
    let genderRatioFemale = '';
    let genderRatioMale = '';
    let pokemonCatchRate = '';
    let pokemonEggGroups = '';
    let pokemonHatchSteps = '';

    await Axios.get(pokemonSpeciesUrl).then(res => {
      const englishFlavor = res.data.flavor_text_entries.find(flavor => flavor.language.name === 'en');
    
      if (englishFlavor) {
        pokemonDescription = englishFlavor.flavor_text;
      }
      
      const femaleRate = res.data['gender_rate'];
      genderRatioFemale = 12.5 * femaleRate;
      genderRatioMale = 12.5 * (8 - femaleRate);
    
      pokemonCatchRate = Math.round((100 / 255) * res.data['capture_rate']);
    
      pokemonEggGroups = res.data['egg_groups']
        .map(group => group.name
          .toLowerCase()
          .split(' ')
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ')
        )
        .join(', ');
    
      pokemonHatchSteps = 255 * (res.data['hatch_counter'] + 1);
    });
    
    this.setState({
      pokemonName,
      pokemonIndex,
      imageUrl: pokemonImageUrl,
      pokemonTypes,
      pokemonStats,
      pokemonHeight,
      pokemonWeight,
      pokemonAbilities,
      pokemonDescription,
      genderRatioFemale,
      genderRatioMale,
      pokemonCatchRate,
      pokemonEggGroups,
      pokemonHatchSteps,
      pokemonThemeColor
    });
  }

  componentDidMount() {
    this.initializePokemon();
  }

  render() {
    const {
      pokemonName,
      pokemonIndex,
      imageUrl,
      pokemonTypes,
      pokemonStats,
      pokemonHeight,
      pokemonWeight,
      pokemonAbilities,
      pokemonDescription,
      genderRatioFemale,
      genderRatioMale,
      pokemonCatchRate,
      pokemonEggGroups,
      pokemonHatchSteps,
      pokemonThemeColor
    } = this.state;

    return (
      <div className="col">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-5">
                <h5>{pokemonIndex}</h5>
              </div>
              <div className="col-7">
                <div className="float-right">
                  {pokemonTypes.map(type => (
                    <span
                      key={type}
                      className="badge badge-pill mr-1"
                      style={{ backgroundColor: `#${POKEMON_TYPE_COLORS[type]}`, color: 'white' }}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-3">
                <img src={imageUrl} className="card-img-top rounded mx-auto mt-2" alt={pokemonName} />
              </div>
              <div className="col-md-9">
                <h4 className="mx-auto">{pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}</h4>
                {Object.entries(pokemonStats).map(([statName, statValue]) => (
                  <div className="row align-items-center" key={statName}>
                    <div className="col-12 col-md-3">{statName.toUpperCase()}</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${statValue}%`,
                            backgroundColor: pokemonThemeColor
                          }}
                          aria-valuenow={statValue}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{statValue}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="row mt-1">
              <div className="col">
                <p className="">{pokemonDescription}</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="card-body">
            <h5 className="card-title text-center">Details</h5>
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-6">
                    <h6 className="float-right">Height:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{pokemonHeight} ft.</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right">Weight:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{pokemonWeight} lbs</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right">Catch Rate:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{pokemonCatchRate}%</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right">Gender Ratio:</h6>
                  </div>
                  <div className="col-6">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${genderRatioFemale}%`,
                          backgroundColor: '#c2185b'
                        }}
                        aria-valuenow={genderRatioFemale}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{genderRatioFemale}</small>
                      </div>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${genderRatioMale}%`,
                          backgroundColor: '#1976d2'
                        }}
                        aria-valuenow={genderRatioMale}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{genderRatioMale}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-6">
                    <h6 className="float-right">Egg Groups:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{pokemonEggGroups} </h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right">Hatch Steps:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{pokemonHatchSteps}</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right">Abilities:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{pokemonAbilities}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">
            <Link to="/" className="card-link">
              <button className="btn btn-secondary">Return</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
