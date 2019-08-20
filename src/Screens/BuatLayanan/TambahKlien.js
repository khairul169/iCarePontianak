import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, ScrollView, ToastAndroid} from 'react-native';
import {Header, TextEdit, Button} from 'components';
import {ClientAPI} from 'public/API';
import {fetchKlien} from 'actions/BuatLayanan';

class TambahKlien extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nama: '',
      umur: '',
      diagnosa: '',
      riwayat: '',
      alergi: '',
    };
  }

  onTambahKlien = async () => {
    try {
      const {nama, umur, diagnosa, riwayat, alergi} = this.state;
      const {success, message} = await ClientAPI.create({
        nama,
        umur,
        gender: 1,
        diagnosa,
        riwayat,
        alergi,
      });

      if (success) {
        this.props.fetchKlien();
        this.props.navigation.goBack();
      } else {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title="Tambahkan Klien" backButton />
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}>
          <TextEdit
            style={styles.textInput}
            caption="Nama Klien (*)"
            icon="account-box-outline"
            value={this.state.nama}
            onChangeText={nama => this.setState({nama})}
          />
          <TextEdit
            style={styles.textInput}
            caption="Umur Klien  (*)"
            icon="face"
            numeric
            value={this.state.umur}
            onChangeText={umur => this.setState({umur})}
          />
          <TextEdit
            style={styles.textInput}
            caption="Diagnosa Medis"
            icon="briefcase-edit"
            value={this.state.diagnosa}
            onChangeText={diagnosa => this.setState({diagnosa})}
          />
          <TextEdit
            style={styles.textInput}
            caption="Riwayat Kesehatan"
            icon="clipboard-pulse-outline"
            value={this.state.riwayat}
            onChangeText={riwayat => this.setState({riwayat})}
          />
          <TextEdit
            style={styles.textInput}
            caption="Alergi"
            icon="comment-alert"
            value={this.state.alergi}
            onChangeText={alergi => this.setState({alergi})}
          />
        </ScrollView>
        <View style={styles.content}>
          <Button title="Tambah Klien" onPress={this.onTambahKlien} />
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
    padding: 16,
  },
  textInput: {
    marginBottom: 16,
  },
});

const mapDispatchToProps = {
  fetchKlien,
};

export default connect(
  null,
  mapDispatchToProps,
)(TambahKlien);
