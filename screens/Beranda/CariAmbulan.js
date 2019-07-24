import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Header, BottomSheet } from "../../components";
import MapView from "react-native-maps";

const CariAmbulan = ({ navigation }) => {
  const [mapMargin, setMapMargin] = useState(1);

  const initialRegion = {
    latitude: -0.0257813,
    longitude: 109.3323449,
    latitudeDelta: 0.1,
    longitudeDelta: 0.05
  };

  useEffect(() => {
    this.bottomSheet && this.bottomSheet.show(0, 2.0);
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title="Cari Ambulan"
        transparent
        backButton
        navigation={navigation}
      />

      <MapView
        style={[styles.mapView, { margin: mapMargin }]}
        initialRegion={initialRegion}
        showsUserLocation={true}
        onMapReady={() => {
          setMapMargin(0);
        }}
      />

      <View style={styles.bottomMargin} />
      <BottomSheet
        ref={ref => {
          this.bottomSheet = ref;
        }}
        headerHeight={32}
      >
        <Text>Test</Text>
      </BottomSheet>
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
  bottomMargin: {
    marginTop: 32
  }
});

export default CariAmbulan;
