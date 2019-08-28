import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Header, Icon} from 'components';
import {HeaderIcon} from 'components/Header';
import {UserAPI, MessageAPI} from 'public/API';
import {openPhoneNumber} from 'public/Utils';

export default class LihatPesan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      messages: [],
      inputMessage: '',
    };

    this.userId = props.navigation.getParam('id');
  }

  componentDidMount() {
    this.fetchUser();
    this.fetchMessages();
  }

  fetchUser = async () => {
    try {
      const {success, result} = await UserAPI.getUserById(this.userId);
      success && this.setState({user: result});
    } catch (error) {
      console.log(error);
    }
  };

  fetchMessages = async () => {
    try {
      const {success, result} = await MessageAPI.getMessages(this.userId);
      success && this.setState({messages: result});
    } catch (error) {
      console.log(error);
    }
  };

  sendMessage = async () => {
    const {user, inputMessage} = this.state;
    this.setState({inputMessage: ''});

    if (!user) {
      return;
    }

    try {
      const {success} = await MessageAPI.create(user.id, inputMessage);
      success && this.fetchMessages();
    } catch (error) {
      console.log(error);
    }
  };

  renderMessageItem({item}) {
    const itemStyle = [styles.message];
    const msgBoxStyle = [styles.messageBox];
    const textStyle = [styles.messageText];

    if (item.self) {
      itemStyle.push({alignItems: 'flex-end'});
      msgBoxStyle.push({backgroundColor: '#9CCC65'});
      textStyle.push({color: '#fff'});
    }

    return (
      <View style={itemStyle}>
        <Text style={styles.messageTime}>{item.time}</Text>
        <View style={msgBoxStyle}>
          <Text style={textStyle}>{item.message}</Text>
        </View>
      </View>
    );
  }

  renderRightHeaderItem = () => {
    const {user} = this.state;

    if (!user || !user.phone) {
      return;
    }

    return (
      <HeaderIcon
        name="md-call"
        type="Ionicons"
        right
        onPress={() => openPhoneNumber(user.phone)}
      />
    );
  };

  render() {
    const {user, messages} = this.state;

    return (
      <View style={styles.container}>
        <Header
          title={user ? user.name : 'Pesan'}
          backButton
          right={this.renderRightHeaderItem()}
        />
        <FlatList
          data={messages}
          renderItem={this.renderMessageItem}
          keyExtractor={(item, index) => `item-${index}`}
          style={styles.messages}
          contentContainerStyle={styles.messagesContent}
          inverted={true}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Tidak ada pesan untuk ditampilkan.
            </Text>
          }
        />
        <View style={styles.actions}>
          <TextInput
            style={styles.inputMessage}
            placeholder="Kirim pesan.."
            value={this.state.inputMessage}
            onChangeText={inputMessage => this.setState({inputMessage})}
          />
          <TouchableOpacity
            style={styles.actionItem}
            onPress={this.sendMessage}>
            <Icon name="send" style={styles.actionIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messages: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 0,
  },
  message: {
    marginTop: 16,
    alignItems: 'flex-start',
  },
  messageTime: {
    fontSize: 12,
    color: '#686868',
    marginBottom: 8,
  },
  messageBox: {
    backgroundColor: '#fff',
    padding: 16,
    paddingHorizontal: 24,
    borderRadius: 5,
    maxWidth: 250,
  },
  messageText: {
    color: '#424242',
    fontSize: 14,
    textAlign: 'left',
  },
  actions: {
    backgroundColor: '#fff',
    elevation: 12,
    height: 64,
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  inputMessage: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 12,
  },
  actionItem: {
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    fontSize: 28,
    color: '#424242',
  },
  emptyText: {
    fontSize: 14,
    color: '#686868',
    marginTop: 16,
    alignSelf: 'center',
  },
});
