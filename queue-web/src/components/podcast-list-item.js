import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './podcast-list-item.css';

function PodcastListItem(props) {
  const {
    slug,
    image = [],
    imageFallbackURL,
  } = props;
  const imgUrl = image[0] ? image[0].url[0] : imageFallbackURL;

  return <Link to={`/podcast/${slug}`} className="podcast-list-item">
    <img src={imgUrl}/>
  </Link>
}

PodcastListItem.propTypes = {
  title: PropTypes.array,
  slug: PropTypes.string,
  image: PropTypes.array,
  imageFallbackURL: PropTypes.string,
};

export default PodcastListItem;
