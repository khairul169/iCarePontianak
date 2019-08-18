import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, TextInput, FlatList} from 'react-native';
import {Button, Icon} from 'components';
import {fetchKlien, setKlien} from 'actions/BuatLayanan';

class PilihKlien extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };
  }

  componentDidMount() {
    this.props.fetchKlien();
  }

  onClientPress = id => {
    this.props.setKlien(id);
    this.props.nav.jumpTo('detail');
  };

  searchByQuery = (items, query) => {
    return items.filter(
      item =>
        item.nama && item.nama.toLowerCase().includes(query.toLowerCase()),
    );
  };

  renderItem({item, index}) {
    return (
      <Button
        style={styles.item}
        title={`${item.nama} - ${item.umur} tahun`}
        onPress={() => this.onClientPress(item.id)}
      />
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
        />
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
    marginBottom: 8,
  },
});

const mapStateToProps = ({buatLayanan}) => ({
  listKlien: buatLayanan.listKlien,
});

const mapDispatchToProps = {
  fetchKlien,
  setKlien,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PilihKlien);
