import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import MapView from "react-native-maps";
import {
  Button,
  Header,
  TextEdit,
  Title,
  PickerSelect,
  DateTimePicker
} from "../Components";

const Layanan = [
  {
    name: "medicalvisit",
    title: "Kunjungan Medis",
    actions: [
      "Injeksi",
      "Intravena Infus",
      "Perawatan Luka",
      "Pemenuhan Nutrisi",
      "Cek Gula Darah, Asam Urat, dan Kolesterol"
    ]
  },
  {
    name: "labmedik",
    title: "Cek Lab Medik",
    actions: [
      "Tes Darah Lengkap",
      "Uji Protein C - Reaktif",
      "Laju Endap Darah",
      "Tes Elektrolit",
      "Tes Koagulasi",
      "Cek Urin",
      "Cek Sampel Dahak",
      "Tes ELISA",
      "Analisa Gas Darah",
      "Penilaian Risiko Penyakit Jantung"
    ]
  },
  {
    name: "gigi",
    title: "Kesehatan Gigi",
    actions: ["Pemeriksaan Gigi dan Gusi", "Perawatan Oral Hygiene"]
  },
  {
    name: "bidan",
    title: "Bidan Terampil",
    actions: [
      "Pemeriksaan Kehamilan",
      "Konsultasi",
      "Senam Cantik",
      "Senam Yoga Hamil & Nifas",
      "Baby Spa",
      "Pijat Bayi"
    ]
  },
  {
    name: "lansia",
    title: "Pendampingan Lansia",
    actions: ["Pendampingan Lansia", "Konsultasi"]
  },
  {
    name: "sanitasi",
    title: "Sanitasi",
    actions: ["Instalasi Jamban", "Fogging", "Pemberantasan Hama"]
  },
  {
    name: "dietnutrisi",
    title: "Diet dan Nutrisi",
    actions: [
      "Konsultasi Gizi Nutrisi Diet Biasa",
      "Konsultasi Diet Penyakit Jantung",
      "Konsultasi Diet Diabetes",
      "Konsultasi Diet Asam Urat dan Kolesterol",
      "Konsultasi Diet Pasca Operasi"
    ]
  }
];

const BuatLayanan = ({ navigation }) => {
  // States
  const [tindakan, setTindakan] = useState();

  const dateTimeChanged = value => {
    console.log(value);
  };

  // Cek layanan
  const namaLayanan = navigation.getParam("layanan", null);
  const layanan = Layanan.find(item => item.name === namaLayanan);

  // Tambahkan pilihan default
  layanan.actions.splice(0, 0, "Lain-lain");

  // Map item tindakan
  const actionItems = layanan
    ? layanan.actions.map((item, index) => ({ label: item, value: item }))
    : null;

  return (
    <View style={styles.container}>
      <Header title={layanan.title} backButton navigation={navigation} />

      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Title marginBottom={0}>Keluhan Utama</Title>
          <TextEdit />

          <Title marginTop={16}>Jenis Tindakan</Title>
          <PickerSelect
            items={actionItems}
            value={tindakan}
            onValueChange={item => setTindakan(item)}
          />

          {layanan.name === "medicalvisit" && (
            <Title marginTop={16} marginBottom={0}>
              Diagnosa Medis (opsional)
            </Title>
          )}
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
          <DateTimePicker
            ref={ref => {
              this.dtPicker = ref;
            }}
            onValueChange={dateTimeChanged}
          />
          <Button
            title="Pilih Tanggal dan Jam"
            onPress={() => this.dtPicker.show()}
          />
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
