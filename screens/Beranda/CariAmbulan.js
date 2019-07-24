import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Header, BottomSheet, MapLayout } from "../../components";

const CariAmbulan = ({ navigation }) => {
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

      <MapLayout style={styles.mapView} />

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
