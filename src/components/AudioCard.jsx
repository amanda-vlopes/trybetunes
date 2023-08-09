import React, { Component } from 'react';

export default class AudioCard extends Component {
  render() {
    const { srcAudio } = this.props;
    return (
      <div>
        <audio src={ srcAudio }></audio>
        <div className="player">
          <div className="control">
            <i className="fas fa-play"></i>
          </div>
        </div>
      </div>
    );
  }
}
