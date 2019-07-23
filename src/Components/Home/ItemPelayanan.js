import React from "react";
import { Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

const ItemPelayanan = ({ title, image, height, onPress }) => {
  const containerStyle = [styles.container, { height }];
  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <Image source={image} style={styles.pelayananImage} />
      <Text style={styles.pelayananTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

ItemPelayanan.propTypes = {
  title: PropTypes.string,
  image: PropTypes.any,
  height: PropTypes.number,
  onPress: PropTypes.func
};

ItemPelayanan.defaultProps = {
  height: 80
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    minWidth: "25%",
    padding: 12
  },
  pelayananImage: {
    flex: 1,
    height: "100%",
    resizeMode: "contain"
  },
  pelayananTitle: {
    color: "#525252",
    fontSize: 11,
    marginTop: 8,
    textAlign: "center"
  }
});

export default ItemPelayanan;
