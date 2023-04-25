import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

export default class MusicCard extends Component {
  state = {
    loading: false,
    isChecked: false,
  };

  async componentDidMount() {
    const { isFavorite } = this.props;
    this.setState({ isChecked: isFavorite });
  }

  onCheckChange = async ({ target }) => {
    const { checked } = target;
    const { musica, getSongsFavorites } = this.props;
    this.setState({ loading: true });
    if (checked) {
      await addSong(musica);
      this.setState({ isChecked: true });
    } else {
      await removeSong(musica);
      this.setState({ isChecked: false });
    }
    this.setState({ loading: false });
    getSongsFavorites();
  };

  render() {
    const { musica } = this.props;
    const { previewUrl, trackName } = musica;
    const { loading, isChecked } = this.state;
    return (
      <div className="music_container">
        <div className="music_card">
          <div className="music_audio">
            <h3>{ trackName }</h3>
            <AudioPlayer
              src={ previewUrl }
              volume={ 0.02 }
              showJumpControls={ false }
            />
            {/* <audio src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio> */}
          </div>
          {loading
            ? (<Carregando />)
            : (
              <label
                htmlFor={ trackName }
                className={ `material-symbols-outlined 
                    ${isChecked ? 'favorite' : ''}` }
              >
                favorite
                <input
                  type="checkbox"
                  name={ trackName }
                  id={ trackName }
                  onChange={ this.onCheckChange }
                  checked={ isChecked }
                  className="favorite_checkbox"
                />
              </label>
            )}
        </div>
      </div>
    );
  }
}

MusicCard.defaultProps = {
  getSongsFavorites: () => {},
};

MusicCard.propTypes = {
  musica: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  getSongsFavorites: PropTypes.func,
};
