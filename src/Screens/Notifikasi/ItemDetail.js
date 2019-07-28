import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ItemDetail as Item } from "../../Components";
import { getTimeString, getServiceName } from "../../Utils";

const ItemDetail = ({ type, data }) => {
  const items = [
    {
      icon: "mother-nurse",
      title: "Jenis Layanan",
      text: getServiceName(type)
    },
    {
      icon: "account-alert",
      title: "Keluhan Utama",
      text: data.keluhan
    },
    {
      icon: "briefcase-edit",
      title: "Jenis Tindakan",
      text: data.tindakan
    },
    {
      icon: "box-cutter",
      title: "Diagnosa Medis",
      text: data.diagnosa
    },
    {
      icon: "calendar-clock",
      title: "Waktu Kunjungan",
      text: getTimeString(data.waktu)
    },
    {
      icon: "home-map-marker",
      title: "Lokasi Klien",
      text: data.alamat
    }
  ];

  const renderItem = ({ item, index }) => {
    if (!item.text) return;

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
