import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card } from "../Components";
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
      <View style={styles.listPelayanan}>
        <Card flex={1}>
          <ItemPelayanan
            image={iconGadar}
            title="Gawat Darurat"
            card
            height={128}
          />
        </Card>
        <Card flex={1} marginLeft={16}>
          <ItemPelayanan
            image={iconMedVisit}
            title="Kunjungan Medis"
            card
            height={128}
          />
        </Card>
      </View>

      <Card marginX={16} style={styles.listPelayanan}>
        <ItemPelayanan image={iconLabDarah} title="Lab Darah" noMargin />
        <ItemPelayanan image={iconGigi} title="Kesehatan Gigi" />
        <ItemPelayanan image={iconBidan} title="Bidan Terampil" />

        <View style={styles.separatorPelayanan} />

        <ItemPelayanan image={iconLansia} title="Lansia" noMargin />
        <ItemPelayanan image={iconSanitasi} title="Sanitasi" />
        <ItemPelayanan image={iconDietNutrisi} title="Diet Nutrisi" />
      </Card>

      <View style={styles.bottomMargin} />
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
  listPelayanan: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    flexWrap: "wrap",
    marginTop: 16
  },
  separatorPelayanan: {
    width: "100%"
  },
  bottomMargin: {
    marginBottom: 16
  }
});

export default Beranda;
