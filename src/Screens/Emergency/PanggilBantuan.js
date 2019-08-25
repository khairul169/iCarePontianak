import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ToastAndroid,
  Text,
  TextInput,
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Header, MapLayout, PickerSelect} from 'components';
import {EmergencyAPI} from 'public/API';
import {navigateToMainStack} from 'public/Utils';
import {pinImage} from 'assets';

class PanggilBantuan extends Component {
  constructor(props) {
    super(props);

    this.jenisBantuan = [
      'Kecelakaan Lalu Lintas',
      'Kebakaran',
      'Stroke',
      'Gagal Jantung / Henti Nafas',
      'Lain-lain',
    ];

    this.state = {
      loading: false,
      lokasi: null,
      jenis: this.jenisBantuan[0],
      keterangan: '',
    };
  }

  onRegionChanged = ({latitude, longitude}) => {
    this.setState({
      lokasi: {
        latitude,
        longitude,
      },
    });
  };

  onSubmit = async () => {
    const {loading, lokasi, jenis, keterangan} = this.state;
    if (loading) {
      return;
    }

    // create emergency service
    try {
      this.setState({loading: true});
      const data = {
        lokasi,
        jenis,
        keterangan,
      };
      const {success, message} = await EmergencyAPI.create(data);
      this.setState({loading: false});

      if (success) {
        navigateToMainStack('EmergencyMap');
      } else {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
    }
  };

  renderHeader() {
    return (
      <View style={styles.header}>
        <View style={styles.headerHandler} />
      </View>
    );
  }

  renderPanel() {
    return (
      <View style={styles.panel}>
        <View style={styles.container}>
          <Text style={styles.title}>Jenis Kejadian</Text>
          <PickerSelect
            items={this.jenisBantuan}
            style={styles.pilihanBantuan}
            height={48}
            value={this.state.jenis}
            onValueChange={jenis => this.setState({jenis})}
          />

          <Text style={styles.title}>Keterangan</Text>
          <TextInput
            style={styles.inputText}
            multiline={true}
            value={this.state.keterangan}
            onChangeText={keterangan => this.setState({keterangan})}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={this.onSubmit}>
          <Text style={styles.submitButtonTitle}>Panggil Bantuan</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header transparent backButton />

        <View style={styles.container}>
          <MapLayout
            style={styles.mapView}
            onRegionChanged={this.onRegionChanged}
            onUserLocation={this.onUserLocation}
          />

          <View style={styles.pinContainer}>
            <Image source={pinImage} style={styles.pin} />
          </View>

          <BottomSheet
            callbackNode={this.state.fall}
            renderHeader={this.renderHeader.bind(this)}
            renderContent={this.renderPanel.bind(this)}
            snapPoints={[324, 180]}
            initialSnap={1}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    flex: 1,
    marginBottom: 180,
  },
  pinContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 180,
    left: 0,
    right: 0,
  },
  pin: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
    transform: [{translateY: -24}],
  },
  header: {
    height: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerHandler: {
    width: 64,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
  },
  panel: {
    height: 300,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 14,
    color: '#686868',
    marginHorizontal: 16,
  },
  pilihanBantuan: {
    borderWidth: 0,
    marginBottom: 8,
  },
  inputText: {
    flex: 1,
    margin: 16,
    marginTop: 8,
    marginBottom: 0,
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 2,
    padding: 8,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#ef5350',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    margin: 16,
    borderRadius: 2,
  },
  submitButtonTitle: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PanggilBantuan;
