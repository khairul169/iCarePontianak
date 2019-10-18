import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  FlatList,
} from 'react-native';

const Item = ({title, image, onPress, style}) => {
  return (
    <TouchableHighlight
      style={[styles.item, style]}
      onPress={onPress}
      underlayColor={null}>
      <View>
        <View style={styles.itemImageContainer}>
          <Image source={image} style={styles.itemImage} />
        </View>
        <Text style={styles.itemTitle}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
};

const KategoriLayanan = ({data, onPress}) => {
  const renderItem = ({item, index}) => {
    const itemStyle = [
      styles.item,
      {
        marginLeft: !index ? 16 : 8,
        marginRight: data && index < data.length - 1 ? 8 : 16,
      },
    ];
    return (
      <Item
        title={item.name}
        image={{uri: item.icon}}
        style={itemStyle}
        onPress={() => onPress(item)}
      />
    );
  };

  return (
    <FlatList
      style={styles.container}
      horizontal={true}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.name}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  item: {
    marginTop: 5,
    width: 80,
  },
  itemImageContainer: {
    backgroundColor: '#fff',
    borderRadius: 2,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
  },
  itemImage: {
    width: 60,
    height: 60,
  },
  itemTitle: {
    fontSize: 12,
    lineHeight: 18,
    color: '#607D8B',
    marginTop: 6,
    textAlign: 'center',
  },
});

export default KategoriLayanan;
