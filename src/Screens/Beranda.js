import React, { useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { HomeHeader } from "../Components";
import ItemLayanan from "./Beranda/ItemLayanan";
import { Service } from "../Consts";
import { requestLocationPermission } from "../Permissions";

// Images
import iconGadar from "../../assets/layanan/gadar.jpg";
import iconMedVisit from "../../assets/layanan/medical-visit.jpg";
import iconLabMedik from "../../assets/layanan/labdarah.jpg";
import iconGigi from "../../assets/layanan/gigi.jpg";
import iconBidan from "../../assets/layanan/bidan.jpg";
import iconLansia from "../../assets/layanan/lansia.jpg";
import iconSanitasi from "../../assets/layanan/sanitasi.jpg";
import iconDietNutrisi from "../../assets/layanan/dietnutrisi.jpg";

const MainItems = ({ navigation }) => {
  // ask permissions
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const navigateTo = (route, data) => {
    navigation.navigate(route, data);
  };

  const buatLayanan = type => {
    navigateTo("BuatLayanan", { layanan: type });
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
            onPress={() => buatLayanan(Service.MEDICALVISIT)}
          />
        </View>
      </View>

      <View style={styles.separator} />

      <View style={styles.pelayanan}>
        <View style={styles.row}>
          <ItemLayanan
            image={iconLabMedik}
            title="Lab Medik"
            onPress={() => buatLayanan(Service.LABMEDIK)}
          />
          <ItemLayanan
            image={iconGigi}
            title="Kesehatan Gigi"
            onPress={() => buatLayanan(Service.GIGI)}
          />
          <ItemLayanan
            image={iconBidan}
            title="Bidan Terampil"
            onPress={() => buatLayanan(Service.BIDAN)}
          />
        </View>

        <View style={styles.row}>
          <ItemLayanan
            image={iconLansia}
            title="Lansia"
            onPress={() => buatLayanan(Service.LANSIA)}
          />
          <ItemLayanan
            image={iconSanitasi}
            title="Sanitasi"
            onPress={() => buatLayanan(Service.SANITASI)}
          />
          <ItemLayanan
            image={iconDietNutrisi}
            title="Diet Nutrisi"
            onPress={() => buatLayanan(Service.NUTRISI)}
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
