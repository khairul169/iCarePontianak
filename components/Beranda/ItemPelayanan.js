import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

const ItemPelayanan = ({ title, image, onPress, border }) => {
  return (
    <View style={[styles.container, border && styles.border]}>
      <TouchableOpacity style={styles.item} onPress={onPress}>
        <Image source={image} style={styles.pelayananImage} />
        <Text style={styles.pelayananTitle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

ItemPelayanan.propTypes = {
  title: PropTypes.string,
  image: PropTypes.any,
  onPress: PropTypes.func,
  border: PropTypes.bool
};

ItemPelayanan.defaultProps = {
  border: true
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexBasis: "30%"
  },
  border: {
    borderBottomColor: "#CFD8DC",
    borderRightColor: "#CFD8DC",
    borderBottomWidth: 1,
    borderRightWidth: 1
  },
  item: {
    flex: 1,
    alignItems: "center",
    padding: 16
  },
  pelayananImage: {
    flex: 1,
    resizeMode: "contain"
  },
  pelayananTitle: {
    color: "#525252",
    fontSize: 11,
    marginTop: 12,
    textAlign: "center"
  }
});

export default ItemPelayanan;
