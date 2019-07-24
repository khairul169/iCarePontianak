import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import Header from "../../components/Beranda/Header";
import ItemPelayanan from "../../components/Beranda/ItemPelayanan";

// Images
import iconGadar from "../../assets/pelayanan/gadar.jpg";
import iconMedVisit from "../../assets/pelayanan/medical-visit.jpg";
import iconLabDarah from "../../assets/pelayanan/labdarah.jpg";
import iconGigi from "../../assets/pelayanan/gigi.jpg";
import iconBidan from "../../assets/pelayanan/bidan.jpg";
import iconLansia from "../../assets/pelayanan/lansia.jpg";
import iconSanitasi from "../../assets/pelayanan/sanitasi.jpg";
import iconDietNutrisi from "../../assets/pelayanan/dietnutrisi.jpg";

const MainItems = ({ navigation }) => {
  const navigateTo = (route, data) => {
    navigation.navigate(route, {
      data
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.separator} />

      <View style={styles.mainContent}>
        <Text style={styles.textPelayanan}>Layanan Kami</Text>

        <View style={styles.row}>
          <ItemPelayanan
            image={iconGadar}
            border={false}
            title="Gawat Darurat"
            onPress={() => navigateTo("GawatDarurat")}
          />

          <ItemPelayanan
            image={iconMedVisit}
            border={false}
            title="Kunjungan Medis"
            onPress={() => navigateTo("Pelayanan")}
          />
        </View>
      </View>

      <View style={styles.separator} />

      <View style={styles.pelayanan}>
        <View style={styles.row}>
          <ItemPelayanan image={iconLabDarah} title="Lab Darah" />
          <ItemPelayanan image={iconGigi} title="Kesehatan Gigi" />
          <ItemPelayanan image={iconBidan} title="Bidan Terampil" />
        </View>

        <View style={styles.row}>
          <ItemPelayanan image={iconLansia} title="Lansia" />
          <ItemPelayanan image={iconSanitasi} title="Sanitasi" />
          <ItemPelayanan image={iconDietNutrisi} title="Diet Nutrisi" />
        </View>
      </View>
    </View>
  );
};

const Beranda = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
        <MainItems navigation={navigation} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  content: {
    flex: 1
  },
  mainContent: {
    height: 200,
    backgroundColor: "#fff",
    padding: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  textPelayanan: {
    fontSize: 18,
    color: "#37474F",
    marginBottom: 16
  },
  pelayanan: {
    flex: 1,
    backgroundColor: "#fff",
    height: 180
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch"
  },
  separator: {
    backgroundColor: "#B0BEC5",
    height: 8
  }
});

export default Beranda;
