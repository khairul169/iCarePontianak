import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Icon} from '../../Components';
import PropTypes from 'prop-types';

const InputText = ({
  icon,
  placeholder,
  value,
  onChangeText,
  capitalize,
  password,
}) => {
  return (
    <View style={styles.input}>
      {icon && (
        <Icon style={styles.inputIcon} name={icon} size={20} color="#78909C" />
      )}
      <TextInput
        style={styles.inputText}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize={capitalize ? 'words' : 'none'}
        autoCompleteType="off"
        secureTextEntry={password}
      />
    </View>
  );
};

InputText.propTypes = {
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  capitalize: PropTypes.bool,
  password: PropTypes.bool,
};

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'stretch',
  },
  inputIcon: {
    width: 24,
    alignSelf: 'center',
    marginTop: 2,
  },
  inputText: {
    flex: 1,
    borderColor: '#CFD8DC',
    borderBottomWidth: 1,
    padding: 0,
    paddingVertical: 6,
    marginLeft: 8,
  },
});

export default InputText;
