import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity
} from "react-native";
import MapView from "react-native-maps";
import { Header, Title } from "../Components";

const TextEdit = ({ style, placeholder }) => {
  const containerStyle = [
    {
      borderBottomColor: "#ccc",
      borderBottomWidth: 1
    },
    style
  ];

  return (
    <View style={containerStyle}>
      <TextInput
        placeholder={placeholder}
        style={{
          flex: 1,
          padding: 0,
          paddingVertical: 8,
          fontSize: 14,
          color: "#333"
        }}
      />
    </View>
  );
};

const Button = ({
  title,
  backgroundColor,
  color,
  marginTop,
  height = 40,
  border = true
}) => {
  return (
    <View
      style={[
        {
          backgroundColor: backgroundColor || "#fff"
        },
        marginTop && { marginTop },
        border && {
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 2
        }
      ]}
    >
      <TouchableOpacity
        style={[
          {
            alignItems: "center",
            justifyContent: "center",
            height: 40
          },
          {
            height
          }
        ]}
      >
        <Text
          style={{
            color: color || "#626262",
            fontSize: 14,
            fontWeight: "bold"
          }}
        >
          {title.toUpperCase()}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

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
          <MapView style={{ height: 200 }} scrollEnabled={false} />
        </View>

        <View style={styles.content}>
          <Title>Waktu Kunjungan</Title>
          <Button title="Pilih Tanggal" />
          <Button title="Pilih Jam" marginTop={8} />
        </View>

        <Button
          title="Buat Kunjungan"
          height={55}
          backgroundColor="#4CAF50"
          color="#fff"
          border={false}
          marginTop={8}
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
  }
});

export default BuatLayanan;
