import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, MiniMap } from "../../Components";
import ItemHeader from "./ItemHeader";
import UserInfo from "./UserInfo";
import ItemDetail from "./ItemDetail";

const Layanan = ({ item, collapsed, onPress }) => {
  const userData = true;

  const renderActions = () => {
    if (!userData) {
      return (
        <Button
          title="Batalkan"
          style={styles.actionButton}
          small
          icon="cancel"
        />
      );
    }

    return (
      <View>
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
    );
  };
  return (
    <View style={styles.card}>
      <ItemHeader
        title={userData ? "Layanan" : "Mencari Petugas..."}
        subtitle={userData ? `#${item.id}` : null}
        collapsed={collapsed}
        onPress={onPress}
        border
      />
      {userData && (
        <UserInfo
          title="Khairul Hidayat"
          registered="28 Juli 2019"
          subtitle="Perawat"
          reputation
          online
        />
      )}
      <MiniMap coordinate={item.data.lokasi} />

      <View style={styles.content}>
        {collapsed && <ItemDetail type={item.type} data={item.data} />}
        {renderActions()}
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
  },
  waitingText: {
    alignSelf: "center",
    fontSize: 16,
    color: "#626262",
    marginVertical: 16
  }
});

export default Layanan;
