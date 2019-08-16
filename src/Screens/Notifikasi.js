import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Header} from '../Components';
import {fetchItems} from '../Redux/Actions/Notifikasi';

const Notifikasi = props => {
  const {loading, items} = props.notifikasi;

  const onLoaded = () => {
    props.fetchItems();
  };

  // load items
  useEffect(onLoaded, []);

  const emptyNotification = () => {
    return <Text style={styles.emptyText}>Tidak ada notifikasi.</Text>;
  };

  const renderItem = ({item, index}) => {
    const itemStyle = [styles.item, !index && {paddingTop: 0}];
    return (
      <View style={itemStyle}>
        <Text style={styles.itemDate}>{item.time}</Text>
        <Text style={styles.itemContent}>{item.content}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Notifikasi" />

      <FlatList
        style={styles.content}
        data={items}
        keyExtractor={(item, index) => `notif-${index}`}
        renderItem={renderItem}
        ListEmptyComponent={emptyNotification}
        onRefresh={onLoaded}
        refreshing={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#424242',
    alignSelf: 'center',
  },
  item: {
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderBottomWidth: 1,
    paddingVertical: 16,
  },
  itemDate: {
    fontSize: 12,
    color: '#626262',
    marginBottom: 4,
  },
  itemContent: {
    fontSize: 14,
    color: '#333',
    lineHeight: 18,
  },
});

const mapStateToProps = ({notifikasi}) => ({
  notifikasi,
});

const mapDispatchToProps = {
  fetchItems,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifikasi);
