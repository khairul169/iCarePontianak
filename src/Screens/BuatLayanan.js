import React, { useState } from "react";
import { View, StyleSheet, ScrollView, ToastAndroid } from "react-native";
import {
  Button,
  Header,
  TextEdit,
  Title,
  PickerSelect,
  DateTimePicker,
  MiniMap
} from "../Components";
import { Service } from "../Consts";
import { getTimeString } from "../Utils";

const Layanan = [
  {
    type: Service.MEDICALVISIT,
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
    type: Service.LABMEDIK,
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
    type: Service.GIGI,
    title: "Kesehatan Gigi",
    actions: ["Pemeriksaan Gigi dan Gusi", "Perawatan Oral Hygiene"]
  },
  {
    type: Service.BIDAN,
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
    type: Service.LANSIA,
    title: "Pendampingan Lansia",
    actions: ["Pendampingan Lansia", "Konsultasi"]
  },
  {
    type: Service.SANITASI,
    title: "Sanitasi",
    actions: ["Instalasi Jamban", "Fogging", "Pemberantasan Hama"]
  },
  {
    type: Service.NUTRISI,
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
  // Cek layanan
  const typeLayanan = navigation.getParam("layanan", null);
  const layanan = Layanan.find(item => item.type === typeLayanan);

  // Item tindakan
  const defaultAction = "Lain-lain";
  const actionItems = layanan
    ? [defaultAction, ...layanan.actions]
    : defaultAction;

  // States
  const [keluhan, setKeluhan] = useState("");
  const [tindakan, setTindakan] = useState(defaultAction);
  const [diagnosa, setDiagnosa] = useState("");
  const [alamat, setAlamat] = useState("");
  const [lokasi, setLokasi] = useState();
  const [waktu, setWaktu] = useState();

  const buatLayanan = () => {
    if (keluhan.trim() === "" || alamat.trim() === "" || !waktu || !lokasi) {
      ToastAndroid.show(
        "Mohon periksa lagi input yang tersedia.",
        ToastAndroid.LONG
      );
      return;
    }

    let dataLayanan = {
      keluhan,
      tindakan,
      alamat,
      waktu,
      diagnosa
    };

    navigation.navigate("KonfirmasiLayanan", {
      layanan: {
        type: layanan.type,
        title: layanan.title,
        data: dataLayanan,
        location: lokasi
      }
    });
  };

  return (
    <View style={styles.container}>
      <Header title={layanan.title} backButton navigation={navigation} />

      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Title marginBottom={4}>Keluhan Utama</Title>
          <TextEdit
            placeholder="Keluhan yang dirasakan saat ini..."
            value={keluhan}
            capitalize
            onChangeText={value => setKeluhan(value)}
          />

          <Title marginTop={16}>Jenis Tindakan</Title>
          <PickerSelect
            items={actionItems}
            value={tindakan}
            onValueChange={item => setTindakan(item)}
          />

          {layanan.type === Service.MEDICALVISIT && (
            <View>
              <Title marginTop={16} marginBottom={4}>
                Diagnosa Medis (opsional)
              </Title>
              <TextEdit
                placeholder="..."
                value={diagnosa}
                capitalize
                onChangeText={value => setDiagnosa(value)}
              />
            </View>
          )}
        </View>

        <View style={styles.content}>
          <Title marginBottom={4}>Lokasi</Title>
          <TextEdit
            placeholder="Alamat lengkap..."
            value={alamat}
            capitalize
            onChangeText={value => setAlamat(value)}
          />
          <MiniMap
            borderRadius={3}
            onPress={() =>
              navigation.navigate("PilihLokasi", {
                location: lokasi,
                callback: setLokasi
              })
            }
            style={styles.map}
            coordinate={lokasi}
          />

          <Title marginTop={16}>Waktu Kunjungan</Title>
          <DateTimePicker
            ref={ref => {
              this.dtPicker = ref;
            }}
            onValueChange={value => setWaktu(value)}
          />
          <Button
            title={waktu ? getTimeString(waktu) : "Pilih Tanggal dan Jam"}
            onPress={() => this.dtPicker.show()}
            small
            icon="clock-outline"
          />
        </View>

        <Button
          title="Lanjutkan"
          height={55}
          border={false}
          onPress={buatLayanan}
          style={styles.btnBuat}
          color="#fff"
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
    paddingVertical: 24,
    backgroundColor: "#fff",
    marginTop: 8
  },
  map: {
    marginTop: 16
  },
  btnBuat: {
    backgroundColor: "#03A9F4"
  }
});

export default BuatLayanan;
