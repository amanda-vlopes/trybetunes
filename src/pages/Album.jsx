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
    favoriteSongs: [],
    loading: false,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    let musicas = await getMusics(id);
    musicas = musicas.filter((musica) => musica.trackName);
    this.setState({
      musicas,
      artistName: musicas[0].artistName,
      imagemURL: musicas[0].artworkUrl100,
      albumName: musicas[0].collectionName,
      loading: true,
    });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs,
      loading: false,
    });
  }

  render() {
    const { musicas, artistName, imagemURL,
      albumName, favoriteSongs, loading } = this.state;
    return (
      <>
        <Header />
        {loading
          ? (<Carregando />)
          : (
            <div>
              <div data-testid="page-album">
                <div>
                  <img src={ imagemURL } alt={ artistName } />
                  <h2 data-testid="album-name">{ albumName }</h2>
                  <h3 data-testid="artist-name">{ artistName }</h3>
                </div>
              </div>
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
          )}
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
