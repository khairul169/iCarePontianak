import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Dimensions, ToastAndroid} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {Header, Icon, Button} from 'components';
import {resetState} from 'actions/BuatLayanan';
import {createScreenStack} from 'public/Utils';

import PilihTindakan from './PilihTindakan';
import PilihKlien from './PilihKlien';
import DetailLayanan from './DetailLayanan';
import Konfirmasi from './Konfirmasi';
import CariNakes from './CariNakes';
import TambahKlien from './TambahKlien';

class BuatLayanan extends Component {
  constructor(props) {
    super(props);

    this.props.resetState();
    this.state = {
      index: 0,
      routes: [
        {key: 'tindakan', title: 'Tindakan', icon: 'briefcase-edit'},
        {key: 'klien', title: 'Klien', icon: 'mother-nurse'},
        {key: 'detail', title: 'Detail', icon: 'home-plus'},
      ],
    };
  }

  renderScene = nav => {
    const props = {...this.props, nav};

    // get jumpTo function from tabview
    this.jumpTo = nav.jumpTo;

    switch (nav.route.key) {
      case 'tindakan':
        return <PilihTindakan {...props} />;
      case 'klien':
        return <PilihKlien {...props} />;
      case 'detail':
        return <DetailLayanan {...props} />;
      default:
        return null;
    }
  };

  checkInputLayanan = () => {
    const {
      tindakan,
      klien,
      keluhan,
      alamat,
      lokasi,
      waktu,
    } = this.props.buatLayanan;

    return (
      tindakan && klien && keluhan !== '' && alamat !== '' && lokasi && waktu
    );
  };

  onLanjut = () => {
    const index = this.state.index;

    if (index === 0) {
      this.jumpTo && this.jumpTo('klien');
      return;
    }

    if (index === 1) {
      this.jumpTo && this.jumpTo('detail');
      return;
    }

    if (!this.checkInputLayanan()) {
      ToastAndroid.show('Mohon lengkapi form yang ada.', ToastAndroid.SHORT);
      return;
    }

    this.props.navigation.navigate('Konfirmasi');
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title="Buat Layanan" backButton />

        <TabView
          navigationState={this.state}
          lazy={true}
          renderScene={this.renderScene}
          onIndexChange={index => this.setState({index})}
          initialLayout={{width: Dimensions.get('window').width}}
          renderTabBar={props => (
            <TabBar
              {...props}
              style={styles.tabBar}
              tabStyle={styles.tabStyle}
              labelStyle={styles.tabLabel}
              getLabelText={({route}) => route.title}
              renderIcon={({route}) => (
                <Icon style={styles.tabIcon} name={route.icon} />
              )}
              indicatorStyle={styles.tabIndicator}
            />
          )}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Lanjut"
            style={styles.btnFinish}
            color="#fff"
            onPress={this.onLanjut}
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
  tabBar: {
    backgroundColor: '#fff',
    elevation: 2,
  },
  tabStyle: {
    paddingTop: 0,
    paddingBottom: 12,
  },
  tabLabel: {
    color: '#7986CB',
    margin: 0,
    fontSize: 14,
    marginTop: 2,
  },
  tabIcon: {
    fontSize: 18,
    color: '#7986CB',
  },
  tabIndicator: {
    backgroundColor: '#7986CB',
  },
  buttonContainer: {
    padding: 8,
    backgroundColor: '#fff',
    elevation: 12,
  },
  btnFinish: {
    borderWidth: 0,
    backgroundColor: '#8BC34A',
  },
});

const mapStateToProps = ({buatLayanan}) => ({
  buatLayanan,
});

const mapDispatchToProps = {
  resetState,
};

const Index = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuatLayanan);

export default createScreenStack({
  Index,
  Konfirmasi,
  CariNakes,
  TambahKlien,
});
