import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import PropTypes from 'prop-types';
import {withNavigation} from 'react-navigation';
import StatusBar, {statusBarHeight} from './StatusBar';
import Icon from './Icon';

export const HeaderItem = ({style, children, onPress}) => {
  if (onPress) {
    return (
      <TouchableOpacity
        style={[styles.headerItemContainer, style]}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={styles.headerItemContainer}>{children}</View>;
};

HeaderItem.propTypes = {
  onPress: PropTypes.func,
};

export const HeaderIcon = ({type, name, onPress, right}) => {
  return (
    <HeaderItem style={right && styles.headerItemRight} onPress={onPress}>
      <Icon type={type} name={name} size={22} color="#333" />
    </HeaderItem>
  );
};

HeaderIcon.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  right: PropTypes.bool,
};

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  onScroll(event) {
    this.state.scrollY.setValue(event.nativeEvent.contentOffset.y);
  }

  goBack = () => {
    this.props.navigation && this.props.navigation.goBack(null);
  };

  render() {
    const {title, left, right, backButton, transparent, animated} = this.props;

    const Container = animated ? Animated.View : View;
    const containerStyle = [styles.header, {paddingTop: statusBarHeight}];
    const HeaderTitle = animated ? Animated.Text : Text;
    const headerTitleStyle = [styles.headerTitle];

    if (transparent || animated) {
      containerStyle.push(styles.headerTransparent);
    }

    if (animated) {
      const backgroundColor = this.state.scrollY.interpolate({
        inputRange: [0, 80],
        outputRange: ['rgba(255, 255, 255, 0.0)', 'rgba(255, 255, 255, 1.0)'],
        extrapolate: 'clamp',
      });

      containerStyle.push({
        backgroundColor,
      });

      const headerTitleOpacity = this.state.scrollY.interpolate({
        inputRange: [0, 80],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      });

      headerTitleStyle.push({
        opacity: headerTitleOpacity,
      });
    }

    return (
      <Container style={containerStyle}>
        <StatusBar />

        <View style={styles.headerItem}>
          {backButton && <HeaderIcon name="arrow-left" onPress={this.goBack} />}
          {left}
        </View>

        <HeaderTitle style={headerTitleStyle}>
          {title && title.toUpperCase()}
        </HeaderTitle>

        <View style={[styles.headerItem, styles.right]}>{right}</View>
      </Container>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
  transparent: PropTypes.bool,
  left: PropTypes.element,
  right: PropTypes.element,
  backButton: PropTypes.bool,
  navigation: PropTypes.object,
  animated: PropTypes.bool,
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    height: 80,
    backgroundColor: '#fff',
  },
  headerTransparent: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    zIndex: 1,
  },
  headerItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerItemContainer: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerItemRight: {
    alignItems: 'flex-end',
  },
  headerTitle: {
    flex: 3,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#424242',
    textAlign: 'center',
  },
});

export default withNavigation(Header);
