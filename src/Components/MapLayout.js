import React, { Component } from "react";
import MapView, { Marker } from "react-native-maps";
import PropTypes from "prop-types";

class MapLayout extends Component {
  static propTypes = {
    style: PropTypes.any,
    coordinate: PropTypes.object,
    markers: PropTypes.array,
    onRegionChanged: PropTypes.func
  };

  static defaultProps = {
    markers: []
  };

  state = {
    region: null,
    userLocation: null,
    animateToUser: true
  };

  initialRegion = {
    latitude: -0.0257813,
    longitude: 109.3323449,
    latitudeDelta: 0.015,
    longitudeDelta: 0.02
  };

  _regionChanged = region => {
    this.props.onRegionChanged && this.props.onRegionChanged(region);
    this.setState({ region });
  };

  _userLocation = coordinate => {
    if (this.state.animateToUser && !this.props.coordinate) {
      this.moveToLocation(coordinate);
    }

    this.setState({ userLocation: coordinate, animateToUser: false });
  };

  _renderMarkers = () => {
    return this.props.markers.map((item, index) => {
      return <Marker key={index} coordinate={item.coordinate} />;
    });
  };

  moveToLocation = location => {
    const currentRegion = this.state.region || this.initialRegion;

    this.mapView.animateToRegion({
      ...currentRegion,
      ...location
    });
  };

  moveToUserLocation = () => {
    this.state.userLocation && this.moveToLocation(this.state.userLocation);
  };

  render() {
    const { style, coordinate } = this.props;

    const initialRegion = coordinate
      ? {
          ...this.initialRegion,
          ...coordinate
        }
      : this.initialRegion;

    return (
      <MapView
        ref={ref => {
          this.mapView = ref;
        }}
        style={style}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={false}
        onRegionChangeComplete={this._regionChanged}
        onUserLocationChange={event =>
          this._userLocation(event.nativeEvent.coordinate)
        }
      >
        {this._renderMarkers()}
      </MapView>
    );
  }
}

export default MapLayout;
