import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableNativeFeedback,
  TouchableOpacity,
  Image,
  RefreshControl,
  Switch,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Header, Icon} from 'components';
import {iconUser} from 'assets';

import {
  fetchUser,
  setMultiData,
  setProfileImage,
  setActive,
  setUserLocation,
} from 'actions/Akun';
import {logout} from 'actions/Auth';
import {getUserType} from 'public/Utils';

const Button = ({onPress, title, icon}) => {
  const titleStyle = {
    flex: 1,
    fontSize: 14,
    color: '#424242',
  };
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.button}>
        <Text style={titleStyle}>{title}</Text>
        {typeof icon === 'string' ? (
          <Icon name={icon} color="#686868" size={20} />
        ) : (
          icon
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

class Akun extends Component {
  onLoaded = () => {
    this.props.fetchUser();
  };

  componentDidMount() {
    this.onLoaded();
  }

  componentDidUpdate(prevProps) {
    const {loggedIn, navigation} = this.props;

    if (loggedIn !== prevProps.loggedIn && !loggedIn)
      navigation.navigate('Login');
  }

  ubahFotoProfil = () => {
    ImagePicker.openPicker({
      width: 512,
      height: 512,
      includeBase64: true,
      cropping: true,
      mediaType: 'photo',
    })
      .then(image => {
        this.props.setProfileImage(image.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  menerimaLayanan = () => {
    this.props.setActive(this.props.user.active ? 0 : 1);
  };

  pengaturanLokasi = () => {
    const {lat, lng} = this.props.user;

    const coordinate = {
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
    };

    this.props.navigation.navigate('PilihLokasi', {
      location: coordinate.latitude ? coordinate : null,
      callback: ({latitude, longitude}) => {
        this.props.setUserLocation(latitude, longitude);
      },
    });
  };

  renderNakesView = () => (
    <View>
      <Button
        icon={
          <Switch
            value={this.props.user.active === 1}
            onValueChange={this.menerimaLayanan}
          />
        }
        style={styles.button}
        title="Menerima Layanan"
        onPress={this.menerimaLayanan}
      />
      <Button
        icon="map-marker"
        style={styles.button}
        title="Atur Lokasi Saya"
        onPress={this.pengaturanLokasi}
      />
    </View>
  );

  render() {
    const {loading, user, navigation} = this.props;

    if (user) {
      user.active = parseInt(user.active, 10);
    }

    return (
      <View style={styles.container}>
        <Header title="Akun" />

        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl onRefresh={this.onLoaded} refreshing={loading} />
          }>
          <View style={styles.profile}>
            <TouchableOpacity
              style={styles.profilePict}
              onPress={this.ubahFotoProfil}>
              <Image
                source={user && user.image ? {uri: user.image} : iconUser}
                style={styles.profileImage}
              />
            </TouchableOpacity>

            <Text style={styles.title}>{user && user.name}</Text>
            <Text style={styles.subtitle}>{user && user.type}</Text>
          </View>

          <View style={styles.content}>
            <Button
              icon="account-circle"
              style={styles.button}
              title="Pengaturan Akun"
              onPress={() =>
                navigation.navigate('PengaturanAkun', {
                  user,
                  callback: data => this.props.setMultiData(data),
                })
              }
            />
            {user && user.type !== 'Klien' && this.renderNakesView()}
            <Button
              icon="logout"
              style={styles.button}
              title="Keluar"
              onPress={this.props.logout}
              small
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 8,
    marginTop: 16,
  },
  profile: {
    padding: 16,
    alignItems: 'center',
  },
  profilePict: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#fff',
    alignSelf: 'center',
    overflow: 'hidden',
    elevation: 3,
  },
  profileImage: {
    width: 128,
    height: 128,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#525252',
    marginTop: 4,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 0,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
});

const mapStateToProps = ({akun, auth}) => ({
  loading: akun.loading,
  user: akun.user,
  loggedIn: auth.loggedIn,
});

const mapDispatchToProps = {
  fetchUser,
  setMultiData,
  setProfileImage,
  setActive,
  setUserLocation,
  logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Akun);
