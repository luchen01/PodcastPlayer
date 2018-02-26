import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Podcast from '../components/podcast-list-item';

function PodcastList(props) {
  const { podcasts = [] } = props;
  const titles = Object.keys(podcasts);
  const podcastElements = titles.map((title) => {
    const podcast = podcasts[title];
    const imageFallbackURL = podcast['itunes:image'][0].$.href;
    return (
      <Podcast
        key={title}
        imageFallbackURL={imageFallbackURL}
        {...podcast}
      />
    );
  });

  const spinnerMarkup = (
    <div>
      Loading...
    </div>
  );

  return (
    <div>
      {
        podcastElements.length ? (
          <div>
            {podcastElements}
          </div>
        ) : spinnerMarkup
      }
    </div>
  );
}
PodcastList.propTypes = {
  podcasts: PropTypes.object,
};

const mapStateToProps = ({ podcasts }) => ({ podcasts });

export default connect(
  mapStateToProps,
)(PodcastList);
