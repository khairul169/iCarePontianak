import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Header, MiniMap, Icon} from 'components';
import {ServiceAPI} from 'public/API';
import {openPhoneNumber} from 'public/Utils';

export default class LihatLayanan extends Component {
  constructor(props) {
    super(props);

    this.idLayanan = props.navigation.getParam('id');
    this.state = {
      loading: false,
      layanan: null,
    };
  }

  onLoaded = async () => {
    try {
      this.setState({loading: true});
      const {success, result} = await ServiceAPI.getServiceById(this.idLayanan);
      success && this.setState({loading: false, layanan: result});
    } catch (error) {
      console.log(error);
      this.setState({loading: false});
    }
  };

  componentDidMount() {
    this.onLoaded();
  }

  onMapPress = () => {
    if (!this.state.layanan) return;

    const location = this.state.layanan.location;
    this.props.navigation.navigate('LihatLokasi', {location});
  };

  onHubungi = () => {
    if (!this.state.layanan) return;

    const number = this.state.layanan.user.phone;
    openPhoneNumber(number);
  };

  onBatalkan = async () => {
    this.state.layanan && (await ServiceAPI.cancel(this.state.layanan.id));
    this.onLoaded();
  };

  onSelesai = async () => {
    this.state.layanan && (await ServiceAPI.finish(this.state.layanan.id));
    this.onLoaded();
  };

  render() {
    const {loading, layanan} = this.state;

    if (loading || !layanan) return <View />;

    return (
      <View style={styles.container}>
        <Header
          onRef={ref => (this.header = ref)}
          title="Detail Layanan"
          backButton
          {...this.props}
          animated
        />

        <ScrollView
          style={styles.container}
          onScroll={e => this.header && this.header.onScroll(e)}
          scrollEventThrottle={16}>
          <MiniMap
            coordinate={layanan.location}
            style={styles.map}
            onPress={this.onMapPress}
            mapPadding={{top: 56}}
            directionTo={layanan.lokasiNakes}
          />

          <View style={styles.contentContainer}>
            <View style={[styles.content, styles.user]}>
              <Image
                style={styles.userImage}
                source={{uri: layanan.user.image}}
              />
              <View style={styles.userDetail}>
                <Text style={styles.userName}>{layanan.user.name}</Text>
                <Text style={styles.userDesc}>{layanan.user.type}</Text>
              </View>
            </View>

            <View style={styles.content}>
              <Text style={styles.contentTitle}>Detail Layanan</Text>

              <View style={styles.detailItem}>
                <Icon name="account-circle" style={styles.detailItemIcon} />
                <Text style={styles.detailItemValue}>{layanan.klien.nama}</Text>
              </View>

              <View style={styles.detailItem}>
                <Icon name="account-alert" style={styles.detailItemIcon} />
                <Text style={styles.detailItemValue}>{layanan.keluhan}</Text>
              </View>

              {layanan.diagnosa !== '' && (
                <View style={styles.detailItem}>
                  <Icon name="clipboard-pulse" style={styles.detailItemIcon} />
                  <Text style={styles.detailItemValue}>{layanan.diagnosa}</Text>
                </View>
              )}

              <View style={styles.detailItem}>
                <Icon name="calendar-clock" style={styles.detailItemIcon} />
                <Text style={styles.detailItemValue}>{layanan.waktu}</Text>
              </View>

              <View style={styles.detailItem}>
                <Icon name="home-map-marker" style={styles.detailItemIcon} />
                <Text style={styles.detailItemValue}>{layanan.alamat}</Text>
              </View>
            </View>

            <View style={styles.content}>
              <Text style={styles.contentTitle}>Tindakan</Text>
              {layanan.tindakan.items.map((item, index) => (
                <View style={styles.tindakan} key={index}>
                  <Icon name="briefcase-edit" style={styles.detailItemIcon} />
                  <Text style={styles.tindakanName}>{item.name}</Text>
                  <Text style={styles.tindakanCost}>{item.cost}</Text>
                </View>
              ))}
            </View>

            <View style={styles.content}>
              <Text style={styles.contentTitle}>Estimasi Biaya</Text>
              <Text style={styles.totalCost}>{layanan.tindakan.total}</Text>
              <Text style={styles.costDisclaimer}>
                *Tidak termasuk biaya obat-obatan dan tindakan lainnya
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.col}>
          <TouchableOpacity style={styles.action} onPress={this.onHubungi}>
            <Text style={styles.actionTitle}>HUBUNGI</Text>
          </TouchableOpacity>
          {layanan.status.startsWith('Sedang') && (
            <TouchableOpacity
              style={[styles.action, styles.coloredAction]}
              onPress={layanan.isClient ? this.onBatalkan : this.onSelesai}>
              <Text style={[styles.actionTitle, styles.coloredActionTitle]}>
                {layanan.isClient ? 'BATALKAN' : 'SELESAI'}
              </Text>
            </TouchableOpacity>
          )}
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
  contentContainer: {
    backgroundColor: '#f8f8f8',
    elevation: 12,
  },
  content: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  col: {
    flexDirection: 'row',
  },
  user: {
    flexDirection: 'row',
    borderTopWidth: 0,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  userDetail: {
    flex: 1,
    marginLeft: 24,
  },
  userName: {
    fontSize: 16,
    color: '#546E7A',
  },
  userDesc: {
    fontSize: 12,
    color: '#686868',
    marginTop: 4,
  },
  contentTitle: {
    fontSize: 14,
    color: '#333',
  },
  // Detail layanan
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    marginTop: 12,
    borderColor: '#eee',
    borderTopWidth: 1,
  },
  detailItemIcon: {
    fontSize: 16,
    color: '#81C784',
    width: 32,
  },
  detailItemValue: {
    fontSize: 14,
    color: '#455A64',
  },
  // Tindakan
  tindakan: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 2,
    padding: 16,
    marginTop: 12,
  },
  tindakanName: {
    flex: 1,
    fontSize: 14,
    color: '#455A64',
  },
  tindakanCost: {
    fontSize: 14,
    color: '#66BB6A',
    marginLeft: 8,
  },
  totalCost: {
    fontSize: 28,
    color: '#43A047',
    marginTop: 8,
  },
  costDisclaimer: {
    fontSize: 12,
    color: '#727272',
    marginTop: 4,
  },
  action: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 15,
    alignItems: 'center',
    borderColor: '#C5E1A5',
    borderTopWidth: 1,
  },
  actionTitle: {
    color: '#689F38',
    fontSize: 14,
  },
  coloredAction: {
    backgroundColor: '#7CB342',
    borderTopWidth: 0,
  },
  coloredActionTitle: {
    color: '#fff',
  },
});
