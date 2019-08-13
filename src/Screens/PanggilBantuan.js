import React, { useState } from "react";
import { connect } from "react-redux";
import API from "../API";
import { navigateToMainStack } from "../Routes";

import { View, StyleSheet, Image } from "react-native";
import { Header, MapLayout, Button, PickerSelect } from "../Components";
import { Service } from "../Consts";
import pinImage from "../../assets/pins/pin.png";

const PanggilBantuan = ({ navigation, token }) => {
  const jenisBantuan = [
    "Kecelakaan Lalu Lintas",
    "Kebakaran",
    "Stroke",
    "Gagal Jantung / Henti Nafas",
    "Lain-lain"
  ];

  // state
  const [loading, setLoading] = useState(false);
  const [kejadian, setKejadian] = useState(jenisBantuan[0]);
  const [lokasi, setLokasi] = useState();

  const onRegionChanged = ({ latitude, longitude }) => {
    setLokasi({
      latitude,
      longitude
    });
  };

  // navigate to layanan screen
  const navigateLayanan = () => {
    navigation.reset(navigateToMainStack("Layanan"), 0);
  };

  const submit = () => {
    if (loading) return;

    // set state
    setLoading(true);

    const body = {
      type: Service.EMERGENCY,
      data: { kejadian },
      location: lokasi
    };

    // create service
    API.post("service/", body, token).then(({ success }) => {
      setLoading(false);
      if (success) navigateLayanan();
    });
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
    flex: 1
  },
  mapView: {
    flex: 1
  },
  pinContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  pin: {
    width: 48,
    height: 48,
    marginTop: -48,
    resizeMode: "contain"
  },
  action: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16
  },
  pilihanBantuan: {
    borderWidth: 0,
    elevation: 2,
    marginBottom: 16
  },
  submitButton: {
    backgroundColor: "#ef5350",
    elevation: 3
  }
});

const mapStateToProps = ({ auth }) => ({
  token: auth.token
});

export default connect(mapStateToProps)(PanggilBantuan);
