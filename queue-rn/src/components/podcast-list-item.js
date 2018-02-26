import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

function PodcastListItem(props) {
  const {
    slug,
    image = [],
    imageFallbackURL,
    navigation,
  } = props;
  const imgUrl = image[0] ? image[0].url[0] : imageFallbackURL;
  const imageSource = {
    uri: imgUrl,
  };

  const onPressCallback = () => {
    navigation.navigate('PodcastEpisodeList', { slug });
  };

  return (
    <View style={styles.podcastListItemContainer} >
      <TouchableOpacity
        style={styles.itemImageContainer}
        onPress={onPressCallback}
      >
        <Image source={imageSource} style={styles.itemImage} />
      </TouchableOpacity>
    </View>
  );
}

PodcastListItem.propTypes = {
  title: PropTypes.array,
  slug: PropTypes.string,
  image: PropTypes.array,
  imageFallbackURL: PropTypes.string,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  podcastListItemContainer: {
    margin: 5,
    alignItems: 'center',
  },
  itemImageContainer: {
    height: 300,
    width: 300,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  itemImage: {
    height: '100%',
    width: '100%',
  },
});

export default PodcastListItem;
