import React, { useEffect } from "react";
import { connect } from "react-redux";

import { View, StyleSheet, Text, ScrollView } from "react-native";
import { HomeHeader, Title } from "../Components";
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

const Beranda = ({ navigation, user }) => {
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
      <HomeHeader />
      <ScrollView style={styles.content}>
        <Title style={styles.title}>
          Selamat Datang{user && `, ${user.name.split(" ")[0]}`}!
        </Title>
        <Text style={styles.subtitle}>Ada yang bisa dibantu?</Text>

        <View style={styles.layananUtama}>
          <View style={styles.row}>
            <ItemLayanan
              first
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

        <Title style={styles.title}>Layanan Kami</Title>

        <View style={styles.layanan}>
          <View style={styles.row}>
            <ItemLayanan
              first
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
              first
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
  layananUtama: {
    height: 180,
    padding: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 18,
    color: "#37474F",
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 6
  },
  subtitle: {
    fontSize: 12,
    color: "#626262",
    marginBottom: 12,
    marginLeft: 16
  },
  layanan: {
    flex: 1,
    height: 240,
    padding: 8
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch"
  }
});

const mapStateToProps = ({ akun }) => ({
  user: akun.userData
});

export default connect(mapStateToProps)(Beranda);
