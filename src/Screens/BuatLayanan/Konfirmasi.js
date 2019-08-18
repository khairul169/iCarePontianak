import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Header, Button, ItemDetail, MiniMap} from 'components';
import {getTimeString} from 'public/Utils';

class Konfirmasi extends Component {
  onKonfirmasi = () => {
    this.props.navigation.navigate('CariNakes');
  };

  filterTindakan = () => {
    const {kategori, tindakan} = this.props.buatLayanan;
    if (!kategori || !kategori.actions || !tindakan) {
      return false;
    }
    return kategori.actions.filter(item => tindakan.includes(item.id));
  };

  findKlien = () => {
    const {klien, listKlien} = this.props.buatLayanan;
    return listKlien.find(item => item.id === klien);
  };

  render() {
    const {kategori, keluhan, alamat, lokasi, waktu} = this.props.buatLayanan;

    const tindakan = this.filterTindakan();
    const klien = this.findKlien();

    return (
      <View style={styles.container}>
        <Header
          onRef={ref => (this.header = ref)}
          title="Konfirmasi Layanan"
          backButton
          {...this.props}
          animated
        />

        <ScrollView
          style={styles.container}
          onScroll={e => this.header && this.header.onScroll(e)}
          scrollEventThrottle={16}>
          <MiniMap
            borderRadius={3}
            style={styles.map}
            coordinate={lokasi}
            mapPadding={{top: 50}}
          />

          <View style={styles.content}>
            <ItemDetail
              icon="mother-nurse"
              margin={false}
              title="Jenis Layanan"
              text={kategori ? kategori.name : '-'}
              border
            />

            <ItemDetail
              icon="mother-nurse"
              title="Nama Klien"
              text={klien ? klien.nama : '-'}
              border
            />

            <ItemDetail
              icon="account-alert"
              title="Keluhan Utama"
              text={keluhan || '-'}
              border
            />

            <ItemDetail
              icon="briefcase-edit"
              title="Jenis Tindakan"
              text={tindakan ? tindakan.map(item => item.name).join(', ') : '-'}
              border
            />

            <ItemDetail
              icon="home-map-marker"
              title="Lokasi Klien"
              text={alamat || '-'}
              border
            />

            <ItemDetail
              icon="calendar-clock"
              title="Waktu Kunjungan"
              text={getTimeString(waktu)}
            />
          </View>
        </ScrollView>

        <Button
          title="Konfirmasi"
          style={styles.btnKonfirmasi}
          color="#fff"
          onPress={this.onKonfirmasi}
        />
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
    padding: 16,
    backgroundColor: '#fff',
    elevation: 12,
  },
  map: {
    height: 300,
  },
  btnKonfirmasi: {
    backgroundColor: '#8BC34A',
    borderWidth: 0,
    margin: 8,
  },
});

const mapStateToProps = ({buatLayanan}) => ({buatLayanan});

const mapDispatchToProps = {
  //
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Konfirmasi);
