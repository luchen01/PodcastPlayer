import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import configureStore from './src/redux/store';
import PodcastList from './src/screens/podcast-list';
import PodcastEpisodeList from './src/screens/podcast-episode-list';
import AudioPlayer from './src/components/audioPlayer';
import { getPodcasts } from './src/redux/actions/podcasts';

console.ignoredYellowBox = ['Remote debugger is in a background tab which may cause apps to perform slowly'];

const store = configureStore({});

const PodcastsStack = StackNavigator({
  PodcastList: {
    screen: PodcastList,
  },
  PodcastEpisodeList: {
    screen: PodcastEpisodeList,
  },
});

export default class App extends React.Component {
  componentDidMount() {
    store.dispatch(getPodcasts());
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <PodcastsStack />
          <AudioPlayer />
        </View>
      </Provider>
    );
  }
}
