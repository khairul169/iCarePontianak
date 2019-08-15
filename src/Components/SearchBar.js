import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import Icon from './Icon';
import PropTypes from 'prop-types';

const SearchBar = ({style, placeholder}) => {
  return (
    <View style={[styles.searchBox, style]}>
      <TextInput
        style={[styles.searchInput]}
        placeholder={placeholder}
        placeholderTextColor="#78909C"
      />
      <Icon
        type="Ionicons"
        name="md-search"
        size={18}
        style={styles.searchIcon}
      />
    </View>
  );
};

SearchBar.propTypes = {
  style: PropTypes.object,
  placeholder: PropTypes.string,
};

SearchBar.defaultProps = {
  placeholder: 'Mau cari tindakan atau bantuan apa?',
};

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchInput: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    flex: 1,
    color: '#333',
  },
  searchIcon: {
    marginHorizontal: 16,
  },
});

export default SearchBar;
