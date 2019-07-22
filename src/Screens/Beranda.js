import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Header from "../Components/Home/Header";
import ItemPelayanan from "../Components/Home/ItemPelayanan";

// Images
import iconGadar from "../../assets/pelayanan/gadar.jpg";
import iconMedVisit from "../../assets/pelayanan/medical-visit.jpg";
import iconLabDarah from "../../assets/pelayanan/labdarah.jpg";
import iconGigi from "../../assets/pelayanan/gigi.jpg";
import iconBidan from "../../assets/pelayanan/bidan.jpg";
import iconLansia from "../../assets/pelayanan/lansia.jpg";
import iconSanitasi from "../../assets/pelayanan/sanitasi.jpg";
import iconDietNutrisi from "../../assets/pelayanan/dietnutrisi.jpg";

const MainItems = () => {
  return (
    <View>
      <View style={styles.mainPelayanan}>
        <ItemPelayanan image={iconGadar} title="Gawat Darurat" />
        <ItemPelayanan
          image={iconMedVisit}
          title="Kunjungan Medis"
          borderLeft
        />
      </View>

      <View style={styles.altPelayanan}>
        <ItemPelayanan image={iconLabDarah} title="Lab Darah" />
        <ItemPelayanan image={iconGigi} title="Kesehatan Gigi" />
        <ItemPelayanan image={iconBidan} title="Bidan Terampil" />

        <View style={styles.separatorPelayanan} />

        <ItemPelayanan image={iconLansia} title="Lansia" />
        <ItemPelayanan image={iconSanitasi} title="Sanitasi" />
        <ItemPelayanan image={iconDietNutrisi} title="Diet Nutrisi" />
      </View>
    </View>
  );
};

const Beranda = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
        <MainItems />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2"
  },
  content: {
    flex: 1
  },
  mainPelayanan: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-evenly",
    height: 120,
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 16
  },
  altPelayanan: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-evenly",
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 16,
    flexWrap: "wrap"
  },
  separatorPelayanan: {
    marginTop: 20,
    width: "100%"
  }
});

export default Beranda;
