import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Header, MapLayout, Button } from "../Components";
import { pinImage } from "../Assets";

const PilihLokasi = ({ navigation }) => {
  // state
  const [location, setLocation] = useState();

  const onRegionChanged = ({ latitude, longitude }) => {
    setLocation({
      latitude,
      longitude
    });
  };

  const selectLocation = () => {
    // return data
    const callback = navigation.state.params.callback;
    callback && callback(location);

    // back
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header transparent backButton navigation={navigation} />

      <View style={styles.container}>
        <MapLayout
          style={styles.mapView}
          onRegionChanged={onRegionChanged}
          coordinate={navigation.getParam("location")}
        />

        <View style={styles.pinContainer}>
          <Image source={pinImage} style={styles.pin} />
        </View>

        <Button
          icon="map-marker-radius"
          title="Pilih Posisi Ini"
          style={styles.selectButton}
          border={false}
          color="#fff"
          onPress={selectLocation}
        />
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
  selectButton: {
    position: "absolute",
    bottom: 16,
    paddingHorizontal: 32,
    alignSelf: "center",
    backgroundColor: "#03A9F4",
    elevation: 3
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
  }
});

export default PilihLokasi;
