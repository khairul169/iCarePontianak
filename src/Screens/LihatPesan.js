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

const mockData = [
  {
    self: false,
    message: 'Test',
  },
  {
    self: true,
    message: 'Heheaw awddawdawda awdawdwa awdawdwadaw awdwa',
  },
  {
    self: false,
    message: 'Test',
  },
  {
    self: true,
    message: 'Hehe',
  },
  {
    self: true,
    message: 'Heheaw awddawdawda awdawdwa awdawdwadaw awdwa',
  },
  {
    self: false,
    message: 'Test',
  },
  {
    self: true,
    message: 'Hehe',
  },
];

export default class LihatPesan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: mockData,
      mesage: '',
    };

    this.userId = props.navigation.getParam('id');
  }

  sendMessage() {
    this.setState({message: ''});
  }

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
        <Text style={styles.messageTime}>12 Agustus 2019 14.10</Text>
        <View style={msgBoxStyle}>
          <Text style={textStyle}>{item.message}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Pesan" backButton />
        <FlatList
          data={this.state.messages}
          renderItem={this.renderMessageItem}
          keyExtractor={(item, index) => `item-${index}`}
          style={styles.messages}
          contentContainerStyle={styles.messagesContent}
          inverted={true}
        />
        <View style={styles.actions}>
          <TextInput
            style={styles.inputMessage}
            placeholder="Kirim pesan.."
            value={this.state.message}
            onChangeText={message => this.setState({message})}
          />
          <TouchableOpacity
            style={styles.actionItem}
            onPress={this.sendMessage.bind(this)}>
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
});
