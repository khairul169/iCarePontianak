import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {validateToken} from '../Actions/Auth.action';

import {View, StyleSheet, Image} from 'react-native';
import appIcon from '../Assets/icon/app-icon.png';

const Splash = props => {
  const {isLoading, token, navigation} = props;
  const checkSession = props.validateToken;

  // validate auth token
  useEffect(() => {
    checkSession();
  }, [checkSession]);

  // switch screen
  useEffect(() => {
    !isLoading && navigation.navigate(token ? 'MainStack' : 'Login');
  }, [token, navigation, isLoading]);

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
  isLoading: auth.loading,
  token: auth.token,
});

const mapDispatchToProps = {
  validateToken,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Splash);
