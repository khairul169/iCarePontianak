import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Text, ScrollView, RefreshControl} from 'react-native';
import {HomeHeader} from 'components';

import {fetchData, setNavigation} from 'actions/Beranda';
import {fetchItems as fetchLayanan} from 'actions/Layanan';
import {fetchUser} from 'actions/Akun';
import {requestLocationPermission} from 'public/Utils';
import {gadarBg, gadarIcon} from 'assets';

import LayananGadar from './LayananGadar';
import KategoriLayanan from './KategoriLayanan';

class Beranda extends Component {
  onLoaded = () => {
    this.props.fetchData();
    this.props.fetchUser();
  };

  componentDidMount() {
    this.props.setNavigation(this.props.navigation);
    this.onLoaded();
    requestLocationPermission();
  }

  navigateTo = (route, data) => {
    this.props.navigation.navigate(route, data);
  };

  buatLayanan = layanan => {
    const {id} = layanan;
    this.navigateTo('BuatLayanan', {kategori: id});
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
            onPress={() => this.navigateTo('Emergency')}
          />
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
    fontSize: 16,
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
  setNavigation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Beranda);
