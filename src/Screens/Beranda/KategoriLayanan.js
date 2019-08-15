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
        <Image source={image} style={styles.itemImage} />
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
        marginLeft: !index ? 16 : 0,
        marginRight: 16,
      },
    ];
    return (
      <Item
        title={item.name}
        image={item.icon}
        style={itemStyle}
        onPress={() => onPress(item.id)}
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
    width: 80,
  },
  itemImage: {
    width: 80,
    height: 80,
  },
  itemTitle: {
    fontSize: 12,
    lineHeight: 18,
    color: '#607D8B',
    marginTop: 6,
    marginRight: 16,
  },
});

export default KategoriLayanan;
