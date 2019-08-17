import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Header, MiniMap} from '../Components';
import {ServiceAPI} from '../Public/API';

export default class LihatLayanan extends Component {
  constructor(props) {
    super(props);

    this.idLayanan = props.navigation.getParam('id');
    this.state = {
      loading: false,
      layanan: undefined,
    };
  }

  onLoaded = async () => {
    try {
      this.setState({loading: true});
      const {success, result} = await ServiceAPI.getById(this.idLayanan);
      success && this.setState({loading: false, layanan: result});
    } catch (error) {
      console.log(error);
      this.setState({loading: false});
    }
  };

  componentDidMount() {
    this.onLoaded();
  }

  render() {
    const {layanan} = this.state;

    return (
      <View style={styles.container}>
        <Header title="Lihat Layanan" backButton {...this.props} />

        <MiniMap coordinate={layanan && layanan.location} />
        <Text>{layanan && layanan.user.name}</Text>
        <Text>{layanan && layanan.user.type}</Text>
        <Text>{layanan && layanan.status}</Text>
        <Text>{layanan && layanan.keluhan}</Text>
        <Text>{layanan && layanan.tindakan.label}</Text>
        <Text>{layanan && layanan.tindakan.total}</Text>
        <Text>{layanan && layanan.diagnosa}</Text>
        <Text>{layanan && layanan.alamat}</Text>
        <Text>{layanan && layanan.waktu}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
