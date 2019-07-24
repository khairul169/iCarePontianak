import React from "react";
import { Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const Title = ({
  style,
  children,
  fontSize,
  marginTop,
  marginBottom,
  color
}) => {
  const textStyle = [
    styles.title,
    {
      fontSize,
      marginTop,
      marginBottom,
      color
    },
    style
  ];
  return <Text style={textStyle}>{children}</Text>;
};

Title.propTypes = {
  style: PropTypes.any,
  fontSize: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  color: PropTypes.string
};

Title.defaultProps = {
  fontSize: 18,
  marginTop: 24,
  marginBottom: 16,
  color: "#37474F"
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: "#525252",
    marginTop: 24,
    marginBottom: 16,
    marginLeft: 16
  }
});

export default Title;
