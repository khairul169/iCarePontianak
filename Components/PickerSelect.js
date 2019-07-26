import React from "react";
import { View, StyleSheet, Picker } from "react-native";
import PropTypes from "prop-types";

const PickerSelect = ({ items, value, onValueChange }) => {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={value}
        onValueChange={onValueChange}
        style={styles.picker}
      >
        {items &&
          items.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
      </Picker>
    </View>
  );
};

Picker.propTypes = {
  items: PropTypes.array,
  value: PropTypes.any,
  onValueChange: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 3,
    paddingLeft: 8
  },
  picker: {
    height: 40
  }
});

export default PickerSelect;
