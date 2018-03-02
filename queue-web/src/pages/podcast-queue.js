import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Link } from 'react-router-dom';
import * as queueActions from '../redux/actions/queue';
import * as playerActions from '../redux/actions/player';

const bindActions = Object.assign({}, playerActions, queueActions);

// import './podcast-list-item.css';

function PodcastQueue(props) {

  const { queue = [] } = props;


  return (
    <div>
      {/* <h1>My Play Queue</h1> */}
      {queue.length < 1 ?
        <h1>You have no episodes on queue </h1> :
        Array.from(queue).map((ep, index) => (
          <div key={`${ep.title}-${index}`}>
            <h3>{ep.title}</h3>
            <button onClick={() => props.loadPodcastEpisode(ep)}>Play</button>
            <button onClick={() => props.deleteFromQueue(ep)}>Delete</button>

          </div>
        ))
      }
    </div>
  )
}

PodcastQueue.propTypes = {
  // queue: PropTypes.array,
  // title: PropTypes.array,
  // slug: PropTypes.string,
  // image: PropTypes.array,
  // imageFallbackURL: PropTypes.string,
};

const mapStateToProps = ({queue}) => ({queue});
const mapDispatchToProps = (dispatch) => bindActionCreators(bindActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PodcastQueue);
