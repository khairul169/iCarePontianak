import React, { useState } from "react";
import { connect } from "react-redux";
import API from "../Public/API";
import { getTimeString } from "../Public/Utils";
import { navigateToMainStack } from "../Screens";

import { View, StyleSheet, ScrollView } from "react-native";
import { Header, Button, ItemDetail, MiniMap } from "../Components";

const KonfirmasiLayanan = ({ navigation, token }) => {
  const [loading, setLoading] = useState(false);

  // params
  const { type, title, data, location } = navigation.getParam("layanan");

  // navigate to layanan screen
  const navigateLayanan = () => {
    navigation.reset(navigateToMainStack("Layanan"), 0);
  };

  const buatLayanan = () => {
    if (loading) return;

    // set state
    setLoading(true);

    // create service
    const body = { type, data, location };
    API.post("service/", body, token).then(({ success }) => {
      setLoading(false);
      if (success) navigateLayanan();
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Konfirmasi Layanan" backButton navigation={navigation} />

      <ScrollView style={styles.container}>
        <MiniMap borderRadius={3} style={styles.map} coordinate={location} />

        <View style={styles.content}>
          <ItemDetail
            icon="mother-nurse"
            margin={false}
            title="Jenis Layanan"
            text={title}
            border
          />

          <ItemDetail
            icon="account-alert"
            title="Keluhan Utama"
            text={data.keluhan}
            border
          />

          <ItemDetail
            icon="briefcase-edit"
            title="Jenis Tindakan"
            text={data.tindakan}
            border
          />

          {data.diagnosa ? (
            <ItemDetail
              icon="clipboard-pulse"
              title="Diagnosa Medis"
              text={data.diagnosa}
              border
            />
          ) : null}

          <ItemDetail
            icon="home-map-marker"
            title="Lokasi Klien"
            text={data.alamat}
            border
          />

          <ItemDetail
            icon="calendar-clock"
            title="Waktu Kunjungan"
            text={getTimeString(data.waktu)}
          />
        </View>

        <View style={styles.content}>
          <Button
            title="Buat Layanan"
            style={styles.btnKonfirmasi}
            color="#fff"
            onPress={buatLayanan}
          />
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
    padding: 16,
    borderColor: "#eee",
    borderTopWidth: 1
  },
  btnKonfirmasi: {
    backgroundColor: "#8BC34A",
    borderWidth: 0
  }
});

const mapStateToProps = ({ auth }) => ({
  token: auth.token
});

export default connect(mapStateToProps)(KonfirmasiLayanan);
