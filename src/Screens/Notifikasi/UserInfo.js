import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "../../Components";

const UserInfoItem = ({ children, title, value }) => {
  const containerStyle = { flexDirection: "row", marginTop: 4 };
  const titleStyle = { flex: 1, fontSize: 12, color: "#444" };
  const valueStyle = { flex: 3, flexDirection: "row" };
  const valueTextStyle = { fontSize: 12, color: "#585858" };

  return (
    <View style={containerStyle}>
      <Text style={titleStyle}>{title}</Text>
      <View style={valueStyle}>
        {value ? <Text style={valueTextStyle}>{value}</Text> : children}
      </View>
    </View>
  );
};

const UserInfo = ({ title, subtitle, online, registered, reputation }) => {
  const containerStyle = [styles.content, { flexDirection: "row" }];
  const infoContainer = { flex: 1, marginLeft: 16 };
  const nameContainer = {
    flexDirection: "row",
    alignItems: "center"
  };
  const titleStyle = { fontSize: 16, color: "#333" };
  const subtitleSpacing = { flex: 1, alignItems: "flex-end" };
  const subtitleStyle = {
    fontSize: 12,
    color: "#525252",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
    paddingVertical: 4
  };
  const onlineIndicator = [
    styles.onlineIndicator,
    { backgroundColor: online ? "#7CB342" : "#ddd" }
  ];
  const reputationColor = "#66BB6A";
  const reputationTextStyle = { fontSize: 12, color: "#585858", marginLeft: 8 };

  return (
    <View style={containerStyle}>
      <View style={styles.profilePict} />

      <View style={infoContainer}>
        <View style={nameContainer}>
          <Text style={titleStyle}>{title}</Text>
          <View style={onlineIndicator} />
          {subtitle && (
            <View style={subtitleSpacing}>
              <Text style={subtitleStyle}>{subtitle}</Text>
            </View>
          )}
        </View>

        {registered && <UserInfoItem title="Terdaftar" value={registered} />}
        {reputation && (
          <UserInfoItem title="Reputasi">
            <Icon name="star" size={14} color={reputationColor} />
            <Icon name="star" size={14} color={reputationColor} />
            <Icon name="star" size={14} color={reputationColor} />
            <Icon name="star" size={14} color={reputationColor} />
            <Icon name="star" size={14} color={reputationColor} />

            <Text style={reputationTextStyle}>9.96 (124)</Text>
          </UserInfoItem>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16
  },
  profilePict: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#ddd"
  },
  onlineIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#7CB342",
    marginLeft: 8
  }
});

export default UserInfo;
