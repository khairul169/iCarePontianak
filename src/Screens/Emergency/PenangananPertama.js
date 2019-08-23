import React, {Component} from 'react';
import {StyleSheet, View, FlatList, Text, TouchableOpacity} from 'react-native';
import {Header} from 'components';

export default class PenangananPertama extends Component {
  constructor(props) {
    super(props);

    this.items = [
      {
        title: 'Alat Pemadam Api Ringan (APAR)',
        desc:
          'Petunjuk dalam menggunakan alat pemadam api ringan / APAR jika terjadi kebakaran.',
        img: require('assets/penanganan/apar.jpg'),
      },
      {
        title: 'Luka Gigitan Ular',
        desc: 'Penanganan pada luka gigitan ular.',
        img: require('assets/penanganan/luka_gigitan.jpg'),
      },
      {
        title: 'Fraktur atau Patah Tulang',
        desc: 'Penanganan pada saat patah tulang.',
        img: require('assets/penanganan/fraktur.jpg'),
      },
      {
        title: 'Keracunan',
        desc: 'Penanganan pada saat keracunan.',
        img: require('assets/penanganan/keracunan.jpg'),
      },
      {
        title: 'Kram Otot',
        desc: 'Penanganan pada saat otot mengalami kram.',
        img: require('assets/penanganan/kram.jpg'),
      },
      {
        title: 'Luka Bakar',
        desc: 'Penanganan pada luka bakar.',
        img: require('assets/penanganan/luka_bakar.jpg'),
      },
      {
        title: 'Pingsan',
        desc: 'Penanganan pada saat pingsan.',
        img: require('assets/penanganan/pingsan.jpg'),
      },
      {
        title: 'Resusitasi Jantung Paru',
        desc: 'Penanganan pada saat henti jantung / henti nafas.',
        img: require('assets/penanganan/rjp.jpg'),
      },
      {
        title: 'Choking atau Tersedak',
        desc: 'Penanganan pada saat tersedak / choking.',
        img: require('assets/penanganan/tersedak.jpg'),
      },
    ];
  }

  renderItem({item}) {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('LihatPenanganan', {item})
        }>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDesc}>{item.desc}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Penanganan Pertama" backButton />
        <FlatList
          style={styles.container}
          contentContainerStyle={styles.content}
          data={this.items}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => `item-${index}`}
        />
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
    padding: 16,
    paddingTop: 4,
    paddingBottom: 0,
  },
  item: {
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 2,
    padding: 16,
    marginBottom: 16,
  },
  itemTitle: {
    fontSize: 16,
    color: '#525252',
  },
  itemDesc: {
    fontSize: 14,
    color: '#686868',
    marginTop: 8,
  },
});
