import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Header } from "../Components";

const Notifikasi = props => {
  return (
    <View style={styles.container}>
      <Header title="Notifikasi" />

      <View style={styles.content}>
        <Text>Notifikasi</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    padding: 16
  }
});

export default Notifikasi;
