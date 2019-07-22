import React from "react";
import { View, Text, StyleSheet, TextInput, StatusBar } from "react-native";
import Icon from "../Icon";

const HomeHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <Icon name="home-plus" size={24} color="#4f6780" />
        <Text style={styles.headerTitle}>iCare Pontianak</Text>
        <Icon
          type="Ionicons"
          name="ios-notifications-outline"
          size={20}
          color="#525252"
        />
      </View>

      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="Mau cari tindakan atau bantuan apa?"
        />
        <Icon
          type="Ionicons"
          name="md-search"
          size={18}
          color="#4f6780"
          style={styles.searchIcon}
        />
      </View>
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
  },
  searchBox: {
    marginTop: 12,
    backgroundColor: "#eee",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center"
  },
  searchInput: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    flex: 1
  },
  searchIcon: {
    marginHorizontal: 10
  }
});

export default HomeHeader;
