import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchItems } from "../Actions/Notifikasi.action";

import { View, StyleSheet, ScrollView } from "react-native";
import { Header } from "../Components";
import Layanan from "./Notifikasi/Layanan";

const Notifikasi = props => {
  const [collapsedItem, setCollapsedItem] = useState();

  const { items } = props.notifikasi;
  const fetchData = props.fetchItems;

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <View style={styles.container}>
      <Header title="Notifikasi" />

      <ScrollView style={styles.container}>
        {items &&
          items.map((item, index) => (
            <Layanan
              key={index}
              item={item}
              collapsed={collapsedItem === index}
              onPress={() =>
                setCollapsedItem(collapsedItem !== index ? index : null)
              }
            />
          ))}
      </ScrollView>
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
