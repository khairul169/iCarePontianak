import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";

const ItemPelayanan = ({ title, image, borderLeft }) => {
  return (
    <View
      style={[styles.pelayananItem, borderLeft && styles.pelayananitemBordered]}
    >
      <Image source={image} style={styles.pelayananImage} />
      <Text style={styles.pelayananTitle}>{title}</Text>
    </View>
  );
};

ItemPelayanan.propTypes = {
  title: PropTypes.string,
  image: PropTypes.any,
  borderLeft: PropTypes.bool
};

const styles = StyleSheet.create({
  pelayananItem: {
    flex: 1,
    alignItems: "center",
    minHeight: 52,
    minWidth: "30%"
  },
  pelayananitemBordered: {
    borderLeftColor: "#eee",
    borderLeftWidth: 1
  },
  pelayananImage: {
    flex: 1,
    height: "100%",
    resizeMode: "contain"
  },
  pelayananTitle: {
    color: "#525252",
    fontSize: 12,
    marginTop: 8
  }
});

export default ItemPelayanan;
