import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, ToastAndroid, Text} from 'react-native';
import {getTimeString} from 'public/Utils';
import {
  Button,
  Header,
  PickerSelect,
  DateTimePicker,
  TextEdit,
} from 'components';

const BuatLayanan = ({navigation}) => {
  // Cek layanan
  const layanan = navigation.getParam('layanan', null);

  // Item tindakan
  const actionItems = layanan.actions.map(item => item.name);

  // States
  const [keluhan, setKeluhan] = useState('');
  const [tindakan, setTindakan] = useState(actionItems && actionItems[0]);
  const [diagnosa, setDiagnosa] = useState('');
  const [alamat, setAlamat] = useState('');
  const [lokasi, setLokasi] = useState();
  const [waktu, setWaktu] = useState();

  const onPilihLokasi = () => {
    navigation.navigate('PilihLokasi', {
      location: lokasi,
      callback: setLokasi,
    });
  };

  const onBuatLayanan = () => {
    if (
      keluhan.trim() === '' ||
      alamat.trim() === '' ||
      !waktu ||
      !lokasi ||
      !tindakan
    ) {
      ToastAndroid.show(
        'Mohon periksa lagi input yang tersedia.',
        ToastAndroid.LONG,
      );
      return;
    }

    const dataLayanan = {
      keluhan,
      tindakan,
      alamat,
      waktu,
      diagnosa,
    };

    const totalCost = layanan.actions.find(item => item.name === tindakan).cost;

    const args = {
      id: layanan.id,
      title: layanan.name,
      data: dataLayanan,
      location: lokasi,
      totalCost,
    };

    navigation.navigate('KonfirmasiLayanan', {layanan: args});
  };

  return (
    <View style={styles.container}>
      <Header title={layanan.name} backButton navigation={navigation} />

      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={[styles.title, styles.noMarginTop]}>Keluhan Utama</Text>
          <TextEdit
            placeholder="Keluhan yang dirasakan saat ini..."
            value={keluhan}
            capitalize
            onChangeText={value => setKeluhan(value)}
          />

          <Text style={styles.title}>Jenis Tindakan</Text>
          <PickerSelect
            items={actionItems}
            value={tindakan}
            onValueChange={item => setTindakan(item)}
          />

          {layanan.name.toLowerCase().startsWith('kunjungan') && (
            <View>
              <Text style={styles.title}>Diagnosa Medis (opsional)</Text>
              <TextEdit
                placeholder="..."
                value={diagnosa}
                capitalize
                onChangeText={value => setDiagnosa(value)}
              />
            </View>
          )}

          <Text style={styles.title}>Lokasi</Text>
          <TextEdit
            placeholder="Alamat lengkap..."
            value={alamat}
            capitalize
            onChangeText={value => setAlamat(value)}
          />
          <Button
            title={'Tentukan Lokasi'}
            onPress={onPilihLokasi}
            small
            style={styles.btnPilihLokasi}
          />

          <Text style={styles.title}>Waktu Kunjungan</Text>
          <DateTimePicker
            ref={ref => {
              this.dtPicker = ref;
            }}
            onValueChange={value => setWaktu(value)}
          />
          <Button
            title={waktu ? getTimeString(waktu) : 'Pilih Tanggal dan Jam'}
            onPress={() => this.dtPicker.show()}
            small
          />
        </View>
      </ScrollView>

      <Button
        title="Lanjutkan"
        onPress={onBuatLayanan}
        style={styles.btnBuat}
        color="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  map: {
    marginTop: 16,
  },
  title: {
    fontSize: 14,
    color: '#626262',
    marginBottom: 6,
    marginTop: 16,
  },
  noMarginTop: {
    marginTop: 0,
  },
  btnPilihLokasi: {
    marginTop: 16,
  },
  btnBuat: {
    backgroundColor: '#03A9F4',
    borderWidth: 0,
    margin: 8,
  },
});

export default BuatLayanan;
