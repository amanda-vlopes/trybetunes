import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

export default class Search extends Component {
  state = {
    artistInput: '',
    buttonDisabled: true,
    loading: false,
    albuns: [],
    resultado: false,
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    const tamanhoMinimo = 2;
    this.setState({
      [name]: value,
      buttonDisabled: value.length < tamanhoMinimo,
    });
  };

  handleSearchArtist = async () => {
    this.setState({ loading: true });
    const { artistInput } = this.state;
    const albuns = await searchAlbumsAPI(artistInput);
    this.setState({
      loading: false,
      albuns,
      resultado: true,
    });
  };

  render() {
    const { artistInput, buttonDisabled, loading, resultado } = this.state;
    const resultArtist = <p>{`Resultado de álbuns de:${artistInput}`}</p>;
    return (
      <>
        <Header />
        {loading
          ? (<Carregando />)
          : (
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
                  onClick={ this.handleSearchArtist }
                  type="button"
                >
                  Pesquisar
                </button>
              </form>
              {resultado && resultArtist}
            </div>
          )}
      </>
    );
  }
}
