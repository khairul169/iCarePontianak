import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { HomeHeader, ItemLayanan } from "../Components";

// Images
import iconGadar from "../Assets/Layanan/gadar.jpg";
import iconMedVisit from "../Assets/Layanan/medical-visit.jpg";
import iconLabMedik from "../Assets/Layanan/labdarah.jpg";
import iconGigi from "../Assets/Layanan/gigi.jpg";
import iconBidan from "../Assets/Layanan/bidan.jpg";
import iconLansia from "../Assets/Layanan/lansia.jpg";
import iconSanitasi from "../Assets/Layanan/sanitasi.jpg";
import iconDietNutrisi from "../Assets/Layanan/dietnutrisi.jpg";

const MainItems = ({ navigation }) => {
  const navigateTo = (route, data) => {
    navigation.navigate(route, data);
  };

  const buatLayanan = name => {
    navigateTo("BuatLayanan", { layanan: name });
  };

  return (
    <View style={styles.container}>
      <View style={styles.separator} />

      <View style={styles.mainContent}>
        <Text style={styles.textPelayanan}>Layanan Kami</Text>

        <View style={styles.row}>
          <ItemLayanan
            image={iconGadar}
            border={false}
            title="Gawat Darurat"
            onPress={() => navigateTo("Gadar")}
          />

          <ItemLayanan
            image={iconMedVisit}
            border={false}
            title="Kunjungan Medis"
            onPress={() => buatLayanan("medicalvisit")}
          />
        </View>
      </View>

      <View style={styles.separator} />

      <View style={styles.pelayanan}>
        <View style={styles.row}>
          <ItemLayanan
            image={iconLabMedik}
            title="Lab Medik"
            onPress={() => buatLayanan("labmedik")}
          />
          <ItemLayanan
            image={iconGigi}
            title="Kesehatan Gigi"
            onPress={() => buatLayanan("gigi")}
          />
          <ItemLayanan
            image={iconBidan}
            title="Bidan Terampil"
            onPress={() => buatLayanan("bidan")}
          />
        </View>

        <View style={styles.row}>
          <ItemLayanan
            image={iconLansia}
            title="Lansia"
            onPress={() => buatLayanan("lansia")}
          />
          <ItemLayanan
            image={iconSanitasi}
            title="Sanitasi"
            onPress={() => buatLayanan("sanitasi")}
          />
          <ItemLayanan
            image={iconDietNutrisi}
            title="Diet Nutrisi"
            onPress={() => buatLayanan("dietnutrisi")}
          />
        </View>
      </View>
    </View>
  );
};

const Beranda = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <HomeHeader />
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
