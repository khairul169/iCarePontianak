import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Icon from "./Icon";
import PropTypes from "prop-types";

const SearchBar = ({
  backgroundColor,
  marginHorizontal,
  marginTop,
  marginBottom,
  style
}) => {
  const containerStyle = [
    styles.searchBox,
    {
      backgroundColor,
      marginHorizontal,
      marginTop,
      marginBottom
    },
    style
  ];

  return (
    <View style={containerStyle}>
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
  );
};

SearchBar.propTypes = {
  backgroundColor: PropTypes.string,
  marginHorizontal: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  style: PropTypes.object
};

SearchBar.defaultProps = {
  backgroundColor: "#eee"
};

const styles = StyleSheet.create({
  searchBox: {
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

export default SearchBar;
