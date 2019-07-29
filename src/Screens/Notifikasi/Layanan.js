import React from "react";
import { connect } from "react-redux";
import { setServiceStatus } from "../../Actions/Layanan.action";

import { View, StyleSheet, Linking, ToastAndroid } from "react-native";
import { Button, MiniMap } from "../../Components";
import ItemHeader from "./ItemHeader";
import UserInfo from "./UserInfo";
import ItemDetail from "./ItemDetail";
import { getRoleName } from "../../Utils";
import { Service } from "../../Consts";

const Layanan = props => {
  const { item, collapsed, onPress } = props;
  const { id, user, data } = item;
  const itemType = parseInt(item.type, 10);
  const isEmergency = itemType === Service.EMERGENCY;
  const userType = user ? parseInt(user.type, 10) : null;

  const contactUser = () => {
    if (!user) return;

    // contact user
    let phoneNumber = user.phone;
    if (phoneNumber) Linking.openURL(`tel:${phoneNumber}`);
    else
      ToastAndroid.show(
        "Pengguna belum memasukkan nomor telepon.",
        ToastAndroid.LONG
      );
  };

  const layananBatal = () => {
    props.setServiceStatus(id, "cancel");
  };

  const layananSelesai = () => {
    props.setServiceStatus(id, "success");
  };

  const renderActions = () => {
    if (!user) {
      return (
        <Button
          title="Batalkan"
          style={styles.actionButton}
          small
          icon="cancel"
          onPress={layananBatal}
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
            onPress={contactUser}
          />
          <Button
            title={isEmergency ? "Selesai" : "Batalkan"}
            style={styles.actionButton}
            small
            icon={isEmergency ? "check" : "cancel"}
            onPress={layananBatal}
          />
        </View>

        {!isEmergency && userType !== 1 && (
          <Button
            title="Layanan Selesai"
            style={styles.btnSelesai}
            border={false}
            color="#fff"
            icon="checkbox-marked-circle"
            onPress={layananSelesai}
          />
        )}
      </View>
    );
  };
  return (
    <View style={styles.card}>
      {!isEmergency ? (
        <ItemHeader
          title={user ? "Layanan" : "Mencari Petugas..."}
          subtitle={user ? `#${id}` : null}
          collapsed={collapsed}
          onPress={onPress}
          border
        />
      ) : (
        <ItemHeader
          title={"GAWAT DARURAT"}
          collapsed={collapsed}
          onPress={onPress}
          border
          emergency
        />
      )}
      {user && (
        <UserInfo
          title={user.name}
          registered={user.registered}
          subtitle={getRoleName(user.type)}
          reputation={user.reputation}
          online
        />
      )}
      <MiniMap coordinate={data.lokasi} />

      <View style={styles.content}>
        {collapsed && <ItemDetail type={itemType} data={data} />}
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

const mapDispatchToProps = {
  setServiceStatus
};

export default connect(
  null,
  mapDispatchToProps
)(Layanan);
