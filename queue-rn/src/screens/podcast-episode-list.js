import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as playerActions from '../redux/actions/player';
import { hqueueBackground, hqueueBlack } from '../components/colors';


function PodcastEpisodeList(props) {
  const { item: episodes = [] } = props;

  const formattedEps = episodes.map(({ enclosure, title: [title] }) => ({
    title,
    src: enclosure[0].$.url,
  }));

  return (
    <View style={styles.episodeListContainer}>
      <ScrollView>
        {
          formattedEps.map((ep, index) => (
            <TouchableOpacity
              key={`${ep.title}-${index}`}
              style={styles.episodeListItem}
              onPress={() => props.loadPodcastEpisode(ep)}
            >
              <Text
                style={styles.episodeListItemTitle}
                numberOfLines={2}
                ellipsizeMode='tail'
              >
                {ep.title}
              </Text>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </View>
  );
}

PodcastEpisodeList.navigationOptions = ({navigation}) => ({
  headerTitle: `${navigation.state.params.slug}`,
  headerStyle: styles.episodeListHeaderStyle,
  headerTintColor: hqueueBlack,
});

PodcastEpisodeList.propTypes = {
  loadPodcastEpisode: PropTypes.func.isRequired,
  title: PropTypes.array,
  item: PropTypes.array,
};

const styles = StyleSheet.create({
  episodeListHeaderStyle: {
    backgroundColor: hqueueBackground,
    borderBottomWidth: 1,
    borderColor: hqueueBlack,
  },
  episodeListContainer: {
    backgroundColor: hqueueBackground,
    flex: 1,
    paddingTop: 15,
  },
  episodeListItem: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  episodeListItemTitle: {
    fontSize: 14,
    color: 'white',
  },
});

const mapStateToProps = (state, { navigation }) => state.podcasts[navigation.state.params.slug] || {};
const mapDispatchToProps = (dispatch) => bindActionCreators(playerActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PodcastEpisodeList);
