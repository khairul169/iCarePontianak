import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchItems } from "../Actions/Notifikasi.action";

import { View, StyleSheet, FlatList } from "react-native";
import { Header } from "../Components";
import Layanan from "./Notifikasi/Layanan";

const Notifikasi = props => {
  const [collapsedItem, setCollapsedItem] = useState();

  const { items } = props.notifikasi;
  const fetchData = props.fetchItems;

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderItem = ({ item, index }) => {
    return (
      <Layanan
        item={item}
        collapsed={collapsedItem === index}
        onPress={() => {
          setCollapsedItem(collapsedItem !== index ? index : null);
        }}
        navigation={props.navigation}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Notifikasi" />

      <FlatList
        style={styles.container}
        data={items}
        keyExtractor={(item, index) => item.id}
        renderItem={renderItem}
        extraData={collapsedItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B0BEC5"
  }
});

const mapStateToProps = ({ notifikasi }) => ({
  notifikasi
});

const mapDispatchToProps = {
  fetchItems
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifikasi);
