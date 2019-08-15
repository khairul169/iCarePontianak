import React from 'react';
import {Image, Dimensions, TouchableHighlight} from 'react-native';
import {MAPBOX_TOKEN} from 'react-native-dotenv';
import PropTypes from 'prop-types';

const StaticMap = ({style, coordinate, width, height, onPress}) => {
  if (!coordinate) return null;

  const windowSize = Dimensions.get('window');
  const imageWidth = width || windowSize.width;
  const imageHeight = height || 200;

  // static image
  const coordinateString = `${coordinate.longitude},${coordinate.latitude}`;
  const apiUrl = 'https://api.mapbox.com/styles/v1/mapbox/light-v9/static';
  const imageUrl = `${apiUrl}/pin-l(${coordinateString})/${coordinateString},14.0,0,0/${imageWidth}x${imageHeight}?access_token=${MAPBOX_TOKEN}`;

  const containerStyle = {
    alignItems: 'center',
    justifyContent: 'center',
  };
  const imgStyle = {
    width: imageWidth,
    height: imageHeight,
  };

  // return image
  return (
    <TouchableHighlight
      style={[containerStyle, style]}
      underlayColor={null}
      onPress={onPress}>
      <Image source={{uri: imageUrl}} style={imgStyle} />
    </TouchableHighlight>
  );
};

StaticMap.propTypes = {
  coordinate: PropTypes.object,
  width: PropTypes.number,
  onPress: PropTypes.func,
};

export default StaticMap;
