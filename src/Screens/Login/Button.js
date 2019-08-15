import React from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import PropTypes from 'prop-types';

const Button = ({title, backgroundColor, border, dark, marginTop, onPress}) => {
  const containerStyle = [
    styles.button,
    border && {
      borderColor: '#CFD8DC',
      borderWidth: 1,
    },
    {backgroundColor, marginTop},
  ];

  const titleStyle = [styles.buttonTitle, {color: dark ? '#fff' : '#546E7A'}];

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={containerStyle}>
        <Text style={titleStyle}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  backgroundColor: PropTypes.string,
  border: PropTypes.bool,
  dark: PropTypes.bool,
  marginTop: PropTypes.number,
  onPress: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: '#fff',
  border: false,
  marginTop: 8,
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    height: 40,
    borderRadius: 20,
  },
  buttonTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default Button;
