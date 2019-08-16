import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Image} from 'react-native';
import {validateToken} from '../Redux/Actions/Auth';
import OneSignal from '../Public/OneSignal';
import {appIcon} from '../Assets';

const Loader = props => {
  const {navigation, auth} = props;

  const onLoaded = () => {
    props.validateToken();
  };

  const checkToken = () => {
    if (auth.loading) return;

    OneSignal.onLoggedIn();
    navigation.navigate(auth.loggedIn ? 'MainStack' : 'Login');
  };

  // validate auth token
  useEffect(onLoaded, []);

  // switch screen
  useEffect(checkToken, [auth.loading, auth.loggedIn]);

  return (
    <View style={styles.container}>
      <Image source={appIcon} style={styles.splashImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashImage: {
    width: 48,
    height: 48,
    tintColor: '#90A4AE',
  },
});

const mapStateToProps = ({auth}) => ({
  auth,
});

const mapDispatchToProps = {
  validateToken,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Loader);
