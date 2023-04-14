import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

export default class Search extends Component {
  state = {
    artistInput: '',
    artistaProcurado: '',
    buttonDisabled: true,
    loading: false,
    albuns: [],
    resultado: false,
    search: false,
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
    this.setState((prevState) => ({
      artistInput: '',
      artistaProcurado: prevState.artistInput,
      loading: false,
      albuns,
      resultado: true,
      search: true,
    }));
  };

  render() {
    const { artistInput, buttonDisabled, loading,
      resultado, albuns, artistaProcurado, search } = this.state;
    const resultArtist = <p>{`Resultado de álbuns de: ${artistaProcurado}`}</p>;
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
              {albuns.length > 0
                ? (
                  <div>
                    { albuns
                      .map(
                        ({ artistName, artworkUrl100, collectionName, collectionId }) => (
                          <div key={ collectionId }>
                            <Link
                              to={ `/album/${collectionId}` }
                              data-testid={ `link-to-album-${collectionId}` }
                            >
                              <img src={ artworkUrl100 } alt={ collectionName } />
                            </Link>
                            <p>{ collectionName }</p>
                            <p>{ artistName }</p>
                          </div>
                        ),
                      )}
                  </div>
                )
                : (
                  search && <p>Nenhum álbum foi encontrado</p>
                )}
            </div>
          )}
      </>
    );
  }
}
