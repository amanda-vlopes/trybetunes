import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    artistInput: '',
    buttonDisabled: true,
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    const tamanhoMinimo = 2;
    this.setState({
      [name]: value,
      buttonDisabled: value.length < tamanhoMinimo,
    });
  };

  render() {
    const { artistInput, buttonDisabled } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <form action="">
            <input
              type="text"
              name="artistInput"
              id="artistInput"
              data-testid="search-artist-input"
              onChange={ this.onInputChange }
              value={ artistInput }
            />
            <button
              data-testid="search-artist-button"
              disabled={ buttonDisabled }
            >
              Pesquisar
            </button>
          </form>
        </div>
      </>
    );
  }
}
