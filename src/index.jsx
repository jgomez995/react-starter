/* eslint-disable no-console */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import Axios from 'axios';
import localforage from 'localforage';

const API_ENPOINT = 'https://pokeapi.co/api/v2/pokemon/?limit=150'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePokemon: {
        id: null,
        name: null,
      },
      loading: true,
      pokemons: [],
    };
  }

  componentDidMount() {
    localforage.getItem('pokemonList')
      .then((p) => {
        const isCached = Boolean(p);
        if (!isCached) {
          Axios.get(API_ENPOINT)
            .then((r) => {
              const pokemons = r.data;
              localforage.setItem('pokemonList', pokemons.results);
              this.setState({
                pokemons: pokemons.results,
                loading: false,
              });
            });
        } else {
          this.setState({
            pokemons: p,
            loading: false,
          });
        }
      });
  }

  setActivePokemon(pokemonObj) {
    this.setState({
      activePokemon: pokemonObj,
    });
  }

  render() {
    const { activePokemon, pokemons } = this.state;

    return (
      <div>
        {/* <Master active={activePokemon} />
        <Slave /> */}
        {pokemons.map(v => (<p key={v.name}>{v.name}</p>))}
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('react'));
export default App;
