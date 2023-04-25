import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
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
    try {
      const albuns = await searchAlbumsAPI(artistInput);
      this.setState((prevState) => ({
        artistInput: '',
        artistaProcurado: prevState.artistInput,
        loading: false,
        buttonDisabled: true,
        albuns,
        search: true,
      }));
    } catch (erro) {
      Swal.fire({
        text: 'Albuns indisponíveis no momento',
        icon: 'warning',
        title: 'Ops',
        background: 'var(--bg-color)',
        color: 'white',
        iconColor: 'white',
        timer: 2000,
        confirmButtonColor: 'var(--button-color)',
      });
    }
  };

  render() {
    const { match } = this.props;
    const { url } = match;
    const { artistInput, buttonDisabled, loading,
      albuns, artistaProcurado, search } = this.state;
    return (
      <div className="search__page">
        <Header url={ url } />
        <div data-testid="page-search" className="search__div">
          <div className="input_div">
            <input
              type="text"
              name="artistInput"
              id="artistInput"
              data-testid="search-artist-input"
              onChange={ this.onInputChange }
              value={ artistInput }
              placeholder="What do you want to listen to?"
            />
            <button
              data-testid="search-artist-button"
              disabled={ buttonDisabled }
              onClick={ this.handleSearchArtist }
              className="button-search"
            >
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>
          <h3>
            {albuns.length > 0
              ? (
                <p className="result_artist">
                  {'Album results from '}
                  <span className="result_artist_name">
                    {artistaProcurado}
                  </span>
                </p>
              )
              : (search && <p>Nenhum álbum foi encontrado</p>)}
          </h3>
          {loading
            ? (<Carregando />)
            : (
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
            )}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
