import React, {Component} from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import {Header} from 'components';

export default class LihatPenanganan extends Component {
  constructor(props) {
    super(props);

    this.item = this.props.navigation.getParam('item');
  }

  render() {
    const item = this.item;
    return (
      <View style={styles.container}>
        <Header title={item ? item.title : 'Penanganan Pertama'} backButton />
        <Image style={styles.image} source={item && item.img} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: Dimensions.get('window').width,
  },
});
