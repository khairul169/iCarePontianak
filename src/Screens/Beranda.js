import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchItems as fetchLayanan} from '../Actions/Layanan.action';

import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {HomeHeader} from '../Components';
import {Service} from '../Public/Consts';
import {requestLocationPermission} from '../Public/Utils';
import LayananGadar from './Beranda/LayananGadar';
import KategoriLayanan from './Beranda/KategoriLayanan';

import {
  gadarBg,
  gadarIcon,
  iconMedVisit,
  iconLabMedik,
  iconGigi,
  iconBidan,
  iconLansia,
  iconSanitasi,
  iconDietNutrisi,
} from '../Assets';

const Beranda = props => {
  const {navigation, user, pushNotification} = props;
  const loadLayanan = props.fetchLayanan();

  // ask permissions
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const navigateTo = (route, data) => {
    navigation.navigate(route, data);
  };

  const buatLayanan = type => {
    navigateTo('BuatLayanan', {layanan: type});
  };

  // on push notification opened
  useEffect(() => {
    if (pushNotification) {
      loadLayanan();
      navigation.navigate('Layanan');
    }
  }, [loadLayanan, navigation, pushNotification]);

  const kategoriLayanan = [
    {
      id: Service.MEDICALVISIT,
      name: 'Kunjungan Medis',
      icon: iconMedVisit,
    },
    {
      id: Service.LABMEDIK,
      name: 'Laboratorium Medik',
      icon: iconLabMedik,
    },
    {
      id: Service.GIGI,
      name: 'Kesehatan Gigi',
      icon: iconGigi,
    },
    {
      id: Service.BIDAN,
      name: 'Bidan Terampil',
      icon: iconBidan,
    },
    {
      id: Service.LANSIA,
      name: 'Lansia',
      icon: iconLansia,
    },
    {
      id: Service.SANITASI,
      name: 'Sanitasi',
      icon: iconSanitasi,
    },
    {
      id: Service.NUTRISI,
      name: 'Diet dan Nutrisi',
      icon: iconDietNutrisi,
    },
  ];

  return (
    <View style={styles.container}>
      <HomeHeader name={user && user.name.split(' ')[0]} />
      <ScrollView style={styles.container}>
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
  pushNotification: beranda.pushNotification,
  user: akun.userData,
});

const mapDispatchToProps = {
  fetchLayanan,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Beranda);
