import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Header, Icon} from '../Components';
import {fetchItems} from '../Redux/Actions/Layanan';

const ItemHeaderAction = ({icon, type, color, onPress}) => {
  const iconStyle = [styles.itemHeaderActionIcon, color && {color}];
  return (
    <TouchableOpacity style={styles.itemHeaderAction} onPress={onPress}>
      <Icon name={icon} type={type} style={iconStyle} />
    </TouchableOpacity>
  );
};

const Item = ({item, index}) => (
  <View style={[styles.item, !index && styles.itemFirst]}>
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => console.log('ehhe')}>
      <View style={styles.itemHeader}>
        <Image style={styles.itemPhoto} source={{uri: item.user.image}} />

        <View style={styles.itemHeaderContent}>
          <Text style={styles.itemHeaderName}>
            {item.user.name || 'Tanpa Nama'}
          </Text>
          <Text style={styles.itemHeaderDetail}>
            {item.user.type || 'Pengguna'}
          </Text>
        </View>

        <ItemHeaderAction icon="message-text" color="#7CB342" />
        <ItemHeaderAction icon="md-call" type="Ionicons" color="#3949AB" />
      </View>

      <View style={styles.itemDetail}>
        <Icon name="information-outline" style={styles.itemDetailIcon} />
        <Text style={styles.itemDetailValue}>{item.status}</Text>
        <Text style={styles.itemDetailCost}>{item.tindakan.cost}</Text>
      </View>

      <View style={styles.itemDetail}>
        <Icon
          name="notes-medical"
          type="FontAwesome5"
          style={styles.itemDetailIcon}
        />
        <Text style={styles.itemDetailValue}>{item.tindakan.label}</Text>
      </View>

      {item.waktu && (
        <View style={[styles.itemDetail, styles.itemDetailSeparator]}>
          <Icon name="clock-outline" style={styles.itemDetailIcon} />
          <Text style={styles.itemDetailValue}>{item.waktu}</Text>
        </View>
      )}

      {item.alamat && (
        <View style={styles.itemDetail}>
          <Icon name="home-map-marker" style={styles.itemDetailIcon} />
          <Text style={styles.itemDetailValue}>{item.alamat}</Text>
        </View>
      )}
    </TouchableOpacity>
  </View>
);

class Layanan extends Component {
  constructor(props) {
    super(props);
    this.renderLayanan = this.renderLayanan.bind(this);
  }

  onLoaded = () => {
    this.props.fetchItems();
  };

  componentDidMount() {
    this.onLoaded();
  }

  renderLayanan(props) {
    return <Item {...props} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Layanan" />

        <FlatList
          style={styles.content}
          data={this.props.layanan.items}
          renderItem={this.renderLayanan}
          keyExtractor={item => item.id}
          onRefresh={this.onLoaded}
          refreshing={this.props.layanan.loading}
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
    flex: 1,
  },
  // item
  item: {
    backgroundColor: '#fff',
    margin: 8,
    marginTop: 0,
    borderRadius: 8,
    elevation: 2,
  },
  itemFirst: {
    marginTop: 8,
  },
  itemContainer: {
    padding: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    borderColor: '#eee',
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  itemPhoto: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#555',
    overflow: 'hidden',
  },
  itemHeaderContent: {
    flex: 1,
    marginLeft: 16,
  },
  itemHeaderName: {
    fontSize: 16,
    color: '#455A64',
  },
  itemHeaderDetail: {
    fontSize: 12,
    color: '#78909C',
    marginTop: 4,
  },
  // header actions
  itemHeaderAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    elevation: 2,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemHeaderActionIcon: {
    fontSize: 18,
    margin: 0,
    padding: 0,
    color: '#686868',
  },
  // item detail
  itemDetail: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'flex-start',
  },
  itemDetailIcon: {
    fontSize: 18,
    color: '#78909C',
    width: 32,
    marginRight: 16,
    textAlign: 'center',
  },
  itemDetailValue: {
    flex: 1,
    fontSize: 14,
    color: '#626262',
    lineHeight: 22,
  },
  itemDetailCost: {
    fontSize: 16,
    color: '#FFA726',
  },
  itemDetailSeparator: {
    borderColor: '#eee',
    borderTopWidth: 1,
    paddingTop: 16,
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
