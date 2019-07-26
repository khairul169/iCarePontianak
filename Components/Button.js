import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

const Button = ({
  title,
  backgroundColor,
  color,
  height,
  border,
  style,
  onPress
}) => {
  const containerStyle = [
    styles.container,
    backgroundColor && { backgroundColor },
    !border && {
      borderWidth: 0
    },
    style
  ];

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        style={[styles.button, height && { height }]}
        onPress={onPress}
      >
        <Text style={[styles.buttonTitle, color && { color }]}>
          {title && title.toUpperCase()}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.number,
  border: PropTypes.bool,
  style: PropTypes.any,
  onPress: PropTypes.func
};

Button.defaultProps = {
  border: true
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 2
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 40
  },
  buttonTitle: {
    color: "#626262",
    fontSize: 14,
    fontWeight: "bold"
  }
});

export default Button;
