import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import {Header, MiniMap, Icon, Dialog, Button} from 'components';
import {ServiceAPI, UserAPI} from 'public/API';
import {iconUser} from 'assets';

const UserRating = ({average, count}) => {
  const countIconStyle = {marginRight: 4};
  const countTextStyle = [styles.userRatingText, {marginRight: 12}];
  const avgTextStyle = [styles.userRatingText, {marginLeft: 8}];

  return (
    <View style={styles.userRating}>
      <Icon
        name="account-circle"
        size={16}
        color="#686868"
        style={countIconStyle}
      />
      <Text style={countTextStyle}>{count}</Text>

      {[...Array(5).keys()].map((item, index) => {
        const filled = average && index < average.toFixed();
        return (
          <Icon
            name={filled ? 'star' : 'star-outline'}
            size={16}
            color="#4CAF50"
          />
        );
      })}
      <Text style={avgTextStyle}>({average.toFixed(1)})</Text>
    </View>
  );
};

const GiveRatingModal = ({
  visible,
  onHide,
  value,
  onValueChange,
  message,
  onMessageChange,
  onSubmit,
}) => {
  const containerStyle = {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  };
  const contentStyle = {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 3,
    elevation: 3,
  };
  const titleStyle = {fontSize: 16, color: '#424242'};
  const starRatingStyle = {
    flexDirection: 'row',
    marginTop: 18,
    marginBottom: 12,
    justifyContent: 'center',
  };
  const inputTextStyle = {marginBottom: 8};

  const renderStars = () =>
    [...Array(5).keys()].map((item, index) => {
      const active = value && index < value;
      return (
        <TouchableOpacity
          onPress={() => onValueChange && onValueChange(index + 1)}>
          <Icon
            name={active ? 'star' : 'star-outline'}
            size={38}
            color={active ? '#4CAF50' : '#686868'}
          />
        </TouchableOpacity>
      );
    });

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onHide}>
      <View style={containerStyle}>
        <View style={contentStyle}>
          <Text style={titleStyle}>Berikan rating</Text>
          <View style={starRatingStyle}>{renderStars()}</View>
          <TextInput
            placeholder="Masukkan pesan..."
            style={inputTextStyle}
            value={message}
            onChangeText={text => onMessageChange && onMessageChange(text)}
          />
          <Button title="Beri Rating" onPress={onSubmit} />
        </View>
      </View>
    </Modal>
  );
};

export default class LihatLayanan extends Component {
  constructor(props) {
    super(props);

    this.idLayanan = props.navigation.getParam('id');
    this.state = {
      loading: false,
      layanan: null,
      giveRatingModal: false,
      rating: 0,
      ratingMessage: '',
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

    const {id} = this.state.layanan.user;
    this.props.navigation.navigate('LihatPesan', {id});
  };

  onBatalkan = () => {
    this.dialog.show({
      title: 'Layanan batal',
      description: 'Apakah anda yakin ingin membatalkan layanan ini?',
      buttonYes: 'Batalkan',
      onPressYes: () => this.setBatal(),
    });
  };

  onSelesai = () => {
    this.dialog.show({
      title: 'Layanan selesai',
      description: 'Apakah anda yakin telah menyelesaikan layanan ini?',
      onPressYes: () => this.setSelesai(),
    });
  };

  setBatal = async () => {
    this.state.layanan && (await ServiceAPI.cancel(this.state.layanan.id));
    this.onLoaded();
  };

  setSelesai = async () => {
    this.state.layanan && (await ServiceAPI.finish(this.state.layanan.id));
    this.onLoaded();
  };

  onSubmitRating = async () => {
    try {
      const {giveRating, user, id} = this.state.layanan;
      const {rating, ratingMessage} = this.state;

      if (!giveRating || !id) {
        return;
      }

      const {success} = await UserAPI.addRating(
        user.id,
        rating,
        ratingMessage,
        id,
      );
      this.setState({giveRatingModal: false});
      success && this.onLoaded();
    } catch (error) {
      console.log(error);
    }
  };

  renderNotifikasi() {
    if (!this.state.layanan) {
      return;
    }

    let iconColor = '#FFA726';
    let title = '';
    let description = '';

    const {status, isClient, giveRating} = this.state.layanan;

    if (status.toLowerCase().startsWith('sedang')) {
      title = 'Menunggu petugas';
      if (isClient) {
        description = 'Petugas saat ini sedang menyiapkan layanan yang anda';
        description += ' buat. Silahkan tunggu petugas menghubungi anda.';
      } else {
        description = 'Klien sedang menunggu anda untuk menyelesaikan';
        description += ' tugas anda.';
      }
    }

    if (status.toLowerCase().startsWith('batal')) {
      iconColor = '#686868';
      title = 'Layanan batal';
      description = 'Layanan ini telah dibatalkan.';
    }

    if (status.toLowerCase().startsWith('selesai')) {
      iconColor = '#7CB342';
      title = 'Layanan selesai';
      description = 'Layanan ini telah selesai.';
    }

    return (
      title !== '' && (
        <View style={styles.content}>
          <View style={styles.col}>
            <Icon name="alert-circle" size={24} color={iconColor} />
            <View style={styles.notif}>
              <Text style={styles.notifTitle}>{title}</Text>
              <Text style={styles.notifDesc}>{description}</Text>
            </View>
          </View>

          {giveRating && (
            <Button
              style={styles.recommendButton}
              title={'Beri Penilaian Pada ' + (isClient ? 'Petugas' : 'Klien')}
              onPress={() => this.setState({giveRatingModal: true})}
            />
          )}
        </View>
      )
    );
  }

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
            markerIcons={[
              {
                color: '#4CAF50',
              },
              {
                name: 'account-circle',
                color: '#2196F3',
              },
            ]}
          />

          <View style={styles.contentContainer}>
            {this.renderNotifikasi()}

            <View style={[styles.content, styles.col]}>
              <Image
                style={styles.userImage}
                source={
                  layanan.user.image ? {uri: layanan.user.image} : iconUser
                }
              />
              <View style={styles.userDetail}>
                <Text style={styles.userName}>{layanan.user.name}</Text>
                <Text style={styles.userDesc}>{layanan.user.type}</Text>
                <UserRating {...layanan.user.rating} />
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
              {layanan.tindakan.map((item, index) => (
                <View style={styles.tindakan} key={index}>
                  <Icon name="briefcase-edit" style={styles.detailItemIcon} />
                  <Text style={styles.tindakanName}>{item.name}</Text>
                  <Text style={styles.tindakanCost}>{item.cost}</Text>
                </View>
              ))}
            </View>

            <View style={styles.content}>
              <Text style={styles.contentTitle}>Rincian Biaya</Text>
              {layanan.biaya.rincian.map((item, index) => (
                <View key={index} style={styles.rincianBiaya}>
                  <Text style={styles.rincianTitle}>{item.title}</Text>
                  <Text style={styles.rincianValue}>{item.cost}</Text>
                </View>
              ))}
            </View>

            <View style={styles.content}>
              <Text style={styles.contentTitle}>Total Biaya Layanan</Text>
              <Text style={styles.totalCost}>{layanan.biaya.total}</Text>
              <Text style={styles.costDisclaimer}>
                *Tidak termasuk biaya obat-obatan dan tindakan lainnya
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.action, styles.coloredAction]}
            onPress={this.onHubungi}>
            <Text style={[styles.actionTitle, styles.coloredActionTitle]}>
              Hubungi
            </Text>
          </TouchableOpacity>
          {layanan.status.startsWith('Sedang') && (
            <TouchableOpacity
              style={styles.action}
              onPress={layanan.isClient ? this.onBatalkan : this.onSelesai}>
              <Text style={styles.actionTitle}>
                {layanan.isClient ? 'Batalkan' : 'Selesai'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <Dialog ref={ref => (this.dialog = ref)} />
        <GiveRatingModal
          visible={this.state.giveRatingModal}
          onHide={() => this.setState({giveRatingModal: false})}
          value={this.state.rating}
          onValueChange={rating => this.setState({rating})}
          message={this.state.ratingMessage}
          onMessageChange={ratingMessage => this.setState({ratingMessage})}
          onSubmit={this.onSubmitRating}
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
  map: {
    height: 300,
  },
  contentContainer: {
    backgroundColor: '#f2f2f2',
    elevation: 12,
    padding: 8,
    paddingBottom: 0,
  },
  content: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 2,
  },
  col: {
    flexDirection: 'row',
  },
  // notif
  notif: {
    flex: 1,
    marginLeft: 16,
  },
  notifTitle: {
    fontSize: 14,
    color: '#585858',
  },
  notifDesc: {
    fontSize: 12,
    color: '#686868',
    marginTop: 6,
    lineHeight: 18,
  },
  recommendButton: {
    marginTop: 16,
  },
  // user
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
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
  userRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  userRatingText: {
    fontSize: 14,
    color: '#686868',
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
    fontSize: 24,
    color: '#43A047',
    marginTop: 8,
  },
  costDisclaimer: {
    fontSize: 12,
    color: '#727272',
    marginTop: 4,
  },
  // actions
  actions: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderTopWidth: 1,
    padding: 8,
    flexDirection: 'row',
  },
  action: {
    flex: 1,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTitle: {
    color: '#689F38',
    fontSize: 14,
  },
  coloredAction: {
    backgroundColor: '#7CB342',
    borderRadius: 22,
  },
  coloredActionTitle: {
    color: '#fff',
  },
  rincianBiaya: {
    marginTop: 8,
    borderColor: '#eee',
    borderTopWidth: 1,
    paddingTop: 8,
  },
  rincianTitle: {
    fontSize: 12,
    color: '#686868',
  },
  rincianValue: {
    fontSize: 14,
    color: '#484848',
    marginTop: 4,
  },
});
