import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

export default class MusicCard extends Component {
  state = {
    loading: false,
    isChecked: false,
  };

  async componentDidMount() {
    const { musica, favoriteSongs } = this.props;
    const checked = favoriteSongs.some(({ trackId }) => trackId === musica.trackId);
    this.setState({ isChecked: checked });
  }

  onCheckChange = async ({ target }) => {
    const { checked } = target;
    const { musica } = this.props;
    this.setState({ loading: true });
    if (checked) {
      await addSong(musica);
      this.setState({ isChecked: true });
    } else {
      await removeSong(musica);
      this.setState({ isChecked: false });
    }
    this.setState({ loading: false });
  };

  render() {
    const { musica } = this.props;
    const { previewUrl, trackName, trackId } = musica;
    const { loading, isChecked } = this.state;
    return (
      <div>
        {loading
          ? (<Carregando />)
          : (
            <div>
              <h3>{ trackName }</h3>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor={ trackName } data-testid={ `checkbox-music-${trackId}` }>
                Favorita
                <input
                  type="checkbox"
                  name={ trackName }
                  id={ trackName }
                  onChange={ this.onCheckChange }
                  checked={ isChecked }
                />
              </label>
            </div>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musica: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  favoriteSongs: PropTypes.shape([]).isRequired,
};
