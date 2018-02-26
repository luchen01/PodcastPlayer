import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { default as Player } from 'react-h5-audio-player';
import './audioPlayer.css';

import * as playerActions from '../redux/actions/player';

class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.playbackInstance = null;
    this.state = {
      playbackInstanceName: null,
      playbackInstancePosition: null,
      playbackInstanceDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isBuffering: true,
      volume: 1.0,
      rate: 1.0,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps, this.state)

    const hasNewAudioURLToPlay = nextProps.audioURL.length &&
      nextProps.audioURL !== this.props.audioURL;
    if (hasNewAudioURLToPlay) {
      const shouldPlay = true;
      /*
      this._loadNewPlaybackInstance(
        shouldPlay,
        nextProps.audioURL,
        nextProps.audioTitle,
      );
      */
    }
  }

  onPlay = (e) => {
    // console.log("onPlay", e)
  }

  onEnded = (e) => {
    console.log("onEnded", e)
    this.props.finishEpisodePlayback()
  }

  onError = (e) => {
    // console.log("onError", e)
  }

  render() {
    const {audioTitle, audioURL} = this.props
    return (
      <div>
        <p>{audioTitle}</p>
        <Player
          className="audio-player"
          autoPlay
          src={audioURL}
          loop={false}
          muted={false}
          onPlay={this.onPlay}
          onEnded={this.onEnded}
          onError={this.onError}
        />
      </div>
    )
  }
}

AudioPlayer.propTypes = {
  audioURL: PropTypes.string,
  audioTitle: PropTypes.string,
  finishEpisodePlayback: PropTypes.func.isRequired,
}

const mapStateToProps = ({ player }) => ({ audioURL: player.src, audioTitle: player.title });
const mapDispatchToProps = (dispatch) => bindActionCreators(playerActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AudioPlayer);
