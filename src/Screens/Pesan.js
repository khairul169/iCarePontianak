import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Header} from 'components';

export default class Pesan extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header title="Pesan" />
        <Text style={styles.emptyText}>Tidak ada pesan untuk ditampilkan.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyText: {
    fontSize: 14,
    color: '#686868',
    marginTop: 16,
    alignSelf: 'center',
  },
});
