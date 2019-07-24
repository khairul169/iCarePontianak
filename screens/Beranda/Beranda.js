import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card } from "../../components";
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
    <View>
      <View style={styles.listPelayanan}>
        <Card flex={1}>
          <ItemPelayanan
            image={iconGadar}
            title="Gawat Darurat"
            card
            height={128}
            onPress={() => navigateTo("GawatDarurat")}
          />
        </Card>
        <Card flex={1} style={styles.cardMargin}>
          <ItemPelayanan
            image={iconMedVisit}
            title="Kunjungan Medis"
            card
            height={128}
          />
        </Card>
      </View>

      <Card style={styles.listPelayanan}>
        <ItemPelayanan image={iconLabDarah} title="Lab Darah" />
        <ItemPelayanan image={iconGigi} title="Kesehatan Gigi" />
        <ItemPelayanan image={iconBidan} title="Bidan Terampil" />

        <View style={styles.separatorPelayanan} />

        <ItemPelayanan image={iconLansia} title="Lansia" />
        <ItemPelayanan image={iconSanitasi} title="Sanitasi" />
        <ItemPelayanan image={iconDietNutrisi} title="Diet Nutrisi" />
      </Card>

      <View style={styles.bottomMargin} />
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
    backgroundColor: "#ECEFF1"
  },
  content: {
    flex: 1
  },
  listPelayanan: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginHorizontal: 16,
    marginTop: 16
  },
  separatorPelayanan: {
    width: "100%"
  },
  cardMargin: {
    marginLeft: 16
  },
  bottomMargin: {
    marginBottom: 16
  }
});

export default Beranda;
