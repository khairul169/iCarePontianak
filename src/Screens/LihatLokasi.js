import React from "react";
import { View, StyleSheet } from "react-native";
import { Header, MapLayout } from "../Components";

const LihatLokasi = ({ navigation }) => {
  const location = navigation.getParam("location");

  return (
    <View style={styles.container}>
      <Header
        title="Lihat Lokasi"
        transparent
        backButton
        navigation={navigation}
      />

      <View style={styles.container}>
        <MapLayout style={styles.container} coordinate={location} pin navPath />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default LihatLokasi;
