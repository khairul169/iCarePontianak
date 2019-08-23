import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  ImageBackground,
  StyleSheet,
} from 'react-native';

const LayananGadar = ({background, onPress}) => {
  return (
    <TouchableHighlight underlayColor={null} onPress={onPress}>
      <View style={styles.card}>
        <ImageBackground style={styles.gadar} source={background} />

        <View style={styles.content}>
          <Text style={styles.gadarTitle}>Gawat Darurat</Text>
          <Text style={styles.gadarDesc}>Layanan Kegawatdaruratan</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 3,
    elevation: 3,
    overflow: 'hidden',
    margin: 16,
    marginTop: 0,
  },
  gadar: {
    resizeMode: 'cover',
    height: 180,
  },
  content: {
    padding: 16,
  },
  gadarTitle: {
    color: '#686868',
    fontSize: 18,
  },
  gadarDesc: {
    color: '#787878',
    fontSize: 12,
    marginTop: 4,
  },
  gadarImage: {
    width: 96,
    height: 96,
  },
});

export default LayananGadar;
