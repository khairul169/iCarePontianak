import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Button, TextEdit, DateTimePicker} from 'components';
import {setKeluhan, setAlamat, setLokasi, setWaktu} from 'actions/BuatLayanan';
import {getTimeString} from 'public/Utils';

class DetailLayanan extends Component {
  onPilihLokasi = () => {
    this.props.navigation.navigate('PilihLokasi', {
      location: this.props.lokasi,
      callback: lokasi => this.props.setLokasi(lokasi),
    });
  };

  render() {
    const {keluhan, alamat, waktu} = this.props;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.content}>
            <Text style={[styles.title, styles.topTitle]}>Keluhan</Text>
            <TextEdit
              placeholder="Keluhan saat ini apa?"
              value={keluhan}
              capitalize
              onChangeText={value => this.props.setKeluhan(value)}
            />

            <Text style={styles.title}>Lokasi</Text>
            <TextEdit
              placeholder="Alamat lengkap.."
              value={alamat}
              capitalize
              onChangeText={value => this.props.setAlamat(value)}
            />

            <Button
              title="Tentukan Lokasi"
              onPress={this.onPilihLokasi}
              style={styles.btnPilihLokasi}
            />

            <Text style={styles.title}>Waktu Layanan</Text>
            <DateTimePicker
              ref={ref => (this.dateTimePicker = ref)}
              onValueChange={value => this.props.setWaktu(value)}
            />
            <Button
              title={waktu ? getTimeString(waktu) : 'Tentukan Waktu'}
              onPress={() => this.dateTimePicker.show()}
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
    padding: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#787878',
    marginTop: 24,
    marginBottom: 8,
  },
  topTitle: {
    marginTop: 8,
  },
  btnPilihLokasi: {
    marginTop: 16,
  },
});

const mapStateToProps = ({buatLayanan}) => ({
  keluhan: buatLayanan.keluhan,
  alamat: buatLayanan.alamat,
  lokasi: buatLayanan.lokasi,
  waktu: buatLayanan.waktu,
});

const mapDispatchToProps = {
  setKeluhan,
  setAlamat,
  setLokasi,
  setWaktu,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailLayanan);
