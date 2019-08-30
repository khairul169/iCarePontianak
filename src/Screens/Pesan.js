import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Header} from 'components';
import {MessageAPI} from 'public/API';

export default class Pesan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      items: [],
    };
  }

  componentDidMount() {
    this.fetchItems();
  }

  onRefresh = () => {
    this.fetchItems();
  };

  fetchItems = async () => {
    this.setState({loading: true});
    try {
      const {success, result} = await MessageAPI.getMessageList();
      success && this.setState({items: result});
    } catch (error) {
      console.log(error);
    }
    this.setState({loading: false});
  };

  renderItem({item}) {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          this.props.navigation.navigate('LihatPesan', {id: item.receiver.id})
        }>
        <Image source={{uri: item.receiver.image}} style={styles.itemImage} />
        <View style={styles.itemContent}>
          <Text style={styles.itemName}>{item.receiver.name}</Text>
          <Text style={styles.itemMessage}>{item.message}</Text>
          <Text style={styles.itemTime}>{item.time}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Pesan" />
        <FlatList
          style={styles.container}
          contentContainerStyle={styles.itemListContainer}
          data={this.state.items}
          renderItem={this.renderItem.bind(this)}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Tidak ada pesan untuk ditampilkan.
            </Text>
          }
          onRefresh={this.onRefresh}
          refreshing={this.state.loading}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  itemListContainer: {
    padding: 8,
    paddingBottom: 0,
  },
  emptyText: {
    fontSize: 14,
    color: '#686868',
    marginTop: 16,
    alignSelf: 'center',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 2,
    marginBottom: 8,
    padding: 16,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#323232',
  },
  itemMessage: {
    fontSize: 14,
    color: '#525252',
    marginTop: 2,
  },
  itemTime: {
    fontSize: 12,
    color: '#686868',
    marginTop: 4,
  },
});
