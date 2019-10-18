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
    borderRadius: 2,
    overflow: 'hidden',
    margin: 16,
    marginTop: 0,
  },
  gadar: {
    resizeMode: 'cover',
    height: 180,
    position: 'relative',
  },
  content: {
    padding: 16,
    paddingVertical: 8,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  gadarTitle: {
    color: '#fff',
    fontSize: 14,
  },
  gadarDesc: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
});

export default LayananGadar;
