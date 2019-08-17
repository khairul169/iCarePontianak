import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Text, ScrollView, RefreshControl} from 'react-native';
import {HomeHeader} from '../Components';
import LayananGadar from './Beranda/LayananGadar';
import KategoriLayanan from './Beranda/KategoriLayanan';

import {fetchData} from '../Redux/Actions/Beranda';
import {setNavigationProps} from '../Redux/Actions/OneSignal';
import {fetchItems as fetchLayanan} from '../Redux/Actions/Layanan';
import {fetchUser} from '../Redux/Actions/Akun';
import {requestLocationPermission} from '../Public/Utils';

import {gadarBg, gadarIcon} from '../Assets';

class Beranda extends Component {
  onLoaded = () => {
    this.props.setNavigationProps(this.props.navigation);
    this.props.fetchData();
    this.props.fetchUser();
    requestLocationPermission();
  };

  componentDidMount() {
    this.onLoaded();
  }

  navigateTo = (route, data) => {
    this.props.navigation.navigate(route, data);
  };

  buatLayanan = layanan => {
    this.navigateTo('BuatLayanan', {layanan});
  };

  render() {
    const {user, beranda} = this.props;
    const {kategoriLayanan, loading} = beranda;

    return (
      <View style={styles.container}>
        <HomeHeader name={user && user.name.split(' ')[0]} />
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl onRefresh={this.onLoaded} refreshing={loading} />
          }>
          <Text style={styles.title}>Layanan Kami</Text>
          <Text style={styles.subtitle}>
            Pilih jenis layanan yang anda inginkan
          </Text>

          <LayananGadar
            icon={gadarIcon}
            background={gadarBg}
            onPress={() => this.navigateTo('Gadar')}
          />

          <Text style={styles.subtitle}>Layanan lainnya</Text>
          <KategoriLayanan data={kategoriLayanan} onPress={this.buatLayanan} />
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
  setNavigationProps,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Beranda);
