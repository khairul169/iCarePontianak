import React, {Component} from 'react';
import {View, Text, StyleSheet, BackHandler} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {Header, MapLayout, Button} from 'components';
import {openPhoneNumber} from 'public/Utils';
import {EmergencyAPI} from 'public/API';
import {pinAmbulance} from 'assets';

const haversine = require('haversine');

class CariAmbulan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      userLocation: null,
      selectedItem: null,
    };

    this.markerRefs = [];
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.onBackPress,
    );

    this.fetchItems();
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.userLocation !== prevState.userLocation) {
      this.remapItems();
    }
  }

  onBackPress = () => {
    if (this.state.selectedItem !== null) {
      this.releaseItem();
      return true;
    }
    return false;
  };

  fetchItems = async () => {
    try {
      const {result} = await EmergencyAPI.getAmbulance();
      // set state
      this.setState({items: result});
    } catch (error) {
      console.log(error);
    }
  };

  remapItems = () => {
    if (!this.state.userLocation) {
      return;
    }

    const items = this.state.items.map(item => {
      item.distance = haversine(this.state.userLocation, item.coordinate);
      return item;
    });

    // sort items
    items.sort((a, b) => a.distance - b.distance);

    // set state
    this.setState({items});
  };

  selectItem = index => {
    const item = this.state.items[index];
    this.setState({selectedItem: index});
    this.markerRefs[index].showCallout();
    this.mapLayout.moveToLocation(item.coordinate);
    this.panel.snapTo(1);
  };

  releaseItem = () => {
    this.setState({selectedItem: null});
  };

  renderHeader() {
    return (
      <View style={styles.header}>
        <View style={styles.headerHandler} />
      </View>
    );
  }

  renderAmbulanceList({item, index}) {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => this.selectItem(index)}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.distance}>
            {item.distance && item.distance.toFixed(1)} km
          </Text>
        </View>
        <Text style={styles.address}>{item.address}</Text>
      </TouchableOpacity>
    );
  }

  renderPanel() {
    if (this.state.selectedItem !== null) {
      const item = this.state.items[this.state.selectedItem];
      return (
        <View style={styles.panel}>
          <View style={styles.content}>
            <Text style={styles.ambulanceName}>{item.name}</Text>
            <Text style={styles.address}>{item.address}</Text>
            <Text style={styles.desc}>{item.description}</Text>

            <Button
              style={styles.hubungi}
              title="Hubungi"
              onPress={() => openPhoneNumber(item.phone)}
            />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.panel}>
        <FlatList
          data={this.state.items}
          keyExtractor={(item, index) => `item-${index}`}
          renderItem={this.renderAmbulanceList.bind(this)}
        />
      </View>
    );
  }

  render() {
    const {items} = this.state;
    const markers =
      items &&
      items.map((item, index) => ({
        title: item.name,
        image: pinAmbulance,
        coordinate: item.coordinate,
        icon: 'ambulance',
        onPress: () => this.selectItem(index),
      }));

    return (
      <View style={styles.container}>
        <Header title="Ambulan" backButton transparent />

        <MapLayout
          ref={ref => (this.mapLayout = ref)}
          style={styles.container}
          onUserLocation={userLocation => this.setState({userLocation})}
          onPress={this.releaseItem}
          markers={markers}
          onMarkerRef={(index, ref) => (this.markerRefs[index] = ref)}
          mapPadding={{top: 64, bottom: 250}}
          onMapReady={() => this.panel.snapTo(1)}
        />

        <BottomSheet
          ref={ref => (this.panel = ref)}
          snapPoints={[424, 250, 24]}
          renderHeader={this.renderHeader.bind(this)}
          renderContent={this.renderPanel.bind(this)}
          initialSnap={1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
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
    height: 400,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#eee',
    padding: 12,
    paddingHorizontal: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#424242',
    flex: 1,
  },
  ambulanceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#424242',
  },
  distance: {
    fontSize: 12,
    color: '#484848',
  },
  address: {
    fontSize: 12,
    color: '#686868',
    marginTop: 4,
  },
  desc: {
    fontSize: 12,
    color: '#525252',
    marginTop: 8,
    paddingTop: 12,
    borderColor: '#eee',
    borderTopWidth: 1,
  },
  hubungi: {
    marginTop: 16,
  },
});

export default CariAmbulan;
