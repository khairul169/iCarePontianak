import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Header, MiniMap, Icon} from 'components';
import {searchNakes, resetNakesExclusion} from 'actions/BuatLayanan';
import {navigateToMainStack} from 'public/Utils';
import {ServiceAPI} from 'public/API';
import {fetchItems as fetchLayanan} from 'actions/Layanan';

const ActionButton = ({size, icon, iconSize, onPress, style, color}) => {
  const containerStyle = [
    styles.actionButton,
    {width: size, height: size, borderRadius: size / 2},
    style,
  ];
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <Icon name={icon} size={iconSize} color={color} />
    </TouchableOpacity>
  );
};

class CariNakes extends Component {
  componentDidMount() {
    this.props.resetNakesExclusion();
    this.props.searchNakes();
  }

  onResetNakes = () => {
    if (!this.props.nakes) {
      this.props.resetNakesExclusion();
    }
    this.props.searchNakes();
  };

  onSelect = async () => {
    try {
      // get data from state
      const {
        kategori,
        tindakan,
        klien,
        keluhan,
        alamat,
        lokasi,
        waktu,
        nakes,
      } = this.props.buatLayanan;

      // service data
      const data = {
        type: kategori.id,
        tindakan,
        klien,
        keluhan,
        alamat,
        lokasi,
        waktu,
        nakes: nakes.id,
      };

      // submit service
      const {success} = await ServiceAPI.createService(data);

      if (success) {
        this.props.fetchLayanan();
        navigateToMainStack('Layanan');
      }
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  render() {
    const {lokasi, nakes} = this.props.buatLayanan;

    const genderIcon =
      nakes && nakes.gender.startsWith('P') ? 'gender-female' : 'gender-male';

    const mapStyle = [
      styles.map,
      {height: Dimensions.get('window').height * 0.5},
    ];

    const nakesCoordinate = nakes && {
      latitude: nakes.lat,
      longitude: nakes.lng,
    };

    return (
      <View style={styles.container}>
        <Header backButton {...this.props} transparent />

        <View style={styles.container}>
          <MiniMap
            style={mapStyle}
            coordinate={lokasi}
            directionTo={nakesCoordinate}
            mapPadding={{top: 48, bottom: 48}}
          />

          <View style={styles.content}>
            {nakes && (
              <View style={styles.userImgContainer}>
                <Image style={styles.userImg} source={{uri: nakes.image}} />
              </View>
            )}

            <View style={styles.container}>
              {!nakes && (
                <Text style={styles.notFound}>
                  Tenaga kesehatan tidak ditemukan.
                </Text>
              )}

              {nakes && (
                <View>
                  <Text style={styles.userName}>{nakes.name}</Text>
                  <View style={styles.userDesc}>
                    <Icon style={styles.userGenderIcon} name={genderIcon} />
                    <Text style={styles.userType}>
                      {nakes.type} • {nakes.distance}
                    </Text>
                  </View>
                </View>
              )}

              <View style={styles.action}>
                <ActionButton
                  icon="refresh"
                  iconSize={32}
                  size={64}
                  color="#686868"
                  onPress={this.onResetNakes}
                />
                {nakes && (
                  <ActionButton
                    icon="account-check"
                    iconSize={32}
                    size={64}
                    color="#689F38"
                    style={styles.btnSelect}
                    onPress={this.onSelect}
                  />
                )}
              </View>
            </View>
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
  map: {
    height: 300,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    elevation: 8,
  },
  notFound: {
    alignSelf: 'center',
    marginTop: 64,
    fontSize: 14,
    color: '#686868',
  },
  userImgContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{translateY: -48}],
    marginBottom: -48,
  },
  userImg: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: 'hidden',
  },
  userName: {
    alignSelf: 'center',
    marginTop: 24,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#484848',
  },
  userDesc: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  userGenderIcon: {
    fontSize: 16,
    color: '#686868',
    marginRight: 5,
  },
  userType: {
    fontSize: 14,
    color: '#686868',
  },
  action: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  actionButton: {
    backgroundColor: '#fff',
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSelect: {
    marginLeft: 16,
  },
});

const mapStateToProps = ({buatLayanan}) => ({
  buatLayanan,
});

const mapDispatchToProps = {
  searchNakes,
  resetNakesExclusion,
  fetchLayanan,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CariNakes);