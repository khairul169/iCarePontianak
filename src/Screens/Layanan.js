import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchItems } from "../Actions/Layanan.action";

import { View, StyleSheet, FlatList } from "react-native";
import { Header } from "../Components";
import ItemLayanan from "./Layanan/Item";

const Layanan = props => {
  const [collapsedItem, setCollapsedItem] = useState();

  const { items } = props.layanan;
  const fetchData = props.fetchItems;

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderItem = ({ item, index }) => {
    return (
      <ItemLayanan
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
      <Header title="Layanan" />

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

const mapStateToProps = ({ layanan }) => ({
  layanan
});

const mapDispatchToProps = {
  fetchItems
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layanan);
