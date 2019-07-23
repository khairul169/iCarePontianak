import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const Card = props => {
  const {
    flex,
    radius,
    elevation,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight
  } = props;

  const containerStyle = [
    styles.container,
    {
      flex,
      borderRadius: radius,
      elevation,
      margin,
      marginHorizontal: props.marginX,
      marginVertical: props.marginY,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight
    },
    props.style
  ];

  return <View style={containerStyle}>{props.children}</View>;
};

Card.propTypes = {
  style: PropTypes.object,
  flex: PropTypes.number,
  radius: PropTypes.number,
  elevation: PropTypes.number,
  margin: PropTypes.number,
  marginX: PropTypes.number,
  marginY: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number
};

Card.defaultProps = {
  flex: 0,
  radius: 5,
  elevation: 5,
  margin: 0
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  }
});

export default Card;
