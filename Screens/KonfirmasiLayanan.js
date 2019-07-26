import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Header, Icon, Title, Button } from "../Components";
import { MapsLokasi } from "./BuatLayanan";
import { getTimeString } from "../Utils";

const InputItem = ({ children, icon, margin = true, border }) => {
  const containerStyle = [
    {
      flexDirection: "row"
    },
    margin && { marginTop: 16 }
  ];

  const contentStyle = [
    {
      flex: 1,
      marginHorizontal: 12
    },
    border && {
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
      paddingBottom: 16
    }
  ];

  return (
    <View style={containerStyle}>
      <Icon name={icon} size={18} color="#626262" />
      <View style={contentStyle}>{children}</View>
    </View>
  );
};

const KonfirmasiLayanan = ({ navigation }) => {
  const { name, title, data } = navigation.getParam("layanan");

  const buatLayanan = () => {};

  const renderItems = () => (
    <View>
      <View style={styles.content}>
        <InputItem icon="mother-nurse" margin={false}>
          <Title>Jenis Layanan</Title>
          <Text>{title}</Text>
        </InputItem>
      </View>

      <View style={styles.content}>
        <InputItem icon="account-alert" margin={false} border>
          <Title>Keluhan Utama</Title>
          <Text>{data.keluhan}</Text>
        </InputItem>

        <InputItem icon="briefcase-edit" border>
          <Title>Jenis Tindakan</Title>
          <Text>{data.tindakan}</Text>
        </InputItem>

        {name === "medicalvisit" && (
          <InputItem icon="box-cutter">
            <Title>Diagnosa Medis</Title>
            <Text>{data.diagnosa || "-"}</Text>
          </InputItem>
        )}
      </View>

      <View style={styles.content}>
        <InputItem icon="home-map-marker" margin={false}>
          <Title>Lokasi Klien</Title>
          <Text>{data.alamat}</Text>
          <MapsLokasi />
        </InputItem>

        <InputItem icon="calendar-clock">
          <Title>Waktu Kunjungan</Title>
          <Text>{getTimeString(data.waktu)}</Text>
        </InputItem>
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
  );

  return (
    <View style={styles.container}>
      <Header title="Konfirmasi Layanan" backButton navigation={navigation} />

      <ScrollView style={styles.container}>{renderItems()}</ScrollView>
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
  btnKonfirmasi: {
    marginTop: 8,
    backgroundColor: "#8BC34A"
  }
});

export default KonfirmasiLayanan;
