import React from 'react';
import {View, StyleSheet, Picker} from 'react-native';
import PropTypes from 'prop-types';

const PickerSelect = ({style, height, items, value, onValueChange}) => {
  const pickerStyle = [styles.picker, height && {height}];
  return (
    <View style={[styles.container, style]}>
      <Picker
        selectedValue={value}
        onValueChange={onValueChange}
        style={pickerStyle}>
        {items &&
          items.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
      </Picker>
    </View>
  );
};

Picker.propTypes = {
  style: PropTypes.any,
  height: PropTypes.number,
  items: PropTypes.array,
  value: PropTypes.any,
  onValueChange: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 2,
    paddingLeft: 8,
    backgroundColor: '#fff',
  },
  picker: {
    height: 40,
  },
});

export default PickerSelect;
