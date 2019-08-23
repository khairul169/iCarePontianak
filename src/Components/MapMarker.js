import React from 'react';
import {Image} from 'react-native';
import {Marker} from 'react-native-maps';
import Icon from './Icon';
import PropTypes from 'prop-types';

export default class MapMarker extends React.PureComponent {
  static propTypes = {
    onRef: PropTypes.func,
    coordinate: PropTypes.object,
    title: PropTypes.string,
    description: PropTypes.string,
    onPress: PropTypes.func,
    icon: PropTypes.string,
    iconType: PropTypes.string,
    iconColor: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      tracksViewChanges: true,
    };
  }

  componentDidMount() {
    this.resetTracksViewChanges();
  }

  resetTracksViewChanges = () => {
    this.setState({tracksViewChanges: false});
  };

  render() {
    const {
      onRef,
      coordinate,
      title,
      description,
      onPress,
      icon,
      iconType,
      iconColor,
    } = this.props;

    const markerStyle = {width: 48, height: 48};
    const iconStyle = {position: 'absolute', alignSelf: 'center', top: 7};

    return (
      <Marker
        ref={onRef}
        coordinate={coordinate}
        title={title}
        description={description}
        anchor={{x: 0.5, y: 0.8}}
        onPress={onPress}
        tracksViewChanges={this.state.tracksViewChanges}>
        <Image
          source={require('src/Assets/pins/pin_custom.png')}
          style={markerStyle}
        />
        <Icon
          name={icon || 'home-circle'}
          type={iconType}
          style={iconStyle}
          size={20}
          color={iconColor || '#525252'}
        />
      </Marker>
    );
  }
}
