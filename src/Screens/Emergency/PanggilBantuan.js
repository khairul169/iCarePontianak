import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ToastAndroid,
  Text,
  TextInput,
  Animated,
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
      circleState: new Animated.Value(0),
      loading: false,
      lokasi: null,
      jenis: this.jenisBantuan[0],
      keterangan: '',
    };
  }

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.state.circleState, {
        toValue: 1,
        duration: 5000,
      }),
    ).start();
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

        <TouchableOpacity style={styles.submitButton} onPress={this.onSubmit}>
          <Text style={styles.submitButtonTitle}>Panggil Bantuan</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const circleWidth = this.state.circleState.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 192],
    });
    const circleRadius = this.state.circleState.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 96],
    });
    const circleOpacity = this.state.circleState.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });
    const circleStyle = [
      styles.circle,
      {
        width: circleWidth,
        height: circleWidth,
        borderRadius: circleRadius,
        opacity: circleOpacity,
      },
    ];

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
            <Animated.View style={circleStyle} />
            <Image source={pinImage} style={styles.pin} />
          </View>

          <BottomSheet
            callbackNode={this.state.fall}
            renderHeader={this.renderHeader.bind(this)}
            renderContent={this.renderPanel.bind(this)}
            snapPoints={[282, 24]}
            initialSnap={0}
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
  },
  pinContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  pin: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
    position: 'absolute',
    transform: [{translateY: -24}],
  },
  circle: {
    backgroundColor: 'rgba(211, 47, 47, 0.2)',
    borderColor: 'rgba(211, 47, 47, 0.8)',
    borderWidth: 1,
    width: 128,
    height: 128,
    borderRadius: 64,
    opacity: 0.0,
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
    height: 258,
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
    height: 80,
    margin: 16,
    marginTop: 8,
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
    marginHorizontal: 16,
    borderRadius: 2,
  },
  submitButtonTitle: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PanggilBantuan;
