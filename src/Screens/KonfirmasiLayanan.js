import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Header, Button, ItemDetail, MiniMap } from "../Components";
import { getTimeString } from "../Utils";

const KonfirmasiLayanan = ({ navigation }) => {
  const { name, title, data } = navigation.getParam("layanan");

  const buatLayanan = () => {};

  return (
    <View style={styles.container}>
      <Header title="Konfirmasi Layanan" backButton navigation={navigation} />

      <ScrollView style={styles.container}>
        <View>
          <View style={styles.content}>
            <ItemDetail
              icon="mother-nurse"
              margin={false}
              title="Jenis Layanan"
              text={title}
            />
          </View>

          <View style={styles.content}>
            <ItemDetail
              icon="account-alert"
              margin={false}
              title="Keluhan Utama"
              text={data.keluhan}
              border
            />

            <ItemDetail
              icon="briefcase-edit"
              title="Jenis Tindakan"
              text={data.tindakan}
              border={name === "medicalvisit"}
            />

            {name === "medicalvisit" && (
              <ItemDetail
                icon="box-cutter"
                title="Diagnosa Medis"
                text={data.diagnosa || "-"}
              />
            )}
          </View>

          <View style={styles.content}>
            <ItemDetail
              icon="home-map-marker"
              title="Lokasi Klien"
              text={data.alamat}
              margin={false}
            >
              <MiniMap borderRadius={3} style={styles.map} />
            </ItemDetail>

            <ItemDetail
              icon="calendar-clock"
              title="Waktu Kunjungan"
              text={getTimeString(data.waktu)}
            />
          </View>

          <Button
            title="Konfirmasi Layanan"
            height={55}
            style={styles.btnKonfirmasi}
            color="#fff"
            border={false}
            onPress={buatLayanan}
          />
        </View>
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
    marginTop: 8,
    backgroundColor: "#fff"
  },
  map: {
    marginTop: 16
  },
  btnKonfirmasi: {
    backgroundColor: "#8BC34A"
  }
});

export default KonfirmasiLayanan;
