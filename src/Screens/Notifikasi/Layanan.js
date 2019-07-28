import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, MiniMap } from "../../Components";
import ItemHeader from "./ItemHeader";
import UserInfo from "./UserInfo";
import ItemDetail from "./ItemDetail";

const Layanan = () => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <View style={styles.card}>
      <ItemHeader
        title="Layanan"
        subtitle="#4921"
        collapsed={showDetail}
        onPress={() => setShowDetail(!showDetail)}
        border
      />
      <UserInfo
        title="Khairul Hidayat"
        registered="28 Juli 2019"
        subtitle="Perawat"
        reputation
        online
      />
      <MiniMap />

      <View style={styles.content}>
        {showDetail && <ItemDetail />}

        <View style={styles.actionContainer}>
          <Button
            title="Hubungi"
            style={[styles.actionButton, styles.btnContact]}
            small
            icon="phone"
          />
          <Button
            title="Batalkan"
            style={styles.actionButton}
            small
            icon="cancel"
          />
        </View>

        <Button
          title="Layanan Selesai"
          style={styles.btnSelesai}
          border={false}
          color="#fff"
          icon="checkbox-marked-circle"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 8,
    backgroundColor: "#fff"
  },
  content: {
    padding: 16
  },
  btnSelesai: {
    backgroundColor: "#8BC34A"
  },
  actionContainer: {
    flexDirection: "row",
    marginBottom: 16
  },
  actionButton: {
    flex: 1
  },
  btnContact: {
    marginRight: 16
  }
});

export default Layanan;
