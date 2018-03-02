import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as playerActions from '../redux/actions/player';
import * as queueActions from '../redux/actions/queue';
import Queue from './podcast-queue';

const bindActions = Object.assign({}, playerActions, queueActions);

function PodcastEpisodeList(props) {
  const { item: episodes = [] } = props;

  const formattedEps = episodes.map(({ enclosure, title: [title] }) => ({
    title,
    src: enclosure[0].$.url,
  }));

  const containerStyle = {
    display : "flex",
    flexDirection : "row",
    flex : "1",
    padding: "10px"
  }

  const podcastListStyle = {
    width : '70%',
    border: '2px solid white',

  }

  const queueStyle = {
    textAlign: "center",
    alignItem: "center",
    border: '2px solid white',
  }

  return (
    <div style={containerStyle}>
      <div style={podcastListStyle}>
        <h1>Podcasts</h1>
        {formattedEps.map((ep, index) => (
          <div key={`${ep.title}-${index}`}>
            <h3>{ep.title}</h3>
            <button onClick={() => props.loadPodcastEpisode(ep)}>Play</button>
            <button onClick={()=>props.addToQueue(ep)}>Queue</button>
          </div>
        ))}
      </div>
      <div style = {queueStyle}>
        <h1>My Queue</h1>
        <Queue />
      </div>
    </div>);
}

PodcastEpisodeList.propTypes = {
  loadPodcastEpisode: PropTypes.func.isRequired,
  title: PropTypes.array,
  item: PropTypes.array,
};

const mapStateToProps = (state, { match }) => state.podcasts[match.params.slug] || {};
const mapDispatchToProps = (dispatch) => bindActionCreators(bindActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PodcastEpisodeList);
