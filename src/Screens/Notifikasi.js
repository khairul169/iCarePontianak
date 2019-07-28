import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Header } from "../Components";
import Layanan from "./Notifikasi/Layanan";

const Notifikasi = () => {
  return (
    <View style={styles.container}>
      <Header title="Notifikasi" />

      <ScrollView style={styles.container}>
        <Layanan />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B0BEC5"
  }
});

export default Notifikasi;
