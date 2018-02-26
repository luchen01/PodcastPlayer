import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import horizonsH from '../images/horizonsH.png';
import Podcast from '../components/podcast-list-item';
import { hqueueBlack, hqueueBackground } from '../components/colors';

function PodcastList(props) {
  const { podcasts = [], navigation } = props;
  const titles = Object.keys(podcasts);
  const podcastElements = titles.map((title) => {
    const podcast = podcasts[title];
    const imageFallbackURL = podcast['itunes:image'][0].$.href;
    return (
      <Podcast
        key={title}
        navigation={navigation}
        imageFallbackURL={imageFallbackURL}
        {...podcast}
      />
    );
  });

  const spinnerMarkup = (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size="large" color={hqueueBlack} />
    </View>
  );

  return (
    <View style={styles.container}>
      {
        podcastElements.length ? (
          <ScrollView contentContainerStyle={styles.podcastList} >
            {podcastElements}
          </ScrollView>
        ) : spinnerMarkup
      }
    </View>
  );
}

const PodcastListHeader = () => (
  <SafeAreaView style={styles.podcastListHeaderSafeAreaiPhoneX}>
    <View style={styles.podcastListHeader}>
      <Image source={horizonsH} style={{height: 29, width: 31}}/>
    </View>
  </SafeAreaView>
);

PodcastList.navigationOptions = () => ({
  header: PodcastListHeader,
});

PodcastList.propTypes = {
  podcasts: PropTypes.object,
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: hqueueBackground,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: hqueueBackground,
  },
  podcastList: {
    justifyContent: 'space-around',
    alignItems: 'center',

    backgroundColor: hqueueBackground,
    padding: 20,
  },
  podcastListHeaderSafeAreaiPhoneX: {
    backgroundColor: 'white',
  },
  podcastListHeader: {
    justifyContent: 'center',
    alignItems: 'center',

    paddingTop: Platform.OS === 'ios' ? 10 : 30,
    paddingBottom: 10,

    backgroundColor: hqueueBackground,
  },
  podcastListHeaderIcon: {
    height: 10,
    width: 10,
  },
});

const mapStateToProps = ({ podcasts }) => ({ podcasts });

export default connect(
  mapStateToProps,
)(PodcastList);
