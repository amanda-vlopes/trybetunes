import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    loading: false,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.getSongsFavorites();
  }

  getSongsFavorites = async () => {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs,
      loading: false,
    });
  };

  render() {
    const { match } = this.props;
    const { url } = match;
    const { favoriteSongs, loading } = this.state;
    return (
      <>
        <Header url={ url } />
        <div data-testid="page-favorites">
          {loading
            ? (<Carregando />)
            : (
              favoriteSongs.map((musica, index) => (
                <MusicCard
                  key={ index }
                  musica={ musica }
                  isFavorite
                  getSongsFavorites={ this.getSongsFavorites }
                />
              ))
            )}
        </div>
      </>
    );
  }
}

Favorites.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
