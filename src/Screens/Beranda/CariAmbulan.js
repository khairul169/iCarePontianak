import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Header } from "../../Components";
import MapView from "react-native-maps";

const CariAmbulan = ({ navigation }) => {
  const [mapMargin, setMapMargin] = useState(1);

  const initialRegion = {
    latitude: -0.0257813,
    longitude: 109.3323449,
    latitudeDelta: 0.1,
    longitudeDelta: 0.05
  };

  return (
    <View style={styles.container}>
      <Header title="Cari Ambulan" backButton navigation={navigation} />

      <MapView
        style={[styles.mapView, { margin: mapMargin }]}
        initialRegion={initialRegion}
        showsUserLocation={true}
        onMapReady={() => {
          setMapMargin(0);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapView: {
    flex: 1
  }
});

export default CariAmbulan;
