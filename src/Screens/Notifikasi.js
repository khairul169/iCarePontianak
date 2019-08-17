import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Header} from '../Components';
import {fetchItems} from '../Redux/Actions/Notifikasi';

class Notifikasi extends Component {
  onLoaded = () => {
    this.props.fetchItems();
  };

  componentDidMount() {
    this.onLoaded();
  }

  emptyNotification = () => {
    return <Text style={styles.emptyText}>Tidak ada notifikasi.</Text>;
  };

  renderItem = ({item, index}) => {
    const itemStyle = [styles.item, !index && {paddingTop: 0}];
    return (
      <View style={itemStyle}>
        <Text style={styles.itemDate}>{item.time}</Text>
        <Text style={styles.itemContent}>{item.content}</Text>
      </View>
    );
  };

  render() {
    const {items, loading} = this.props.notifikasi;

    return (
      <View style={styles.container}>
        <Header title="Notifikasi" />

        <FlatList
          style={styles.content}
          data={items}
          keyExtractor={(item, index) => `notif-${index}`}
          renderItem={this.renderItem}
          ListEmptyComponent={this.emptyNotification}
          onRefresh={this.onLoaded}
          refreshing={loading}
        />
      </View>
    );
  }
}

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
