import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const Card = ({
  children,
  flex,
  radius,
  elevation,
  border,
  borderColor,
  style,
  padding,
  margin
}) => {
  const containerStyle = [
    styles.container,
    {
      flex,
      borderRadius: radius,
      elevation,
      padding,
      margin
    },
    border && {
      elevation: 0,
      borderColor: borderColor || "#eee",
      borderWidth: 1
    },
    style
  ];

  return <View style={containerStyle}>{children}</View>;
};

Card.propTypes = {
  style: PropTypes.object,
  flex: PropTypes.number,
  radius: PropTypes.number,
  elevation: PropTypes.number,
  border: PropTypes.bool,
  padding: PropTypes.number,
  margin: PropTypes.number
};

Card.defaultProps = {
  flex: 0,
  radius: 3,
  elevation: 0,
  border: false
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  bordered: {
    borderColor: "#eee",
    borderWidth: 1
  }
});

export default Card;
