import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon, SearchBar, StatusBar } from "../index";
import { statusBarHeight } from "../StatusBar";

const HomeHeader = () => {
  const headerStyle = [
    styles.header,
    {
      marginTop: statusBarHeight
    }
  ];

  return (
    <View style={styles.headerContainer}>
      <StatusBar />

      <View style={headerStyle}>
        <Icon name="home-plus" size={24} color="#4f6780" />
        <Text style={styles.headerTitle}>iCare Pontianak</Text>
        <Icon
          type="Ionicons"
          name="ios-notifications-outline"
          size={20}
          color="#525252"
        />
      </View>

      <SearchBar marginTop={12} backgroundColor="#ECEFF1" />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    backgroundColor: "#fff"
  },
  header: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerAppIcon: {
    width: 28,
    height: 28,
    tintColor: "#4f6780"
  },
  headerTitle: {
    color: "#333",
    fontSize: 16,
    fontWeight: "100",
    marginLeft: 16,
    flex: 1
  }
});

export default HomeHeader;
