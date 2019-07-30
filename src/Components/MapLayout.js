import React, { Component } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import PropTypes from "prop-types";
import axios from "axios";
import { OPENROUTE_APIKEY } from "react-native-dotenv";

class MapLayout extends Component {
  static propTypes = {
    style: PropTypes.any,
    coordinate: PropTypes.object,
    markers: PropTypes.array,
    onMapReady: PropTypes.func,
    onRegionChanged: PropTypes.func,
    onUserLocation: PropTypes.func,
    onPress: PropTypes.func,
    navPath: PropTypes.bool,
    mapPadding: PropTypes.object
  };

  static defaultProps = {
    markers: []
  };

  state = {
    region: null,
    userLocation: null,
    animateToUser: true,
    navPoints: null
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

    if (this.props.onUserLocation) {
      this.props.onUserLocation({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude
      });
    }

    // update state
    this.setState({ userLocation: coordinate, animateToUser: false });

    // update navigation path
    if (this.props.navPath) this._updateNavigation(coordinate);
  };

  _renderMarkers = () => {
    const markers = [...this.props.markers];

    if (this.props.pin) {
      markers.push({ coordinate: this.props.coordinate });
    }

    return markers.map((item, index) => (
      <Marker
        key={index}
        coordinate={item.coordinate}
        title={item.title}
        image={item.image}
        onPress={item.onPress}
      />
    ));
  };

  _updateNavigation = userCoordinate => {
    if (this.state.navPoints || !this.props.coordinate) return;

    const { coordinate } = this.props;

    const apiKey = OPENROUTE_APIKEY;
    const c0 = `${userCoordinate.longitude},${userCoordinate.latitude}`;
    const c1 = `${coordinate.longitude},${coordinate.latitude}`;

    // direction api
    const apiUrl = "https://api.openrouteservice.org/v2/directions/";

    // fetch navigation path
    axios
      .get(apiUrl + `driving-car?api_key=${apiKey}&start=${c0}&end=${c1}`)
      .then(response => {
        // lines coordinate
        const points = response.data.features[0].geometry.coordinates;

        // set navigation points
        this.setState({ navPoints: points });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  _renderNavigation = () => {
    if (!this.state.navPoints) return;

    const points = this.state.navPoints.map(item => {
      return {
        latitude: item[1],
        longitude: item[0]
      };
    });

    return (
      <Polyline
        coordinates={points}
        strokeWidth={5}
        strokeColor="rgba(34, 62, 230, 0.6)"
      />
    );
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
        onMapReady={this.props.onMapReady}
        onRegionChangeComplete={this._regionChanged}
        onUserLocationChange={event =>
          this._userLocation(event.nativeEvent.coordinate)
        }
        onPress={this.props.onPress}
        mapPadding={this.props.mapPadding}
      >
        {this._renderMarkers()}
        {this._renderNavigation()}
      </MapView>
    );
  }
}

export default MapLayout;
