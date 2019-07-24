import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Header, BottomSheet } from "../../components";
import MapView, { Marker } from "react-native-maps";

const CariAmbulan = ({ navigation }) => {
  const initialRegion = {
    latitude: -0.0257813,
    longitude: 109.3323449,
    latitudeDelta: 0.015,
    longitudeDelta: 0.02
  };

  const [mapRegion, setMapRegion] = useState(initialRegion);
  const [userLocation, setUserLocation] = useState();

  useEffect(() => {
    this.bottomSheet && this.bottomSheet.hide();
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
        ref={ref => {
          this.mapView = ref;
        }}
        style={styles.mapView}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={false}
        onRegionChangeComplete={region => {
          setMapRegion(region);
        }}
        onUserLocationChange={event => {
          const { latitude, longitude } = event.nativeEvent.coordinate;
          setUserLocation({ latitude, longitude });

          this.mapView.animateToRegion({
            ...mapRegion,
            latitude,
            longitude
          });
        }}
      >
        {userLocation && <Marker coordinate={userLocation} />}
      </MapView>

      <View style={styles.bottomMargin} />
      <BottomSheet
        ref={ref => {
          this.bottomSheet = ref;
        }}
        headerHeight={32}
        style={styles.bottomPanel}
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
  },
  bottomPanel: {
    elevation: 10
  }
});

export default CariAmbulan;
