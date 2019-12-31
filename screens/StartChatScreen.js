import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import SocketIOClient from 'socket.io-client';
import AuthService from '../auth/AuthService';
import { StackActions } from 'react-navigation';

const Auth = new AuthService();

export default class StartChatScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          messages: [],
          image: '',
        };
      }

  async componentDidMount() {
      let user = await Auth.getProfile();
      let token = await Auth.getToken();
      const { navigation } = this.props;
      const _messageTo = navigation.getParam('messageTo');
      let cardUrl = navigation.getParam('card_url');
      if (cardUrl === '' || cardUrl === null || cardUrl === undefined) {
        cardUrl = '';
      }
    this.setState({
      self: user._id,
      token: token,
      messageTo: _messageTo,
      image: cardUrl,
    }); 
  }

  async sendMessage(message) {
    /**
     * Make the image be stored as card image attachment on backend
     * show card image on both screens.
     */
    if (this.state.messages.length === 0) {
      let details = {
        'message': message.text,
        'messageTo': String(this.state.messageTo),
        'image': this.state.image
      }
      let formBody = [];
      for (let property in details) {
          let encodedKey = encodeURIComponent(property);
          let encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      fetch('https://api.narutoccg.com/api/v1.1/chat/', {
      // fetch('http://192.168.0.106:3000/api/v1.1/chat/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Authorization': this.state.token,
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
      }).then((response) => response.json())
        .then((responseData) => {
        //   console.log(responseData);
        alert("Message Sent!");
        this.props.navigation.dispatch(StackActions.pop({
          n: 1,
        }));
        })
        .catch(err => {
          console.log(err)
        }) 
    }
  }
  _storeMessages(messages) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }


  onSend(messages = []) {
    this.sendMessage(messages[0]);
    this._storeMessages(messages);
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.state.self,
        }}
      />
    )
  }
}