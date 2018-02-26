import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Slider from 'react-native-slider';
import { Audio } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';

import * as playerActions from '../redux/actions/player';
import {
  hqueueBlack,
  hqueueBackground,
  hqueueHighlightUnderlay,
} from './colors';

const DISABLED_OPACITY = 0.2;
const FONT_SIZE = 16;
const BUTTON_ICON_SIZE = 50;
const BUFFERING_STRING = 'Buffering...';

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

  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });
  }

  componentWillReceiveProps(nextProps) {
    const hasNewAudioURLToPlay = nextProps.audioURL.length &&
      nextProps.audioURL !== this.props.audioURL;
    if (hasNewAudioURLToPlay) {
      const shouldPlay = true;
      this._loadNewPlaybackInstance(
        shouldPlay,
        nextProps.audioURL,
        nextProps.audioTitle,
      );
    }
  }

  async _loadNewPlaybackInstance(shouldPlay, audioURL, audioTitle) {
    if (this.playbackInstance !== null) {
      await this.playbackInstance.unloadAsync();
      this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }

    const source = { uri: audioURL };
    const initialStatus = {
      shouldPlay,
      rate: this.state.rate,
      volume: this.state.volume,
    };

    const { sound } = await Audio.Sound.create(
      source,
      initialStatus,
      this._onPlaybackStatusUpdate
    );
    this.playbackInstance = sound;

    this.setState({
      playbackInstanceName: audioTitle,
    });
  }

  _onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      this.setState({
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
        rate: status.rate,
        volume: status.volume,
      });
      if (status.didJustFinish) {
        this.props.finishEpisodePlayback();
      }
    } else {
      if (status.error) {
        // eslint-disable-next-line no-console
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  _onPlayPausePressed = () => {
    if (this.playbackInstance !== null) {
      if (this.state.isPlaying) {
        this.playbackInstance.pauseAsync();
      } else {
        this.playbackInstance.playAsync();
      }
    }
  };

  _onStopPressed = () => {
    if (this.playbackInstance !== null) {
      this.playbackInstance.stopAsync();
    }
  };

  _onSeekSliderValueChange = () => {
    if (this.playbackInstance !== null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.playbackInstance.pauseAsync();
    }
  };

  _onSeekSliderSlidingComplete = (value) => {
    if (this.playbackInstance !== null) {
      this.isSeeking = false;
      const seekPosition = value * this.state.playbackInstanceDuration;
      if (this.shouldPlayAtEndOfSeek) {
        this.playbackInstance.playFromPositionAsync(seekPosition);
      } else {
        this.playbackInstance.setPositionAsync(seekPosition);
      }
    }
  };

  _getSeekSliderPosition() {
    if (
      this.playbackInstance !== null &&
      this.state.playbackInstancePosition !== null &&
      this.state.playbackInstanceDuration !== null
    ) {
      return (
        this.state.playbackInstancePosition /
        this.state.playbackInstanceDuration
      );
    }
    return 0;
  }

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = (number) => {
      const string = number.toString();
      if (number < 10) {
        return '0' + string;
      }
      return string;
    };
    return padWithZero(minutes) + ':' + padWithZero(seconds);
  }

  _getTimestamp() {
    if (
      this.playbackInstance !== null &&
      this.state.playbackInstancePosition !== null &&
      this.state.playbackInstanceDuration !== null
    ) {
      return `${this._getMMSSFromMillis(
        this.state.playbackInstancePosition
      )} / ${this._getMMSSFromMillis(
        this.state.playbackInstanceDuration
      )}`;
    }
    return '';
  }

  render() {
    const audioDetailsMarkup = this.state.playbackInstanceName ? (
      <View style={styles.detailsContainer}>
        <Text
          style={styles.text}
          numberOfLines={1}
          ellipsizeMode='tail'
        >
          {this.state.playbackInstanceName}
        </Text>
        <Text
          style={styles.text}
          numberOfLines={1}
          ellipsizeMode='tail'
        >
          {this.state.isPlaying && this.state.isBuffering ? (
            BUFFERING_STRING
          ) : (
            this._getTimestamp()
          )}
        </Text>
      </View>
    ) : null;

    return (
      <View style={styles.container}>
        {audioDetailsMarkup}
        <View
          style={[
            styles.buttonsContainerRow,
            {
              opacity: !this.props.audioURL
                ? DISABLED_OPACITY
                : 1.0,
            },
          ]}
        >
          <TouchableHighlight
            underlayColor={hqueueHighlightUnderlay}
            style={styles.wrapper}
            onPress={this._onPlayPausePressed}
            disabled={!this.props.audioURL}
          >
            <View>
              {this.state.isPlaying ? (
                <MaterialIcons
                  name="pause"
                  size={BUTTON_ICON_SIZE}
                  color={hqueueBlack}
                />
              ) : (
                <MaterialIcons
                  name="play-arrow"
                  size={BUTTON_ICON_SIZE}
                  color={hqueueBlack}
                />
              )}
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={hqueueHighlightUnderlay}
            style={styles.wrapper}
            onPress={this._onStopPressed}
            disabled={!this.props.audioURL}
          >
            <View>
              <MaterialIcons
                name="stop"
                size={BUTTON_ICON_SIZE}
                color={hqueueBlack}
              />
            </View>
          </TouchableHighlight>
        </View>
        <View
          style={[
            styles.playbackSliderContainer,
            {
              opacity: !this.props.audioURL
                ? DISABLED_OPACITY
                : 1.0,
            },
          ]}
        >
          <Slider
            style={styles.playbackSlider}
            value={this._getSeekSliderPosition()}
            onValueChange={this._onSeekSliderValueChange}
            onSlidingComplete={this._onSeekSliderSlidingComplete}
            thumbTintColor={hqueueBlack}
            thumbStyle={styles.playbackSliderThumb}
            minimumTrackTintColor={hqueueBlack}
            disabled={!this.props.audioURL}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: hqueueBackground,
    paddingBottom: 30,
    width: '100%',
  },
  detailsContainer: {
    height: 60,
    marginTop: 10,
    padding: 5,
    justifyContent: 'space-around',
    width: '100%',
  },
  playbackSliderContainer: {
    width: '100%',
    height: 50,
    paddingBottom: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playbackSlider: {
    alignSelf: 'stretch',
    marginLeft: 10,
    marginRight: 10,
  },
  playbackSliderThumb: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
  },
  text: {
    width: '100%',
    minHeight: FONT_SIZE,
    paddingLeft: 10,
    paddingRight: 10,

    textAlign: 'center',
    fontSize: FONT_SIZE,
    color: hqueueBlack,
  },
  buttonsContainerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%'
  },
});

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
