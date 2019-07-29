import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, MiniMap } from "../../Components";
import ItemHeader from "./ItemHeader";
import UserInfo from "./UserInfo";
import ItemDetail from "./ItemDetail";
import { getRoleName } from "../../Utils";

const Layanan = ({ item, collapsed, onPress }) => {
  const renderActions = () => {
    if (!item.user) {
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

        {item.user.role > 1 && (
          <Button
            title="Layanan Selesai"
            style={styles.btnSelesai}
            border={false}
            color="#fff"
            icon="checkbox-marked-circle"
          />
        )}
      </View>
    );
  };
  return (
    <View style={styles.card}>
      <ItemHeader
        title={item.user ? "Layanan" : "Mencari Petugas..."}
        subtitle={item.user ? `#${item.id}` : null}
        collapsed={collapsed}
        onPress={onPress}
        border
      />
      {item.user && (
        <UserInfo
          title={item.user.name}
          registered={item.user.registered}
          subtitle={getRoleName(item.user.role)}
          reputation={item.user.reputation}
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
    backgroundColor: "#8BC34A",
    marginTop: 16
  },
  actionContainer: {
    flexDirection: "row"
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
