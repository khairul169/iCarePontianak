import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {
  fetchUser,
  setMultiData,
  setProfileImage,
  setActive,
  setUserLocation,
} from '../Actions/Akun.action';
import {logout} from '../Actions/Auth.action';

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
import {Header, Icon} from '../Components';
import {getUserType} from '../Public/Utils';
import {iconUser} from '../Assets';

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

const Akun = props => {
  const {loading, token, user, navigation} = props;
  const fetchData = props.fetchUser;

  if (user) {
    user.active = parseInt(user.active, 10);
  }

  // on start
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = () => {
    fetchData();
  };

  // on token changed
  useEffect(() => {
    !token && navigation.navigate('Login');
  }, [navigation, token]);

  const ubahFotoProfil = () => {
    ImagePicker.openPicker({
      width: 512,
      height: 512,
      includeBase64: true,
      cropping: true,
      mediaType: 'photo',
    })
      .then(image => {
        props.setProfileImage(image.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  const menerimaLayanan = () => {
    props.setActive(user.active ? 0 : 1);
  };

  const pengaturanLokasi = () => {
    const coordinate = {
      latitude: parseFloat(user.lat),
      longitude: parseFloat(user.lng),
    };
    navigation.navigate('PilihLokasi', {
      location: coordinate.latitude ? coordinate : null,
      callback: ({latitude, longitude}) => {
        props.setUserLocation(latitude, longitude);
      },
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Akun" />

      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={loading} />
        }>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.profilePict} onPress={ubahFotoProfil}>
            <Image
              source={user && user.image ? {uri: user.image} : iconUser}
              style={styles.profileImage}
            />
          </TouchableOpacity>

          <Text style={styles.title}>{user && user.name}</Text>
          <Text style={styles.subtitle}>{user && getUserType(user.type)}</Text>
        </View>
        <View style={styles.content}>
          <Button
            icon="account-circle"
            style={styles.button}
            title="Pengaturan Akun"
            onPress={() =>
              navigation.navigate('PengaturanAkun', {
                user,
                callback: data => props.setMultiData(data),
              })
            }
          />
          {user && user.type >= 2 && (
            <View>
              <Button
                icon={
                  <Switch
                    value={user.active === 1}
                    onValueChange={menerimaLayanan}
                  />
                }
                style={styles.button}
                title="Menerima Layanan"
                onPress={menerimaLayanan}
              />
              <Button
                icon="map-marker"
                style={styles.button}
                title="Atur Lokasi Saya"
                onPress={pengaturanLokasi}
              />
            </View>
          )}
          <Button
            icon="logout"
            style={styles.button}
            title="Keluar"
            onPress={props.logout}
            small
          />
        </View>
      </ScrollView>
    </View>
  );
};

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

const mapStateToProps = ({auth, akun}) => ({
  loading: akun.loading,
  token: auth.token,
  user: akun.userData,
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
