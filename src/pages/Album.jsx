import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  state = {
    musicas: [],
    artistName: '',
    imagemURL: '',
    albumName: '',
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
    });
  }

  render() {
    const { musicas, artistName, imagemURL, albumName } = this.state;
    return (
      <>
        <Header />
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
            />
          ))
        }
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
