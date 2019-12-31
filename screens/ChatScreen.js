import React from 'react';
import {
  Image,
  Platform,
  Dimensions,
  ScrollView,
  StyleSheet,
  Button,
  PixelRatio,
  Alert,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import SocketIOClient from 'socket.io-client';
import AuthService from '../auth/AuthService';
import CustomActions from '../components/CustomActionsChat';

import {NavigationEvents} from 'react-navigation';
const Auth = new AuthService();

export default class ChatScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('title', '...'),
      headerRight: (
        <TouchableOpacity
          // style={styles.msgButtonContainer}
          // style={{backgroundColor:'red'}}
          onPress={() => navigation.navigate('Profile', {
            user: navigation.getParam('messageTo', '') //this.state.messageTo,
          })}>
    
          <Image
            source={{
              uri: navigation.getParam(
                'chatToImage',
                'https://pbs.twimg.com/media/EFlyo-6XoAA2ju8?format=jpg&name=240x240',
              ), //`https://api.narutoccg.com/${this.state.selfPicture}`,
            }}
            style={{ 
              flex: 1, 
              width: 40,
              height: 40,
              padding:5,
              resizeMode: 'contain'
            }} 
          />
        </TouchableOpacity>
      ),
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      card: '',
      selfPicture: '',
    };

    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);

    this.socket = SocketIOClient('https://api.narutoccg.com');
    // this.socket = SocketIOClient('http://192.168.0.104:8080');
    this.socket.on('message', this.onReceivedMessage);
  }

  async componentDidMount() {
    let user = await Auth.getProfile();
    let token = await Auth.getToken();
    // console.log("USER: ", user);
    const {navigation} = this.props;
    const _chat = navigation.getParam('chat_id');
    // let card_url = navigation.getParam('card_url');
    this.setState(
      {
        self: user._id,
        selfUsername: user.username,
        selfPicture: user.profilePic,
        token: token,
        chat_id: _chat,
      },
      () => {
        this.getChat(_chat);
      },
    );
    this.focusListener = navigation.addListener('didFocus', () => {
      // The screen is focused
      // Call any action
      this.sendCardImage();
    });
  }
  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }
  onReceivedMessage(_messages) {
    // Created connections. need to finish send message connection.
    // after message connection then you need to test if it works and see
    // what is received.
    // console.log('ON RECEIVED MESSAGES', _messages);
    _messages.conversation.sort((a, b) => {
      // figure out the timing. this still hasn't been resolved.
      return a.createdOn > b.createdOn ? -1 : a.createdOn < b.createdOn ? 1 : 0;
      // return b.createdOn - a.createdOn;
    });
    _messages.conversation.forEach(message => {
      Object.defineProperty(
        message,
        'text',
        Object.getOwnPropertyDescriptor(message, 'message'),
      );
      delete message.message;
      Object.defineProperty(
        message,
        'createdAt',
        Object.getOwnPropertyDescriptor(message, 'createdOn'),
      );
      message.createdAt = new Date(String(message.createdAt));
      delete message.createdOn;
      if (message.attachment) {
        message.image = message.attachment.object_id;
      }
      message.user.name = message.user.userName;
      message.user.avatar =
        'https://api.narutoccg.com/' + message.user.picture;
    });
    this.setState({messages: _messages.conversation});
    this.socket.emit(
      'read',
      this.state.self,
      this.state.chat_id,
      this.state.messageTo,
    );
    // this._storeMessages(messages);
  }
  _storeMessages(messages) {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }
  async sendMessage(message) {
    this.socket.emit(
      'message',
      message,
      this.state.chat_id,
      this.state.messageTo,
    );
  }
  sendCardImage() {
    const {navigation} = this.props;
    let card_url = navigation.getParam('card_url');
    this.setState(
      {
        card: card_url,
      },
      () => {
        if (
          this.state.card !== '' &&
          this.state.card !== null &&
          this.state.card !== undefined
        ) {
          // console.log('IMAGE RAN', this.state.card);
          let _message = {};
          let _user = {};
          _user._id = this.state.self;
          _user.name = this.state.selfUsername;
          _user.avatar = `https://api.narutoccg.com/${
            this.state.selfPicture
          }`;
          _message._id = 'ax1' + Math.random();
          _message.createdAt = new Date();
          _message.text = '';
          _message.user = _user;
          _message.image = this.state.card;
          _message.attachmentType = 'Card';
          let mssgArr = [_message];
          this.onSend(mssgArr);
        }
      },
    );
  }
  getChat(_id) {
    Auth.fetch(`https://api.narutoccg.com/api/v1.1/chat/${_id}`, {
    // Auth.fetch(`http://192.168.0.104:3000/api/v1.1/chat/${_id}`, {
      mode: 'cors',
      method: 'GET',
    })
      .then(res => {
        // console.log("response: ", res);

        /**
         * 
         * SEE IF YOU CAN PLACE OTHER PICTURE ON CHAT OBJECT
         */
        this.props.navigation.setParams({messageTo: res.chatTo._id});
        this.props.navigation.setParams({chatToImage: `https://api.narutoccg.com/${res.chatTo.picture}`});
        this.props.navigation.setParams({title: res.chatTo.userName});
        res.conversation.sort((a, b) => {
          // figure out the timing. this still hasn't been resolved.
          return a.createdOn > b.createdOn
            ? -1
            : a.createdOn < b.createdOn
            ? 1
            : 0;
          // return b.createdOn - a.createdOn;
        });
        res.conversation.forEach(message => {
          Object.defineProperty(
            message,
            'text',
            Object.getOwnPropertyDescriptor(message, 'message'),
          );
          delete message.message;
          Object.defineProperty(
            message,
            'createdAt',
            Object.getOwnPropertyDescriptor(message, 'createdOn'),
          );
          message.createdAt = new Date(String(message.createdAt));
          delete message.createdOn;
          if (message.attachment) {
            message.image = message.attachment.object_id;
          }
          message.user.name = message.user.userName;
          message.user.avatar =
            'https://api.narutoccg.com/' + message.user.picture;
        });
        this.setState(
          {
            chat: res,
            messageTo: res.chatTo._id,
            messages: res.conversation,
          },
          () => {
            // console.log('PAGE LOAD STATE', this.state);
            this.socket.emit(
              'userJoined',
              this.state.self,
              this.state.chat_id,
              this.state.messageTo,
            );
          },
        );
      })
      .catch(err => {
        console.log(err);
      });
  }

  onSend(messages = []) {
    this.sendMessage(messages[0]);
    this._storeMessages(messages);
  }

  toProfile() {
    this.props.navigation.navigate('Profile', {
      user: this.state.messageTo,
    });
  }
  renderCustomActions(props) {
    return <CustomActions {...props} />;
  }
  render() {
    let nav = this.props.navigation;
    nav.chat_id = this.state.chat_id;
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        onPressAvatar={() => this.toProfile()}
        user={{
          _id: this.state.self,
        }}
        renderActions={() => this.renderCustomActions(nav)}
      />
    );
  }
}
