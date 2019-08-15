import React, {useState} from 'react';
import {ServiceAPI} from '../Public/API';
import {getTimeString, navigateToMainStack} from '../Public/Utils';

import {View, StyleSheet, ScrollView} from 'react-native';
import {Header, Button, ItemDetail, MiniMap} from '../Components';

const KonfirmasiLayanan = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  // params
  const {type, title, data, location} = navigation.getParam('layanan');

  // navigate to layanan screen
  const navigateLayanan = () => {
    navigateToMainStack(navigation, 'Layanan');
  };

  const buatLayanan = async () => {
    if (loading) return;

    // create service
    setLoading(true);
    const {success} = await ServiceAPI.create(type, data, location);
    setLoading(false);
    success && navigateLayanan();
  };

  return (
    <View style={styles.container}>
      <Header title="Konfirmasi Layanan" backButton navigation={navigation} />

      <ScrollView style={styles.container}>
        <MiniMap borderRadius={3} style={styles.map} coordinate={location} />

        <View style={styles.content}>
          <ItemDetail
            icon="mother-nurse"
            margin={false}
            title="Jenis Layanan"
            text={title}
            border
          />

          <ItemDetail
            icon="account-alert"
            title="Keluhan Utama"
            text={data.keluhan}
            border
          />

          <ItemDetail
            icon="briefcase-edit"
            title="Jenis Tindakan"
            text={data.tindakan}
            border
          />

          {data.diagnosa ? (
            <ItemDetail
              icon="clipboard-pulse"
              title="Diagnosa Medis"
              text={data.diagnosa}
              border
            />
          ) : null}

          <ItemDetail
            icon="home-map-marker"
            title="Lokasi Klien"
            text={data.alamat}
            border
          />

          <ItemDetail
            icon="calendar-clock"
            title="Waktu Kunjungan"
            text={getTimeString(data.waktu)}
          />
        </View>

        <View style={styles.content}>
          <Button
            title="Buat Layanan"
            style={styles.btnKonfirmasi}
            color="#fff"
            onPress={buatLayanan}
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
    padding: 16,
    borderColor: '#eee',
    borderTopWidth: 1,
  },
  btnKonfirmasi: {
    backgroundColor: '#8BC34A',
    borderWidth: 0,
  },
});

export default KonfirmasiLayanan;
