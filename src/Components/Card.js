import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const Card = ({
  children,
  flex,
  radius,
  elevation,
  border,
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
    border && styles.bordered,
    style
  ];

  return <View style={containerStyle}>{children}</View>;
};

Card.propTypes = {
  style: PropTypes.any,
  flex: PropTypes.number,
  radius: PropTypes.number,
  elevation: PropTypes.number,
  border: PropTypes.bool,
  padding: PropTypes.number,
  margin: PropTypes.number
};

Card.defaultProps = {
  flex: 0,
  radius: 2,
  elevation: 0,
  border: false
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  bordered: {
    elevation: 0,
    borderColor: "#CFD8DC",
    borderWidth: 1
  }
});

export default Card;
