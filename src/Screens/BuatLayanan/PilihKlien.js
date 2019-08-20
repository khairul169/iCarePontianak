import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import Menu, {MenuItem} from 'react-native-material-menu';
import {Icon} from 'components';
import {fetchKlien, setKlien} from 'actions/BuatLayanan';
import {ClientAPI} from 'public/API';

class PilihKlien extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };
    this.itemMenuList = [];
  }

  componentDidMount() {
    this.props.fetchKlien();
  }

  onClientPress = id => {
    this.props.setKlien(id);
  };

  searchByQuery = (items, query) => {
    return items.filter(
      item =>
        item.nama && item.nama.toLowerCase().includes(query.toLowerCase()),
    );
  };

  onHapusKlien = async id => {
    try {
      const {success} = await ClientAPI.delete(id);
      success && this.props.fetchKlien();
    } catch (error) {
      console.log(error);
    }
  };

  renderItem({item, index}) {
    const selected = this.props.klien === item.id;
    return (
      <Menu
        ref={ref => (this.itemMenuList[index] = ref)}
        button={
          <TouchableOpacity
            style={styles.item}
            onPress={() => this.onClientPress(item.id)}
            onLongPress={() => this.itemMenuList[index].show()}>
            <Icon name="account" size={20} color="#8BC34A" />
            <View style={styles.itemDesc}>
              <Text style={styles.itemName}>{item.nama}</Text>
              <Text style={styles.itemAge}>{item.umur} tahun</Text>
            </View>
            {selected && <Icon name="check" size={18} color="#7CB342" />}
          </TouchableOpacity>
        }>
        <MenuItem
          onPress={() => {
            this.onClientPress(item.id);
            this.itemMenuList[index].hide();
          }}>
          Pilih Klien
        </MenuItem>
        <MenuItem
          onPress={() => {
            this.onHapusKlien(item.id);
            this.itemMenuList[index].hide();
          }}>
          Hapus Klien
        </MenuItem>
      </Menu>
    );
  }

  render() {
    const {search} = this.state;
    const items =
      search !== ''
        ? this.searchByQuery(this.props.listKlien, search)
        : this.props.listKlien;

    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <Icon type="Ionicons" name="md-search" style={styles.searchBarIcon} />
          <TextInput
            style={styles.searchBarInput}
            placeholder="Cari klien..."
            value={search}
            onChangeText={value => this.setState({search: value})}
          />
        </View>

        <FlatList
          style={styles.content}
          data={items}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => `item${index}`}
          extraData={this.props.klien}
        />

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => this.props.navigation.navigate('TambahKlien')}>
          <Icon name="account-plus" size={24} color="#484848" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
    paddingTop: 0,
    flex: 1,
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 2,
    borderColor: '#ddd',
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    margin: 16,
    marginBottom: 8,
  },
  searchBarIcon: {
    fontSize: 18,
    color: '#727272',
  },
  searchBarInput: {
    flex: 1,
    padding: 16,
    paddingVertical: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 0,
    height: 75,
    borderColor: '#eee',
    borderBottomWidth: 1,
  },
  itemDesc: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: 14,
    color: '#686868',
  },
  itemAge: {
    fontSize: 12,
    color: '#787878',
    marginTop: 4,
  },
  removeButton: {
    width: 64,
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  removeButtonIcon: {
    fontSize: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    elevation: 3,
    lineHeight: 32,
    textAlign: 'center',
    marginRight: 4,
    color: '#e57373',
  },
  actionButton: {
    backgroundColor: '#fff',
    elevation: 5,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});

const mapStateToProps = ({buatLayanan}) => ({
  listKlien: buatLayanan.listKlien,
  klien: buatLayanan.klien,
});

const mapDispatchToProps = {
  fetchKlien,
  setKlien,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PilihKlien);
