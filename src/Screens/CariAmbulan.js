import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchItems } from "../Actions/Ambulan.action";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Linking,
  BackHandler,
  Dimensions
} from "react-native";
import { Header, BottomSheet, MapLayout, Button } from "../Components";
import { pinAmbulance } from "../Assets";

const haversine = require("haversine");
const window = Dimensions.get("window");

const CariAmbulan = props => {
  const { navigation } = props;
  const fetchData = props.fetchItems;

  // states
  const [userLocation, setUserLocation] = useState();
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    // fetch items
    fetchData();
  }, [fetchData]);

  const mapdistance = item => {
    item.coordinate = {
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lng)
    };
    item.distance = userLocation ? haversine(userLocation, item.coordinate) : 0;
    return item;
  };

  const items = props.ambulan.map(mapdistance);
  items.sort((a, b) => a.distance - b.distance);

  const selectItem = (index, animate) => {
    const item = items[index];
    setSelectedItem(item);
    this.mapLayout.moveToLocation(item.coordinate);
    this.bottomSheet.show();
  };

  const markers = items.map((item, index) => {
    return {
      title: item.name,
      image: pinAmbulance,
      coordinate: item.coordinate,
      onPress: () => selectItem(index)
    };
  });

  const releaseItem = () => {
    setSelectedItem(null);
  };

  // handle back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (selectedItem) {
          releaseItem();
          return true;
        }
        return false;
      }
    );
    return () => {
      backHandler.remove();
    };
  }, [selectedItem]);

  const renderAmbulanceList = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => selectItem(index)}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.distance}>{item.distance.toFixed(1)} km</Text>
        </View>
        <Text style={styles.address}>{item.address}</Text>
      </TouchableOpacity>
    );
  };

  const hubungi = number => {
    Linking.openURL(`tel:${number}`);
  };

  const renderBottom = () => {
    if (selectedItem) {
      const item = selectedItem;
      return (
        <ScrollView style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.ambulanceName}>{item.name}</Text>
            <Text style={styles.address}>{item.address}</Text>
            <Text style={styles.desc}>{item.description}</Text>

            <Button
              style={styles.hubungi}
              title="Hubungi"
              onPress={() => hubungi(item.phone)}
            />
          </View>
        </ScrollView>
      );
    }

    return (
      <FlatList
        style={styles.container}
        data={items}
        keyExtractor={(item, index) => `amb${index}`}
        renderItem={renderAmbulanceList}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Cari Ambulan"
        transparent
        backButton
        navigation={navigation}
      />

      <MapLayout
        ref={ref => {
          this.mapLayout = ref;
        }}
        style={styles.container}
        onUserLocation={setUserLocation}
        onMapReady={() => {
          setTimeout(() => this.bottomSheet.show(), 500);
        }}
        onPress={releaseItem}
        markers={markers}
        mapPadding={{ bottom: window.height * 0.3 }}
      />

      <BottomSheet
        ref={ref => {
          this.bottomSheet = ref;
        }}
        headerHeight={32}
        style={styles.bottomPanel}
        points={[0.4, 0.15]}
      >
        {renderBottom()}
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    padding: 16
  },
  bottomPanel: {
    elevation: 10
  },
  item: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
    padding: 12,
    paddingHorizontal: 16
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center"
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#424242",
    flex: 1
  },
  ambulanceName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#424242"
  },
  distance: {
    fontSize: 12,
    color: "#484848"
  },
  address: {
    fontSize: 12,
    color: "#686868",
    marginTop: 4
  },
  desc: {
    fontSize: 12,
    color: "#525252",
    marginTop: 8,
    paddingTop: 12,
    borderColor: "#eee",
    borderTopWidth: 1
  },
  hubungi: {
    marginTop: 16
  }
});

const mapStateToProps = ({ ambulan }) => ({
  ambulan
});

const mapDispatchToProps = {
  fetchItems
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CariAmbulan);
