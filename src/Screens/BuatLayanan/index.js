import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Dimensions, ToastAndroid, Text} from 'react-native';
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

  renderBtnLanjut = () => {
    const {buatLayanan} = this.props;
    const {index} = this.state;

    if (index === 0 && !buatLayanan.tindakan.length) {
      return;
    }

    if (index === 1 && !buatLayanan.klien) {
      return;
    }

    return (
      <Button
        title="Lanjut"
        style={styles.btnFinish}
        color="#fff"
        onPress={this.onLanjut}
      />
    );
  };

  renderTabBar(props) {
    return (
      <TabBar
        {...props}
        style={styles.tabBar}
        tabStyle={styles.tabStyle}
        getLabelText={({route}) => route.title}
        activeColor="#43A047"
        inactiveColor="#585858"
        renderLabel={({route, color}) => {
          const labelStyle = [styles.tabLabel, {color}];
          return <Text style={labelStyle}>{route.title}</Text>;
        }}
        renderIcon={({route, color}) => {
          return <Icon name={route.icon} size={18} color={color} />;
        }}
        renderIndicator={() => <View />}
      />
    );
  }

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
          renderTabBar={this.renderTabBar.bind(this)}
        />

        {this.renderBtnLanjut()}
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
    color: '#FF5722',
    margin: 0,
    fontSize: 14,
    marginTop: 2,
  },
  btnFinish: {
    margin: 8,
    backgroundColor: '#8BC34A',
    borderWidth: 0,
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
