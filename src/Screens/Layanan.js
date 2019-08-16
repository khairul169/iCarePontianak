import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, FlatList} from 'react-native';
import {Header} from '../Components';
import ItemLayanan from './Layanan/Item';
import {fetchItems, setServiceStatus} from '../Redux/Actions/Layanan';

const Layanan = props => {
  const [collapsedItem, setCollapsedItem] = useState();
  const {loading, items} = props.layanan;

  const onLoaded = () => {
    props.fetchItems();
  };

  const renderItem = ({item, index}) => {
    const itemStyle = {marginTop: !index ? 8 : 0};
    return (
      <ItemLayanan
        item={item}
        collapsed={collapsedItem === index}
        style={itemStyle}
        navigation={props.navigation}
        onPress={() => {
          setCollapsedItem(collapsedItem !== index ? index : null);
        }}
        onCancel={() => {
          props.setServiceStatus(item.id, 'cancel');
        }}
        onComplete={() => {
          props.setServiceStatus(item.id, 'success');
        }}
      />
    );
  };

  // fetch data on load
  useEffect(onLoaded, []);

  return (
    <View style={styles.container}>
      <Header title="Layanan" />

      <FlatList
        style={styles.container}
        data={items}
        keyExtractor={(item, index) => item.id}
        renderItem={renderItem}
        extraData={collapsedItem}
        onRefresh={onLoaded}
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
  setServiceStatus,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layanan);
