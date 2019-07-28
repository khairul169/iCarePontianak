import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ItemDetail as Item } from "../../Components";

const ItemDetail = () => {
  const items = [
    {
      icon: "mother-nurse",
      title: "Jenis Layanan",
      text: "Test"
    },
    {
      icon: "account-alert",
      title: "Keluhan Utama",
      text: "Test"
    },
    {
      icon: "briefcase-edit",
      title: "Jenis Tindakan",
      text: "Test"
    },
    {
      icon: "box-cutter",
      title: "Diagnosa Medis",
      text: "Test"
    },
    {
      icon: "calendar-clock",
      title: "Waktu Kunjungan",
      text: "Test"
    },
    {
      icon: "home-map-marker",
      title: "Lokasi Klien",
      text: "Test"
    }
  ];

  const renderItem = ({ item, index }) => {
    return (
      <Item
        icon={item.icon}
        title={item.title}
        text={item.text}
        margin={index > 0}
        border={index < items.length - 1}
      />
    );
  };

  return (
    <View style={styles.detailLayanan}>
      <FlatList
        data={items}
        keyExtractor={item => item.title}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  detailLayanan: {
    marginBottom: 16
  }
});

export default ItemDetail;
