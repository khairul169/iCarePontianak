import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {fetchItems} from '../Actions/Layanan.action';

import {View, StyleSheet, FlatList} from 'react-native';
import {Header} from '../Components';
import ItemLayanan from './Layanan/Item';

const Layanan = props => {
  const [collapsedItem, setCollapsedItem] = useState();

  const {loading, items} = props.layanan;
  const fetchData = props.fetchItems;

  const onRefresh = () => {
    props.fetchItems();
  };

  // fetch data on load
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderItem = ({item, index}) => {
    const itemStyle = {marginTop: !index ? 8 : 0};
    return (
      <ItemLayanan
        item={item}
        collapsed={collapsedItem === index}
        style={itemStyle}
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
        onRefresh={onRefresh}
        refreshing={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = ({layanan}) => ({
  layanan,
});

const mapDispatchToProps = {
  fetchItems,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layanan);
