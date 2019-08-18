import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, FlatList, Text} from 'react-native';
import {Button, Icon} from 'components';
import {fetchKategori, setTindakan} from 'actions/BuatLayanan';

class PilihTindakan extends Component {
  constructor(props) {
    super(props);
    this.kategori = props.navigation.getParam('kategori', 0);
  }

  componentDidMount() {
    this.props.fetchKategori(this.kategori);
  }

  onTindakanPress = id => {
    const tindakan = [...this.props.tindakan];
    const index = tindakan.indexOf(id);

    if (index > -1) {
      tindakan.splice(index, 1);
    } else {
      tindakan.push(id);
    }

    this.props.setTindakan(tindakan);
  };

  renderItem({item}) {
    const selected = this.props.tindakan.includes(item.id);
    return (
      <Button style={styles.item} onPress={() => this.onTindakanPress(item.id)}>
        <Text style={[styles.itemName, selected && styles.itemSelected]}>
          {item.name}
        </Text>
        <Text style={styles.itemCost}>{item.cost}</Text>
        {selected && <Icon name="check" size={18} color="#7CB342" />}
      </Button>
    );
  }

  render() {
    const {kategori} = this.props;
    return (
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.content}
        data={kategori && kategori.actions}
        renderItem={this.renderItem.bind(this)}
        keyExtractor={(item, index) => `item${index}`}
        extraData={this.props.tindakan}
      />
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
    paddingBottom: 8,
  },
  item: {
    marginBottom: 8,
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    flex: 1,
    marginRight: 8,
    fontSize: 14,
    lineHeight: 18,
    color: '#455A64',
  },
  itemSelected: {
    fontWeight: 'bold',
  },
  itemCost: {
    marginRight: 8,
    fontSize: 14,
    color: '#686868',
  },
});

const mapStateToProps = ({buatLayanan}) => ({
  kategori: buatLayanan.kategori,
  tindakan: buatLayanan.tindakan,
});

const mapDispatchToProps = {
  fetchKategori,
  setTindakan,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PilihTindakan);
