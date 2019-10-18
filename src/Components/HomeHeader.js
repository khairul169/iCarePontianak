import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from './Icon';
import SearchBar from './SearchBar';
import StatusBar, {statusBarHeight} from './StatusBar';

const HomeHeader = ({name}) => {
  const headerStyle = [
    styles.header,
    {
      marginTop: statusBarHeight,
    },
  ];

  return (
    <View style={styles.headerContainer}>
      <StatusBar />

      <View style={headerStyle}>
        <Text style={styles.headerTitle}>
          {name ? `Halo, ${name}!` : 'iCare Pontianak'}
        </Text>
        <Icon
          type="Ionicons"
          name="ios-notifications-outline"
          size={20}
          color="#525252"
        />
      </View>

      <SearchBar
        marginTop={12}
        style={styles.searchBar}
        placeholder="Apa keluhan anda sekarang?"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAppIcon: {
    width: 28,
    height: 28,
    tintColor: '#4f6780',
  },
  headerTitle: {
    color: '#37474F',
    fontSize: 16,
    flex: 1,
    marginTop: 16,
  },
  searchBar: {
    backgroundColor: '#fff',
    marginTop: 12,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
});

export default HomeHeader;
