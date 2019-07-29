import React from "react";
import { Image, Dimensions, TouchableHighlight } from "react-native";
import { MAPBOX_TOKEN } from "react-native-dotenv";
import PropTypes from "prop-types";

const StaticMap = ({ coordinate, width, onPress }) => {
  if (!coordinate) return null;

  // static image
  const coordinateString = `${coordinate.longitude},${coordinate.latitude}`;
  const apiUrl = "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static";
  const imageUrl = `${apiUrl}/pin-l(${coordinateString})/${coordinateString},14.0,0,0/450x300?access_token=${MAPBOX_TOKEN}`;

  const containerStyle = {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#444"
  };
  const windowSize = Dimensions.get("window");
  const imageWidth = width || windowSize.width;
  const imgStyle = {
    width: imageWidth,
    height: (200 * imageWidth) / 300
  };

  // return image
  return (
    <TouchableHighlight
      style={containerStyle}
      underlayColor={null}
      onPress={onPress}
    >
      <Image source={{ uri: imageUrl }} style={imgStyle} />
    </TouchableHighlight>
  );
};

StaticMap.propTypes = {
  coordinate: PropTypes.object,
  width: PropTypes.number,
  onPress: PropTypes.func
};

export default StaticMap;
