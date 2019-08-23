import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableHighlight} from 'react-native';
import MapView from 'react-native-maps';
import MapMarker from './MapMarker';
import PropTypes from 'prop-types';
import {regionContainingPoints} from 'public/Utils';
import {OpenRouteAPI} from 'public/API';

const MiniMap = ({
  style,
  onPress,
  coordinate,
  mapPadding,
  directionTo,
  markerIcons,
}) => {
  const [mapReady, setMapReady] = useState(false);
  const [directions, setDirections] = useState();

  const initialRegion = {
    latitude: -0.0257813,
    longitude: 109.3323449,
    latitudeDelta: 0.015,
    longitudeDelta: 0.02,
  };

  const fetchDirections = async () => {
    const points = await OpenRouteAPI.getDirection(coordinate, directionTo);
    setDirections(points);
  };

  const onCoordinateChange = () => {
    if (!mapReady || !coordinate || !this.mapView) return;

    let region = initialRegion;
    if (directionTo) {
      region = regionContainingPoints([coordinate, directionTo], 1.5);
      fetchDirections();
    } else {
      region = {...region, ...coordinate};
      setDirections(null);
    }

    this.mapView.animateToRegion(region);
  };

  const renderMarkers = () => {
    if (!mapReady) return;
    const points = [coordinate, directionTo];

    return points.map((item, index) => {
      const icon = markerIcons && markerIcons[index];
      return (
        <MapMarker
          key={index}
          coordinate={item}
          icon={icon && icon.name}
          iconType={icon && icon.type}
          iconColor={icon && icon.color}
        />
      );
    });
  };

  const renderDirection = () => {
    if (!mapReady || !directions) return;
    return (
      <MapView.Polyline
        coordinates={directions}
        strokeWidth={5}
        strokeColor="rgba(34, 62, 230, 0.6)"
      />
    );
  };

  // on coordinate changed
  useEffect(onCoordinateChange, [coordinate, directionTo, mapReady]);

  return (
    <TouchableHighlight onPress={onPress} underlayColor={null}>
      <View style={[styles.container, style]}>
        <MapView
          ref={ref => (this.mapView = ref)}
          initialRegion={initialRegion}
          style={styles.mapView}
          scrollEnabled={false}
          zoomEnabled={false}
          pitchEnabled={false}
          rotateEnabled={false}
          onMapReady={() => setMapReady(true)}
          mapPadding={mapPadding}>
          {renderMarkers()}
          {renderDirection()}
        </MapView>
      </View>
    </TouchableHighlight>
  );
};

MiniMap.propTypes = {
  style: PropTypes.any,
  onPress: PropTypes.func,
  coordinate: PropTypes.any,
  mapPadding: PropTypes.object,
  directionTo: PropTypes.any,
  markerIcons: PropTypes.array,
};

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  mapView: {
    flex: 1,
    minHeight: 1,
  },
});

export default MiniMap;
