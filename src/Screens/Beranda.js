import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Text, ScrollView, RefreshControl} from 'react-native';
import {HomeHeader} from '../Components';
import LayananGadar from './Beranda/LayananGadar';
import KategoriLayanan from './Beranda/KategoriLayanan';

import {fetchData} from '../Redux/Actions/Beranda';
import {fetchItems as fetchLayanan} from '../Redux/Actions/Layanan';
import {fetchUser} from '../Redux/Actions/Akun';
import {requestLocationPermission} from '../Public/Utils';

import {gadarBg, gadarIcon} from '../Assets';

const Beranda = props => {
  const {navigation, user} = props;
  const {pushNotification, kategoriLayanan, loading} = props.beranda;

  const onLoaded = () => {
    props.fetchData();
    props.fetchUser();
    requestLocationPermission();
  };

  // on screen loaded
  useEffect(onLoaded, []);

  const navigateTo = (route, data) => {
    navigation.navigate(route, data);
  };

  const buatLayanan = layanan => {
    navigateTo('BuatLayanan', {layanan});
  };

  const onPushNotification = () => {
    if (pushNotification) {
      props.fetchLayanan();
      navigation.navigate('Layanan');
    }
  };

  // on push notification opened
  useEffect(onPushNotification, [pushNotification]);

  return (
    <View style={styles.container}>
      <HomeHeader name={user && user.name.split(' ')[0]} />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl onRefresh={onLoaded} refreshing={loading} />
        }>
        <Text style={styles.title}>Layanan Kami</Text>
        <Text style={styles.subtitle}>
          Pilih jenis layanan yang anda inginkan
        </Text>
        <LayananGadar
          icon={gadarIcon}
          background={gadarBg}
          onPress={() => navigateTo('Gadar')}
        />
        <Text style={styles.subtitle}>Layanan lainnya</Text>
        <KategoriLayanan data={kategoriLayanan} onPress={buatLayanan} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    color: '#37474F',
    marginLeft: 16,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 12,
    color: '#626262',
    marginBottom: 12,
    marginLeft: 16,
  },
});

const mapStateToProps = ({beranda, akun}) => ({
  beranda,
  user: akun.user,
});

const mapDispatchToProps = {
  fetchData,
  fetchLayanan,
  fetchUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Beranda);
