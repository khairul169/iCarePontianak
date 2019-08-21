import React, {Component} from 'react';
import MapView, {Polyline, Circle} from 'react-native-maps';
import PropTypes from 'prop-types';
import MapMarker from './MapMarker';
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

    this.renderMarker = this._renderMarker.bind(this);
    this.renderMarkers = this._renderMarkers.bind(this);
  }

  onMapReady = () => {
    this.setState({mapReady: true});
    this.props.onMapReady && this.props.onMapReady();
  };

  _regionChanged = region => {
    this.props.onRegionChanged && this.props.onRegionChanged(region);
    this.setState({region});
  };

  _userLocation = coordinate => {
    if (this.state.animateToUser && !this.props.coordinate) {
      this.moveToLocation(coordinate);
    }

    if (this.props.onUserLocation) {
      this.props.onUserLocation({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      });
    }

    // update state
    this.setState({userLocation: coordinate, animateToUser: false});

    // update navigation path
    this._updateNavigation(coordinate);
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

    return markers.map(this.renderMarker);
  }

  _updateNavigation = async userCoordinate => {
    const {coordinate} = this.props;
    if (this.state.navPoints || !coordinate) {
      return;
    }

    const points = await OpenRouteAPI.getDirection(userCoordinate, coordinate);
    this.setState({navPoints: points});
  };

  _renderNavigation = () => {
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

  render() {
    const {style, coordinate} = this.props;

    const initialRegion = coordinate
      ? {
          ...this.initialRegion,
          ...coordinate,
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
        onMapReady={this.onMapReady}
        onRegionChangeComplete={this._regionChanged}
        onUserLocationChange={event =>
          this._userLocation(event.nativeEvent.coordinate)
        }
        onPress={this.props.onPress}
        mapPadding={this.props.mapPadding}>
        {this.renderMarkers()}
        {this._renderNavigation()}
      </MapView>
    );
  }
}

export default MapLayout;
