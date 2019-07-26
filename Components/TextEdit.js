import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const TextEdit = ({ style, placeholder, onChangeText, value }) => {
  const containerStyle = [styles.container, style];

  return (
    <View style={containerStyle}>
      <TextInput
        placeholder={placeholder}
        style={styles.inputText}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

TextEdit.propTypes = {
  style: PropTypes.any,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  value: PropTypes.any
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  inputText: {
    flex: 1,
    margin: 0,
    padding: 0,
    paddingVertical: 4,
    fontSize: 14,
    color: "#333"
  }
});

export default TextEdit;
