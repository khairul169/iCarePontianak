import React, { useState } from "react";
import { connect } from "react-redux";
import API from "../API";
import { getTimeString } from "../Utils";
import { NavigationActions } from "react-navigation";

import { View, StyleSheet, ScrollView } from "react-native";
import { Header, Button, ItemDetail, MiniMap } from "../Components";

const KonfirmasiLayanan = ({ navigation, token }) => {
  const [loading, setLoading] = useState(false);

  // params
  const { type, title, data } = navigation.getParam("layanan");

  const navigateToNotification = () => {
    // navigate to main route
    const action = NavigationActions.navigate({
      routeName: "Main",
      action: NavigationActions.navigate({ routeName: "Notifikasi" })
    });
    // reset stack
    navigation.reset([action], 0);
  };

  const buatLayanan = () => {
    if (loading) return;

    // set state
    setLoading(true);

    // create service
    API.post("service/", { type, data }, token).then(({ success }) => {
      setLoading(false);
      if (success) navigateToNotification();
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Konfirmasi Layanan" backButton navigation={navigation} />

      <ScrollView style={styles.container}>
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
            border={data.diagnosa ? true : false}
          />

          {data.diagnosa ? (
            <ItemDetail
              icon="box-cutter"
              title="Diagnosa Medis"
              text={data.diagnosa}
            />
          ) : null}
        </View>

        <View style={styles.content}>
          <ItemDetail
            icon="home-map-marker"
            title="Lokasi Klien"
            text={data.alamat}
            margin={false}
          >
            <MiniMap
              borderRadius={3}
              style={styles.map}
              coordinate={data.lokasi}
            />
          </ItemDetail>

          <ItemDetail
            icon="calendar-clock"
            title="Waktu Kunjungan"
            text={getTimeString(data.waktu)}
          />
        </View>

        <Button
          title="Buat Layanan"
          height={55}
          style={styles.btnKonfirmasi}
          color="#fff"
          border={false}
          onPress={buatLayanan}
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

const mapStateToProps = ({ auth }) => ({
  token: auth.token
});

export default connect(mapStateToProps)(KonfirmasiLayanan);
