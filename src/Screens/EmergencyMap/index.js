import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import {TouchableOpacity, FlatList} from 'react-native-gesture-handler';
import {Header, MapLayout} from 'components';
import {EmergencyAPI} from 'public/API';
import {createScreenStack} from 'public/Utils';

const haversine = require('haversine');

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      userLocation: null,
    };

    this.markerRefs = [];
  }

  componentDidMount() {
    this.fetchLists();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.userLocation !== prevState.userLocation) {
      this.remapItems();
    }
  }

  fetchLists = async () => {
    try {
      const {success, result} = await EmergencyAPI.getLists();
      success && this.setState({items: result});
    } catch (error) {
      console.log(error);
    }
  };

  remapItems = () => {
    if (!this.state.userLocation || !this.state.items) {
      return;
    }

    const items = this.state.items.map(item => {
      item.distance = haversine(this.state.userLocation, item.lokasi);
      return item;
    });

    // sort items
    items.sort((a, b) => a.distance - b.distance);

    // set state
    this.setState({items});
  };

  renderPanelHeader() {
    return (
      <View style={styles.header}>
        <View style={styles.headerHandler} />
      </View>
    );
  }

  onItemPress = (item, index) => {
    this.mapLayout.moveToLocation(item.lokasi);
    this.markerRefs[index].showCallout();
    this.panel.snapTo(1);
  };

  renderPanel() {
    return (
      <View style={styles.panel}>
        <FlatList
          style={styles.panelContent}
          data={this.state.items}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => this.onItemPress(item, index)}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemDesc}>{item.time}</Text>
                <Text style={styles.itemDesc}>
                  {item.distance && item.distance.toFixed(1)} km
                </Text>
              </View>
              <Text style={styles.itemTitle}>{item.jenis}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  render() {
    const {items} = this.state;
    return (
      <View style={styles.container}>
        <Header title="Emergency Map" transparent />
        <BottomSheet
          ref={ref => (this.panel = ref)}
          snapPoints={[274, 24]}
          renderHeader={this.renderPanelHeader.bind(this)}
          renderContent={this.renderPanel.bind(this)}
          initialSnap={0}
        />
        <MapLayout
          ref={ref => (this.mapLayout = ref)}
          style={styles.map}
          markers={
            items &&
            items.map(item => ({
              title: item.jenis,
              description: item.keterangan,
              coordinate: item.lokasi,
              icon: 'hand',
              iconColor: '#d13d3d',
            }))
          }
          onMarkerRef={(index, ref) => (this.markerRefs[index] = ref)}
          onMapReady={() => this.panel.snapTo(0)}
          onUserLocation={userLocation => this.setState({userLocation})}
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
    flex: 1,
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
    height: 250,
    backgroundColor: '#fff',
  },
  panelContent: {
    flex: 1,
  },
  item: {
    borderColor: '#eee',
    borderBottomWidth: 1,
    padding: 16,
    paddingTop: 0,
    marginBottom: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemDesc: {
    fontSize: 12,
    color: '#787878',
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 14,
    color: '#525252',
  },
});

export default createScreenStack({
  Index,
});
