import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import Icon from "./Icon";
import PropTypes from "prop-types";

const TextEdit = ({
  style,
  inputStyle,
  icon,
  caption,
  placeholder,
  onChangeText,
  value,
  numeric,
  password,
  capitalize
}) => {
  return (
    <View style={style}>
      {caption && <Text style={styles.caption}>{caption}</Text>}

      <View style={styles.container}>
        {icon && <Icon style={styles.icon} name={icon} />}
        <TextInput
          placeholder={placeholder}
          style={[styles.inputText, inputStyle]}
          onChangeText={onChangeText}
          value={value}
          keyboardType={numeric ? "numeric" : "default"}
          secureTextEntry={password}
          autoCapitalize={capitalize ? "words" : "none"}
        />
      </View>
    </View>
  );
};

TextEdit.propTypes = {
  style: PropTypes.any,
  inputStyle: PropTypes.any,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  caption: PropTypes.string,
  onChangeText: PropTypes.func,
  value: PropTypes.any,
  numeric: PropTypes.bool,
  password: PropTypes.bool,
  capitalize: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  inputText: {
    flex: 1,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    margin: 0,
    padding: 0,
    paddingVertical: 4,
    fontSize: 14,
    color: "#333"
  },
  icon: {
    width: 35,
    fontSize: 20,
    marginTop: 2,
    color: "#424242"
  },
  caption: {
    fontSize: 12,
    color: "#686868",
    marginLeft: 35
  }
});

export default TextEdit;
