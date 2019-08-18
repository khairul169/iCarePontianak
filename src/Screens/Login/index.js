import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Image, ToastAndroid} from 'react-native';
import {fetchLogin, fetchRegister} from 'actions/Auth';
import OneSignal from 'public/OneSignal';
import {appIcon} from 'assets';
import InputText from './InputText';
import Button from './Button';

const Login = props => {
  const [register, setRegister] = useState(false);

  // input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const {auth, navigation} = props;

  const onAuthChanged = () => {
    if (auth.loading) return;

    // error message
    if (!auth.success) {
      auth.message && ToastAndroid.show(auth.message, ToastAndroid.LONG);
      return;
    }

    // navigate to main screen
    if (auth.loggedIn) {
      OneSignal.onLoggedIn();
      navigation.navigate('MainStack');
    }
  };

  const tryLogin = async () => {
    // login
    props.fetchLogin(username, password);
  };

  const tryRegister = async () => {
    // Password confirmation
    if (confirmPass !== password)
      return ToastAndroid.show(
        'Konfirmasi kata sandi tidak sama!',
        ToastAndroid.SHORT,
      );

    // register
    props.fetchRegister(username, password, fullname);
  };

  const onSubmit = async () => {
    register ? tryRegister() : tryLogin();
  };

  const onToggle = () => {
    setRegister(!register);
  };

  // check authentication
  useEffect(onAuthChanged, [auth]);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={appIcon} style={styles.icon} />
      </View>

      <View style={styles.inputContainer} behavior="padding">
        {register && (
          <InputText
            icon="account-card-details"
            placeholder="Nama Lengkap"
            value={fullname}
            onChangeText={setFullname}
            capitalize
          />
        )}
        <InputText
          icon="account-circle"
          placeholder="Nama Pengguna"
          value={username}
          onChangeText={setUsername}
        />
        <InputText
          icon="account-key"
          placeholder="Kata Sandi"
          value={password}
          onChangeText={setPassword}
          password
        />
        {register && (
          <InputText
            icon="eraser"
            placeholder="Konfirmasi Kata Sandi"
            value={confirmPass}
            onChangeText={setConfirmPass}
            password
          />
        )}

        <Button
          title={register ? 'DAFTAR' : 'MASUK'}
          backgroundColor={register ? '#8BC34A' : '#03A9F4'}
          marginTop={32}
          dark
          onPress={onSubmit}
        />
        <Button
          title={register ? 'Masuk' : 'Daftar'}
          onPress={onToggle}
          border
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    tintColor: '#455A64',
    width: 64,
    height: 64,
    alignSelf: 'center',
  },
  inputContainer: {
    padding: 16,
  },
});

const mapStateToProps = ({auth}) => ({
  auth,
});

const mapDispatchToProps = {
  fetchLogin,
  fetchRegister,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
