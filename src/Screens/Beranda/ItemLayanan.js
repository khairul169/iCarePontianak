import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

const ItemLayanan = ({ title, image, onPress, first }) => {
  return (
    <View style={[styles.container, first && styles.first]}>
      <TouchableOpacity style={styles.item} onPress={onPress}>
        <Image source={image} style={styles.pelayananImage} />
        <Text style={styles.pelayananTitle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

ItemLayanan.propTypes = {
  title: PropTypes.string,
  image: PropTypes.any,
  onPress: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginRight: 8,
    marginBottom: 8,
    elevation: 2,
    borderRadius: 3
  },
  first: {
    marginLeft: 8
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

export default ItemLayanan;
