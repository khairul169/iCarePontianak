import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Icon from "./Icon";
import PropTypes from "prop-types";

const SearchBar = ({
  backgroundColor,
  marginHorizontal,
  marginTop,
  marginBottom,
  style,
  color,
  placeholder,
  placeholderColor
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

  const textInputStyle = [
    styles.searchInput,
    {
      color
    }
  ];

  return (
    <View style={containerStyle}>
      <TextInput
        style={textInputStyle}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
      />
      <Icon
        type="Ionicons"
        name="md-search"
        size={18}
        color={color}
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
  style: PropTypes.object,
  color: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderColor: PropTypes.string
};

SearchBar.defaultProps = {
  backgroundColor: "#ECEFF1",
  color: "#37474F",
  placeholder: "Mau cari tindakan atau bantuan apa?",
  placeholderColor: "#78909C"
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
    flex: 1,
    color: "#333"
  },
  searchIcon: {
    marginHorizontal: 10
  }
});

export default SearchBar;
