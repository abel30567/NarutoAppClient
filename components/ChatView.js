import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    PixelRatio,
    TouchableWithoutFeedback,
    View,
  } from 'react-native';
  import { NavigationEvents } from 'react-navigation';

import AuthService from '../auth/AuthService';

const Auth = new AuthService();
export default class ChatView extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          
      }
      
  }
  componentDidMount() {
    
  }
  toTheChat() {
      this.props.navigation.navigate('Chat', {
          chat_id: this.props._id
      })
  }
  
  timeSince(timeStamp) {
    var now = new Date(),
      secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
    if(secondsPast < 60){
      return parseInt(secondsPast) + 's';
    }
    if(secondsPast < 3600){
      return parseInt(secondsPast/60) + 'm';
    }
    if(secondsPast <= 86400){
      return parseInt(secondsPast/3600) + 'h';
    }
    if(secondsPast > 86400){
        day = timeStamp.getDate();
        month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ","");
        year = timeStamp.getFullYear() == now.getFullYear() ? "" :  " "+timeStamp.getFullYear();
        return day + " " + month + year;
    }
  }
  render() { 

    let time = this.timeSince(new Date(String(this.props.timestamp)));
    
    return (
        <View style={styles.containerRow}>
          <TouchableOpacity onPress={() => this.toTheChat()} style={styles.containerTouch}>
            <View style={styles.imageContainer}>
              <Image 
                source={{uri: `https://api.narutoccg.com/${this.props.image}`}}
                style={{ 
                    flex: 1, 
                    width: null,
                    height: null,
                    resizeMode: 'contain'
                }} 
              />
            </View>
            <View style={styles.chatInfo}>
              <View style={styles.headingInfo}>
                <Text style={styles.headingText}>{this.props.username}</Text>
              </View>
              {
                this.props.unreadCount > 0 ? (<View style={styles.notificationInfo}>
                <View style={styles.notificationDot}></View>
                </View>) : (<View></View>)
              }
              

              <View style={styles.messageContent}>
                 {/* Message read */}
              <View style={styles.lastMessageContainer}> 
                <Text style={styles.lastMessage}> 
                    {this.props.firstMessage}
                </Text>
              </View>
              {/* Message sent on */}
              <View style={styles.timestampContainer}>
                  <Text style={styles.timestamp}>
                    {time}
                  </Text>
              </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        
        
    );
  }
}

let titleFont = 26;
if (PixelRatio.get() == 2 && Dimensions.get('window').width < 325) {
  titleFont = 20;
}

const styles = StyleSheet.create({
  containerTouch: {
      flex: 1,
      flexDirection: 'row',
  },
  containerRow: {
    flex: 1/20,
    flexDirection: 'row',
    // height: 150,
    backgroundColor: 'white',
    marginBottom: 10,
    marginRight: 5,
    marginLeft: 5,
    shadowColor: '#0000009c', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2, 
    elevation: 1,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 10,
  },
  imageContainer: {
    flex: 1/5,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  chatInfo: {
      flex: 4/5,
      padding: 10,
      flexDirection: 'column',
  },
  headingInfo: {
      // title/link container
    flex: 3/10,
    flexDirection: 'row',
    marginTop: 10,

  },
  headingText: {
    // font of title
    fontSize: titleFont,
    fontWeight: 'bold' 
  },
  notificationInfo: {
    flex: 2/10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20
  },
  notificationDot: {
    height: 15,
    width: 15,
    borderRadius:100,
    backgroundColor: '#2f95dc'
  },
  messageContent: {
    flex: 7/10,
    flexDirection: 'row',
    marginTop: 5,
    
  },    
  lastMessageContainer: {
      flex: 4/5,
      flexDirection: 'row'
  },
  timestampContainer: {
      flex: 1/5,
      flexDirection: 'column',
      justifyContent: 'center',
      
  },
  timestamp: {
    fontSize: 13,
    color: 'gray',
    fontWeight: "400",
    textAlign:'center'
  },
  lastMessage: {
    fontSize: 16,
    color: 'gray'
  },    
  specificInfo: {
    // container of deck specifics
    flex: 1/10,
    flexDirection: 'row'
  },
  deckText: {
    // font of deck specifics
    fontSize: 17,

  },
  linkInfo: {
    // title/link container
  flex: 2/10,
  flexDirection: 'row',
  justifyContent: 'flex-end',
  marginTop: 10,

},
  linkDeck: {
    // link to decklist font
    fontSize: 20,
    color: '#21ce99',
  },
  userCredit: {
    flex: 2/5,
    flexDirection: 'column',
    height: 75,
    width: 75,
    justifyContent: 'center'
  },
  username: {
    fontSize: 15,
    fontWeight: "500",
    // marginLeft: 20,
    textAlign: 'center'
  }
});
