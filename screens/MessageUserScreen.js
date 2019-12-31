import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    PixelRatio,
    Dimensions,
    AsyncStorage,
    View,
  } from 'react-native';

import { StackActions } from 'react-navigation';

import Ionicons  from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';
import AuthService from '../auth/AuthService';

const Auth = new AuthService();
const resHeight = heightPercent => {
  const screenHeight = Dimensions.get('window').height;
  // Convert string input to decimal number
  const elemHeight = parseFloat(heightPercent);
return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
};



export default class MessageUserScreen extends React.Component {
  
  // static navigationOptions = {
  //   title: this.state.title,
  // };
  constructor(props) {
      super(props);
      this.state = {
          card: '',
          message: '',
          userMessaged: '',
          height: 60,
      }
  }
  componentDidMount() {
    // navigation
    // post request
      
      const { navigation } = this.props;
      const _card = navigation.getParam('card');
      const _userMessaged = navigation.getParam('userMessaged');
    this.setState({ card: _card, userMessaged: _userMessaged });
  }
  updateSize(height) {
    this.setState({
      height
    });
  }
  async sendMessage() {
    let mssgArr = this.state.message.split(" ");
    if (this.state.message !== '' || mssgArr.length > 2) {
      let token = await Auth.getToken();
      let user = await Auth.getProfile();
      // console.log(user._id);
      // console.log(token);
      // console.log(this.state.userMessaged);
      let details = {
        'message': this.state.message,
        'card' : this.state.card._id
      }
      let formBody = [];
      for (let property in details) {
          let encodedKey = encodeURIComponent(property);
          let encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      fetch(`https://api.narutoccg.com/api/v1/users/message/${this.state.userMessaged}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
      }).then((response) => response.json())
        .then((responseData) => {
          // console.log(responseData);
          this.props.navigation.dispatch(StackActions.pop({
            n: 4,
            // deck: this.state.deckId
          }));
          alert("If they are interested in your message they will email you back.");
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  render() {
    const {message, height} = this.state;
    
    let newStyle = {
      marginLeft: 10,
      borderRadius: 5,
      borderColor: 'black',
      flex: 5/6,
      borderWidth: 1,
      height: height + 15
    } 
    let messageInputContainer = {
      flex: 1,
      flexDirection: 'row',
      height: 50 + height,
      marginTop: 25,
      marginBottom: 20
    }
    let submitMessage = {
      flex: 1/6,
      flexDirection: 'column',
      justifyContent: 'center',
      marginRight: 10,
      marginLeft: 5,
      backgroundColor: '#2f95dc',
      height: 30,
      borderRadius: 5

    }
    return (
        <View style={{ flex: 1, flexDirection: 'column'}}>
            <ScrollView contentContainerStyle={styles.container}>
            <KeyboardAvoidingView behavior={'padding'} enabled={Platform.OS === 'ios' ? true : false} keyboardVerticalOffset={100}>
                <View style={styles.imageContainer}>
                <Image
                  source={{uri: `https://api.narutoccg.com/${this.state.card.image}`}}
                  style={{ 
                    flex: 1,
                    aspectRatio: 5/7,
                    borderWidth: 1,
                    borderColor: 'transparent',
                    backgroundColor: 'lightgrey',
                    borderRadius: 5, 
                    }} 
                />
                </View>
                <View style={[messageInputContainer]}>
                  {/* <TextInput
                    style={styles.messageInput}
                    multiline={true}
                    numberOfLines={6}
                    onChangeText={(message) => this.setState({message})}
                    value={this.state.message}
                    returnKeyType="default"
                    onFocus={() => this.setState({ message: ''})}
                  ></TextInput> */}
                  <TextInput
                    placeholder="Send a Message"
                    onChangeText={(message) => this.setState({message})}
                    style={[newStyle]}
                    editable={true}
                    multiline={true}
                    value={message}
                    onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
                  />
                  <TouchableOpacity onPress={() => this.sendMessage()} style={[submitMessage]}>
                    <Text style={styles.submitButtonText}>Send</Text>
                  </TouchableOpacity>
                </View>
                
                {/* <View style={styles.submitContainer}>
                  <TouchableOpacity onPress={() => this.sendMessage()} style={styles.submitButton}> */}
                    {/* <Ionicons 
                      name={Platform.OS === 'ios' ? 'ios-send' : 'md-send'}
                      size={26} 
                      style={{marginBottom: -5, marginRight: 5 }}
                      color='white'
                    /> */}
                    {/* <Text style={styles.submitButtonText}>Send Message</Text>
                  </TouchableOpacity>
                </View> */}
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
  }
}
let imageContainerHeight = resHeight('75%');




if (PixelRatio.get() >= 2 &&  Dimensions.get('window').height > 736) {
  imageContainerHeight = resHeight('62%');
}


if (Platform.OS == 'android') {
  imageContainerHeight = resHeight('80%');
  if(Dimensions.get('window').height < 641) {
    
  }
  // Galaxy S10
  if(Dimensions.get('window').height > 1000) {
    imageContainerHeight = resHeight('65%');
    
  }
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    paddingTop: 5,
    backgroundColor: '#fff',
  },
  messageInput: {
    marginTop: 25,
    marginLeft: 20,
    marginRight: 20,
    height: 100,
    flex: 1,
    fontSize: 23,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  imageContainer: {
    height: imageContainerHeight, 
    flexDirection: 'row',
    paddingLeft: 10, 
    paddingRight: 10, 
    backgroundColor: 'white'
  },
  headingContainer: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center'
  },
  quantityContainer: {
    flex: 1,
    height: 65,
    flexDirection: 'row',
    padding: 10,
  },
  submitContainer: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    padding: 10,
    marginBottom: 50
  },
  quantityHeading: {
    fontSize: 30
  },  
  valueHeading: {
    fontSize: 30
  },  
  valueContainer: {
    flex: 1/2,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  valueInput: {
    height: 40,
    width: 80,
    borderColor: '#a9a9a9', 
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 30
  },
  cashSymbol: {
    fontSize: 35,
    marginRight: 5,
    color: '#21ce99'
  },
  submitButton: {
    backgroundColor: '#21ce99',
    flex: 1,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    shadowColor: '#0000009c', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2, 
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent'
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400'
  }
});
