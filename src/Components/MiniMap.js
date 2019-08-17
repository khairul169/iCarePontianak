import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableHighlight} from 'react-native';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';

const MiniMap = ({style, height, borderRadius, onPress, coordinate, pin}) => {
  const [mapReady, setMapReady] = useState(false);

  const initialRegion = {
    latitude: -0.0257813,
    longitude: 109.3323449,
    latitudeDelta: 0.015,
    longitudeDelta: 0.02,
  };

  // on coordinate changed
  useEffect(() => {
    if (!coordinate) return;
    this.mapView.animateToRegion({
      ...initialRegion,
      ...coordinate,
    });
  }, [coordinate, initialRegion]);

  const renderMarker = () => {
    if (!mapReady) return;

    if (pin && coordinate) {
      return <MapView.Marker coordinate={coordinate} />;
    }
  };

  const mapStyle = [styles.container, {height, borderRadius}, style];

  return (
    <TouchableHighlight onPress={onPress} underlayColor={null}>
      <View style={mapStyle}>
        <MapView
          ref={ref => {
            this.mapView = ref;
          }}
          initialRegion={initialRegion}
          style={styles.mapView}
          scrollEnabled={false}
          zoomEnabled={false}
          pitchEnabled={false}
          rotateEnabled={false}
          onMapReady={() => setMapReady(true)}>
          {renderMarker()}
        </MapView>
      </View>
    </TouchableHighlight>
  );
};

MiniMap.propTypes = {
  style: PropTypes.any,
  height: PropTypes.number,
  borderRadius: PropTypes.number,
  onPress: PropTypes.func,
  coordinate: PropTypes.object,
  pin: PropTypes.bool,
};

MiniMap.defaultProps = {
  height: 200,
  coordinate: {
    latitude: -0.0257813,
    longitude: 109.3323449,
  },
  pin: true,
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  mapView: {
    flex: 1,
  },
});

export default MiniMap;
