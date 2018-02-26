import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as playerActions from '../redux/actions/player';

function PodcastEpisodeList(props) {
  const { item: episodes = [] } = props;

  const formattedEps = episodes.map(({ enclosure, title: [title] }) => ({
    title,
    src: enclosure[0].$.url,
  }));

  return <div>
    {
      formattedEps.map((ep, index) => (
        <div
          key={`${ep.title}-${index}`}
          onClick={() => props.loadPodcastEpisode(ep)}
        >
          <h3>{ep.title}</h3>
        </div>
      ))
    }
  </div>;
}

PodcastEpisodeList.propTypes = {
  loadPodcastEpisode: PropTypes.func.isRequired,
  title: PropTypes.array,
  item: PropTypes.array,
};

const mapStateToProps = (state, { match }) => state.podcasts[match.params.slug] || {};
const mapDispatchToProps = (dispatch) => bindActionCreators(playerActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PodcastEpisodeList);
