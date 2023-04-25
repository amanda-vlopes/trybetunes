import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  state = {
    musicas: [],
    artistName: '',
    imagemURL: '',
    albumName: '',
    albumYear: '',
    numberSongs: '',
    favoriteSongs: [],
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    let musicas = await getMusics(id);
    musicas = musicas.filter((musica) => musica.trackName);
    const favoriteSongs = await getFavoriteSongs();
    const quatro = 4;
    const albumYear = musicas[0].releaseDate.slice(0, quatro);
    this.setState({
      musicas,
      artistName: musicas[0].artistName,
      imagemURL: musicas[0].artworkUrl100,
      albumName: musicas[0].collectionName,
      albumYear,
      numberSongs: musicas[0].trackCount,
      favoriteSongs,
      loading: false,
    });
  }

  render() {
    const { match } = this.props;
    const { url } = match;
    const { musicas, artistName, imagemURL,
      albumName, favoriteSongs, loading, albumYear, numberSongs } = this.state;
    return (
      <>
        <Header url={ url } />
        <div className="page_album">
          {loading
            ? (<Carregando />)
            : (
              <div className="album_container">
                <div data-testid="page-album" className="album_selected">
                  <div className="album_selected_info">
                    <img src={ imagemURL } alt={ artistName } />
                    <div>
                      <h2
                        data-testid="album-name"
                        className="album_selected_name"
                      >
                        { albumName }
                      </h2>
                      <h3
                        data-testid="artist-name"
                        className="album_selected_artist"
                      >
                        { `${artistName} - ${albumYear} - ${numberSongs} songs` }
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="musics_div">
                  {
                    musicas.map((musica, index) => (
                      <MusicCard
                        key={ index }
                        musica={ musica }
                        isFavorite={
                          favoriteSongs.some(({ trackId }) => trackId === musica.trackId)
                        }
                      />
                    ))
                  }
                </div>
              </div>
            )}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    url: PropTypes.string,
  }).isRequired,
};
