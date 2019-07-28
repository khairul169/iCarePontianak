import React from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";
import PropTypes from "prop-types";
import Icon from "./Icon";

const Button = ({ title, color, border, style, onPress, small, icon }) => {
  const containerStyle = [
    styles.container,
    small && {
      height: 40
    },
    border && {
      borderColor: "#ccc",
      borderWidth: 1
    },
    style
  ];

  const titleStyle = [
    styles.buttonTitle,
    small && { fontSize: 12 },
    color && { color }
  ];

  const iconStyle = {
    color,
    fontSize: small ? 20 : 24,
    marginRight: 16
  };

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={containerStyle}>
        {icon && <Icon name={icon} style={iconStyle} />}
        <Text style={titleStyle}>{title.toUpperCase()}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  border: PropTypes.bool,
  style: PropTypes.any,
  onPress: PropTypes.func,
  small: PropTypes.bool,
  icon: PropTypes.string
};

Button.defaultProps = {
  border: true
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    flexDirection: "row"
  },
  buttonTitle: {
    color: "#626262",
    fontSize: 14,
    fontWeight: "bold"
  }
});

export default Button;
