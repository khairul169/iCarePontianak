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
      <ImageBackground style={styles.gadar} source={background}>
        <View style={styles.content}>
          <Text style={styles.gadarTitle}>Gawat Darurat</Text>
          <Text style={styles.gadarDesc}>Layanan Kegawatdaruratan</Text>
        </View>
      </ImageBackground>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  gadar: {
    borderRadius: 5,
    overflow: 'hidden',
    padding: 8,
    paddingRight: 32,
    marginHorizontal: 16,
    marginBottom: 16,
    resizeMode: 'cover',
    height: 180,
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  content: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(40, 40, 40, 0.3)',
    borderRadius: 3,
    padding: 8,
  },
  gadarTitle: {
    color: '#fff',
    fontSize: 18,
  },
  gadarDesc: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
  },
  gadarImage: {
    width: 96,
    height: 96,
  },
});

export default LayananGadar;
