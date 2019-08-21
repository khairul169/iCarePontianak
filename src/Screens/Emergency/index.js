import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Header, Button} from 'components';
import {createScreenStack} from 'public/Utils';

// Action image
import gadarIllust from 'assets/gadar-illust.png';

// routes
import CariAmbulan from './CariAmbulan';
import PanggilBantuan from './PanggilBantuan';

class Emergency extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header backButton />

        <View style={styles.content}>
          <Image source={gadarIllust} style={styles.illust} />
          <Text style={styles.title}>Gawat Darurat</Text>
          <Text style={styles.subtitle}>
            Kondisi yang mengancam nyawa. Segera panggil bantuan dan lakukan
            penanganan pertama sampai bantuan datang.
          </Text>
        </View>

        <View style={styles.actions}>
          <Button
            style={styles.btnBantuan}
            color="#fff"
            title="Panggil Bantuan"
            onPress={() => this.props.navigation.navigate('PanggilBantuan')}
          />

          <View style={styles.col}>
            <Button style={styles.btnAid} small title="Penanganan Pertama" />
            <Button
              style={styles.btnAmbulan}
              small
              title="Cari Ambulan"
              onPress={() => this.props.navigation.navigate('CariAmbulan')}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
    paddingHorizontal: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  illust: {
    width: '100%',
    height: '40%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    marginTop: 18,
    marginBottom: 8,
    color: '#424242',
  },
  subtitle: {
    fontSize: 12,
    color: '#676767',
    textAlign: 'center',
    lineHeight: 20,
  },
  actions: {
    backgroundColor: '#fff',
    padding: 16,
  },
  col: {
    flexDirection: 'row',
  },
  btnBantuan: {
    backgroundColor: '#ef5350',
    marginBottom: 16,
    borderWidth: 0,
  },
  btnAid: {
    flex: 1,
    marginRight: 16,
  },
  btnAmbulan: {
    flex: 1,
  },
});

export default createScreenStack({
  Emergency,
  CariAmbulan,
  PanggilBantuan,
});
