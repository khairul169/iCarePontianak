import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import MapView, {Polyline, Circle} from 'react-native-maps';
import PropTypes from 'prop-types';
import MapMarker from './MapMarker';
import Icon from './Icon';
import {OpenRouteAPI} from 'public/API';

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
    mapPadding: PropTypes.object,
    onMarkerRef: PropTypes.func,
  };

  static defaultProps = {
    markers: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      region: null,
      userLocation: null,
      animateToUser: true,
      navPoints: null,
      mapReady: false,
    };

    this.initialRegion = {
      latitude: -0.0257813,
      longitude: 109.3323449,
      latitudeDelta: 0.015,
      longitudeDelta: 0.02,
    };
  }

  onMapReady = () => {
    this.setState({mapReady: true});
    this.props.onMapReady && this.props.onMapReady();
  };

  moveToLocation = location => {
    const currentRegion = this.state.region || this.initialRegion;

    this.mapView.animateToRegion({
      ...currentRegion,
      ...location,
    });
  };

  moveToUserLocation = () => {
    this.state.userLocation && this.moveToLocation(this.state.userLocation);
  };

  onCenterMap = () => {
    this.moveToUserLocation();
  };

  _regionChanged = region => {
    this.props.onRegionChanged && this.props.onRegionChanged(region);
    this.setState({region});
  };

  _userLocation = userLocation => {
    const {animateToUser, mapReady} = this.state;
    const {onUserLocation} = this.props;

    if (!mapReady) {
      return;
    }

    // update state
    this.setState({userLocation, animateToUser: false});

    if (animateToUser) {
      this.moveToLocation(userLocation);
    }

    // update navigation path
    this.updateNavigation(userLocation);

    if (onUserLocation) {
      const userLatLng = {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      };
      onUserLocation(userLatLng);
    }
  };

  _renderMarker(item, index) {
    const {onMarkerRef} = this.props;

    return [
      <MapMarker
        onRef={ref => onMarkerRef && onMarkerRef(index, ref)}
        onPress={item.onPress}
        coordinate={item.coordinate}
        title={item.title}
        description={item.description}
        icon={item.icon}
        iconType={item.iconType}
        iconColor={item.iconColor}
      />,
      item.circle && (
        <Circle
          center={item.coordinate}
          radius={item.circle.radius}
          strokeWidth={item.circle.width}
          strokeColor={item.circle.color}
          fillColor={item.circle.background}
        />
      ),
    ];
  }

  _renderMarkers() {
    if (!this.state.mapReady) return;

    const markers = [...this.props.markers];

    if (this.props.pin) {
      markers.push({coordinate: this.props.coordinate});
    }

    return markers.map(this._renderMarker.bind(this));
  }

  updateNavigation = async userCoordinate => {
    const {coordinate} = this.props;

    if (!coordinate) {
      return;
    }

    const points = await OpenRouteAPI.getDirection(userCoordinate, coordinate);
    this.setState({navPoints: points});
  };

  _renderNavigation() {
    if (!this.state.mapReady || !this.state.navPoints) {
      return;
    }
    return (
      <Polyline
        coordinates={this.state.navPoints}
        strokeWidth={5}
        strokeColor="rgba(34, 62, 230, 0.6)"
      />
    );
  }

  render() {
    const {style, coordinate} = this.props;

    const containerStyle = [{zIndex: -1}, style];
    const mapStyle = {flex: 1};
    const centerButton = {
      backgroundColor: '#fff',
      elevation: 3,
      width: 64,
      height: 64,
      borderRadius: 32,
      position: 'absolute',
      bottom: 16,
      right: 16,
      alignItems: 'center',
      justifyContent: 'center',
    };

    const initialRegion = coordinate
      ? {
          ...this.initialRegion,
          ...coordinate,
        }
      : this.initialRegion;

    return (
      <View style={containerStyle}>
        <MapView
          ref={ref => (this.mapView = ref)}
          style={mapStyle}
          initialRegion={initialRegion}
          showsUserLocation={true}
          showsMyLocationButton={false}
          onMapReady={this.onMapReady}
          onRegionChangeComplete={this._regionChanged}
          onUserLocationChange={event =>
            this._userLocation(event.nativeEvent.coordinate)
          }
          onPress={this.props.onPress}
          mapPadding={this.props.mapPadding}>
          {this._renderMarkers()}
          {this._renderNavigation()}
        </MapView>

        <TouchableOpacity style={centerButton} onPress={this.onCenterMap}>
          <Icon name="crosshairs-gps" size={28} color="#424242" />
        </TouchableOpacity>
      </View>
    );
  }
}

export default MapLayout;
