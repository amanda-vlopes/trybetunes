import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    artistInput: '',
    artistaProcurado: '',
    buttonDisabled: true,
    loading: false,
    albuns: [],
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
      buttonDisabled: true,
      albuns,
      search: true,
    }));
  };

  render() {
    const { artistInput, buttonDisabled, loading,
      albuns, artistaProcurado, search } = this.state;
    const resultArtist = <p>{`Resultado de álbuns de: ${artistaProcurado}`}</p>;
    return (
      <div className="search__page">
        <Header />
        {loading
          ? (<Carregando />)
          : (
            <div data-testid="page-search" className="search__div">
              <div>
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
                >
                  Pesquisar
                </button>
              </div>
              <h3>
                {albuns.length > 0
                  ? (resultArtist)
                  : (search && <p>Nenhum álbum foi encontrado</p>)}
              </h3>
              <div className="albuns_search">
                { albuns
                  .map(
                    ({ artistName, artworkUrl100, collectionName, collectionId }) => (
                      <div key={ collectionId } className="album_div">
                        <Link
                          to={ `/album/${collectionId}` }
                          data-testid={ `link-to-album-${collectionId}` }
                        >
                          <div className="album_image">
                            <img src={ artworkUrl100 } alt={ collectionName } />
                            <span className="material-symbols-outlined icon_play">
                              play_circle
                            </span>
                          </div>
                          <p className="album_name">{ collectionName }</p>
                          <p className="artist_name">{ artistName }</p>
                        </Link>
                      </div>
                    ),
                  )}
              </div>
            </div>
          )}
      </div>
    );
  }
}
