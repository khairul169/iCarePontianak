import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import MapView from "react-native-maps";
import PropTypes from "prop-types";

const MiniMap = ({ style, height, borderRadius, onPress }) => {
  const mapStyle = [styles.container, { height, borderRadius }, style];
  return (
    <TouchableHighlight onPress={onPress} underlayColor={null}>
      <View style={mapStyle}>
        <MapView
          style={styles.mapView}
          scrollEnabled={false}
          zoomEnabled={false}
          pitchEnabled={false}
          rotateEnabled={false}
        />
      </View>
    </TouchableHighlight>
  );
};

MiniMap.propTypes = {
  style: PropTypes.any,
  height: PropTypes.number,
  borderRadius: PropTypes.number,
  onPress: PropTypes.func
};

MiniMap.defaultProps = {
  height: 200
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden"
  },
  mapView: {
    flex: 1
  }
});

export default MiniMap;
