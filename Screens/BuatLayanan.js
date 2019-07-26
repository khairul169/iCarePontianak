import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import MapView from "react-native-maps";
import { Button, Header, TextEdit, Title } from "../Components";

const BuatLayanan = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header title="Kunjungan Medis" backButton navigation={navigation} />

      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Title marginBottom={0}>Keluhan Utama</Title>
          <TextEdit />

          <Title marginTop={16}>Jenis Tindakan</Title>
          <Button title="Pilih Tindakan" />

          <Title marginTop={16} marginBottom={0}>
            Diagnosa Medis (opsional)
          </Title>
          <TextEdit />
        </View>

        <View style={styles.content}>
          <Title>Lokasi</Title>
          <View style={styles.locationMap}>
            <MapView style={styles.mapView} scrollEnabled={false} />
          </View>
        </View>

        <View style={styles.content}>
          <Title>Waktu Kunjungan</Title>
          <Button title="Pilih Tanggal" />
          <Button title="Pilih Jam" style={styles.topSpace} />
        </View>

        <Button
          title="Buat Layanan"
          height={55}
          backgroundColor="#4CAF50"
          color="#fff"
          border={false}
          style={styles.topSpace}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B0BEC5"
  },
  content: {
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 8
  },
  locationMap: {
    borderRadius: 3,
    height: 200,
    overflow: "hidden"
  },
  mapView: {
    flex: 1
  },
  topSpace: {
    marginTop: 8
  }
});

export default BuatLayanan;
