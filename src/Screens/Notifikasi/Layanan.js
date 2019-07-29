import React from "react";
import { connect } from "react-redux";
import { setServiceStatus } from "../../Actions/Layanan.action";
import { View, StyleSheet, Linking, ToastAndroid } from "react-native";

import Collapsible from "react-native-collapsible";
import { Button, StaticMap } from "../../Components";
import ItemHeader from "./ItemHeader";
import UserInfo from "./UserInfo";
import ItemDetail from "./ItemDetail";
import { getUserType } from "../../Utils";
import { Service } from "../../Consts";

const Layanan = props => {
  const { item, collapsed, onPress, navigation } = props;
  const { id, user, data } = item;
  const itemType = parseInt(item.type, 10);
  const isEmergency = itemType === Service.EMERGENCY;
  const isSelf = item.self;

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

  const getHeaderTitle = () => {
    return isEmergency
      ? "Gawat Darurat"
      : user
      ? "Layanan"
      : "Mencari Petugas...";
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

    if (isEmergency) {
      return (
        <View style={styles.actionContainer}>
          <Button
            title="Hubungi"
            style={styles.actionButton}
            small
            icon="phone"
            onPress={contactUser}
          />
          {isSelf && (
            <Button
              title={"Selesai"}
              style={[styles.actionButton, styles.btnMarginLeft]}
              small
              icon={"check"}
              onPress={layananBatal}
            />
          )}
        </View>
      );
    }

    return (
      <View>
        <View style={styles.actionContainer}>
          <Button
            title="Hubungi"
            style={[styles.actionButton, styles.btnMarginRight]}
            small
            icon="phone"
            onPress={contactUser}
          />
          <Button
            title={"Batalkan"}
            style={styles.actionButton}
            small
            icon={"cancel"}
            onPress={layananBatal}
          />
        </View>

        {isSelf && (
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
      <ItemHeader
        title={getHeaderTitle()}
        subtitle={!isEmergency && user ? `#${id}` : null}
        collapsed={collapsed}
        onPress={onPress}
        border
      />
      {user && (
        <UserInfo
          title={user.name}
          registered={user.registered}
          subtitle={getUserType(user.type)}
          reputation={user.reputation}
          online
        />
      )}

      <StaticMap
        coordinate={data.lokasi}
        onPress={() =>
          navigation.navigate("LihatLokasi", { location: data.lokasi })
        }
      />

      <View style={styles.content}>
        <Collapsible collapsed={!collapsed}>
          <ItemDetail type={itemType} data={data} />
        </Collapsible>

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
  btnMarginLeft: {
    marginLeft: 16
  },
  btnMarginRight: {
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
