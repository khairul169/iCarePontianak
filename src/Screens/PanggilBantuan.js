import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Header, MapLayout, Button, PickerSelect} from '../Components';
import {ServiceAPI} from '../Public/API';
import {Service} from '../Public/Consts';
import {navigateToMainStack} from '../Public/Utils';
import {pinImage} from '../Assets';

const PanggilBantuan = ({navigation}) => {
  const jenisBantuan = [
    'Kecelakaan Lalu Lintas',
    'Kebakaran',
    'Stroke',
    'Gagal Jantung / Henti Nafas',
    'Lain-lain',
  ];

  // state
  const [loading, setLoading] = useState(false);
  const [kejadian, setKejadian] = useState(jenisBantuan[0]);
  const [lokasi, setLokasi] = useState();

  const onRegionChanged = ({latitude, longitude}) => {
    setLokasi({
      latitude,
      longitude,
    });
  };

  // navigate to layanan screen
  const navigateLayanan = () => {
    navigateToMainStack(navigation, 'Layanan');
  };

  const submit = async () => {
    if (loading) return;

    // create emergency service
    setLoading(true);
    const {success} = await ServiceAPI.create(
      Service.EMERGENCY,
      {kejadian},
      lokasi,
    );
    setLoading(false);
    success && navigateLayanan();
  };

  return (
    <View style={styles.container}>
      <Header transparent backButton navigation={navigation} />

      <View style={styles.container}>
        <MapLayout style={styles.mapView} onRegionChanged={onRegionChanged} />

        <View style={styles.pinContainer}>
          <Image source={pinImage} style={styles.pin} />
        </View>

        <View style={styles.action}>
          <PickerSelect
            items={jenisBantuan}
            style={styles.pilihanBantuan}
            height={48}
            value={kejadian}
            onValueChange={value => setKejadian(value)}
          />
          <Button
            icon="map-marker-radius"
            title="Panggil Bantuan"
            style={styles.submitButton}
            border={false}
            color="#fff"
            onPress={submit}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    flex: 1,
  },
  pinContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  pin: {
    width: 48,
    height: 48,
    marginTop: -48,
    resizeMode: 'contain',
  },
  action: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  pilihanBantuan: {
    borderWidth: 0,
    elevation: 2,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#ef5350',
    elevation: 3,
  },
});

export default PanggilBantuan;
