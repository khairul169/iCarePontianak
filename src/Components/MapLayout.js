import React, { Component } from "react";
import MapView, { Marker } from "react-native-maps";
import PropTypes from "prop-types";

class MapLayout extends Component {
  static propTypes = {
    style: PropTypes.any,
    coordinate: PropTypes.object,
    latlngDelta: PropTypes.object,
    markers: PropTypes.array,
    lockPosition: PropTypes.bool
  };

  static defaultProps = {
    coordinate: {
      latitude: -0.0257813,
      longitude: 109.3323449
    },
    latlngDelta: {
      latitudeDelta: 0.015,
      longitudeDelta: 0.02
    },
    markers: [],
    lockPosition: false
  };

  state = {
    region: null,
    userLocation: null,
    initUserLoc: true
  };

  _regionChanged = region => {
    this.setState({ region });
  };

  _userLocation = coordinate => {
    const { lockPosition } = this.props;

    if (lockPosition || this.state.initUserLoc) {
      this.moveToLocation(coordinate);
    }

    this.setState({ userLocation: coordinate, initUserLoc: lockPosition });
  };

  _renderMarkers = () => {
    return this.props.markers.map((item, index) => {
      return <Marker key={index} coordinate={item.coordinate} />;
    });
  };

  moveToLocation = location => {
    const currentRegion = this.state.region || this.props.latlngDelta;

    this.mapView.animateToRegion({
      ...currentRegion,
      ...location
    });
  };

  moveToUserLocation = () => {
    this.state.userLocation && this.moveToLocation(this.state.userLocation);
  };

  render() {
    const { style, coordinate, latlngDelta, lockPosition } = this.props;

    const initialRegion = {
      ...coordinate,
      ...latlngDelta
    };

    return (
      <MapView
        ref={ref => {
          this.mapView = ref;
        }}
        style={style}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={false}
        scrollEnabled={!lockPosition}
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
