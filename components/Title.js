import React from "react";
import { Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const Title = ({
  style,
  children,
  fontSize,
  marginTop,
  marginBottom,
  marginX,
  color
}) => {
  const textStyle = [
    styles.title,
    {
      fontSize,
      marginTop,
      marginBottom,
      marginHorizontal: marginX,
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
  marginX: PropTypes.number,
  color: PropTypes.string
};

Title.defaultProps = {
  fontSize: 16,
  marginTop: 0,
  marginBottom: 16,
  marginX: 0,
  color: "#37474F"
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: "#525252"
  }
});

export default Title;
