import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import MapView from "react-native-maps";
import {
  Button,
  Header,
  TextEdit,
  Title,
  PickerSelect,
  DateTimePicker,
  Icon
} from "../Components";
import moment from "moment";
import "moment/locale/id";

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

const InputItem = ({ children, icon, margin }) => {
  const containerStyle = [
    { flexDirection: "row" },
    margin && { marginTop: 16 }
  ];

  const contentStyle = { flex: 1, marginHorizontal: 8 };

  return (
    <View style={containerStyle}>
      <Icon name={icon} size={18} color="#626262" />
      <View style={contentStyle}>{children}</View>
    </View>
  );
};

const BuatLayanan = ({ navigation }) => {
  // States
  const [tindakan, setTindakan] = useState();
  const [waktu, setWaktu] = useState();

  const getTimeString = time => {
    moment.locale("id");
    return moment(time).format("DD MMMM YYYY HH.mm");
  };

  // Cek layanan
  const namaLayanan = navigation.getParam("layanan", null);
  const layanan = Layanan.find(item => item.name === namaLayanan);

  // Map item tindakan
  let actionItems = layanan ? ["Lain-lain", ...layanan.actions] : null;
  actionItems = actionItems.map(item => ({ label: item, value: item }));

  return (
    <View style={styles.container}>
      <Header title={layanan.title} backButton navigation={navigation} />

      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <InputItem icon="account-alert">
            <Title marginBottom={0}>Keluhan Utama</Title>
            <TextEdit placeholder="Keluhan yang dirasakan saat ini..." />
          </InputItem>

          <InputItem icon="briefcase-edit" margin>
            <Title>Jenis Tindakan</Title>
            <PickerSelect
              items={actionItems}
              value={tindakan}
              onValueChange={item => setTindakan(item)}
            />
          </InputItem>

          {layanan.name === "medicalvisit" && (
            <InputItem icon="box-cutter" margin>
              <Title marginBottom={0}>Diagnosa Medis (opsional)</Title>
              <TextEdit />
            </InputItem>
          )}
        </View>

        <View style={styles.content}>
          <InputItem icon="home-map-marker">
            <Title marginBottom={0}>Lokasi</Title>
            <TextEdit placeholder="Alamat lengkap..." />
            <View style={styles.locationMap}>
              <MapView style={styles.mapView} scrollEnabled={false} />
            </View>
          </InputItem>

          <InputItem icon="calendar-clock" margin>
            <Title>Waktu Kunjungan</Title>
            <DateTimePicker
              ref={ref => {
                this.dtPicker = ref;
              }}
              onValueChange={value => setWaktu(value)}
            />
            <Button
              title={waktu ? getTimeString(waktu) : "Pilih Tanggal dan Jam"}
              onPress={() => this.dtPicker.show()}
            />
          </InputItem>
        </View>

        <Button
          title="Buat Layanan"
          height={55}
          backgroundColor="#8BC34A"
          color="#fff"
          border={false}
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
    padding: 12,
    paddingVertical: 24,
    backgroundColor: "#fff",
    marginTop: 8
  },
  locationMap: {
    borderRadius: 3,
    height: 200,
    overflow: "hidden",
    marginTop: 16
  },
  mapView: {
    flex: 1
  }
});

export default BuatLayanan;
