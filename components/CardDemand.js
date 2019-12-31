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

import AuthService from '../auth/AuthService';

const { width, height } = Dimensions.get('window');

// Use iPhone6 as base size which is 375 x 667
const baseWidth = 375;
const baseHeight = 667;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

export const scaledSize =
    (size) => Math.ceil((size * scale));

const resWidth = widthPercent => {
  const screenWidth = Dimensions.get('window').width;
  // Convert string input to decimal number
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
};
const resHeight = heightPercent => {
  const screenHeight = Dimensions.get('window').height;
  // Convert string input to decimal number
  const elemHeight = parseFloat(heightPercent);
return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
};

const Auth = new AuthService();
export default class CardDemand extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          
      }
  }
  //
  //  TO DO: CONNECT THIS COMPONENT TO CARD SCREEN, STYLE APPROPRIATELY
  //
  
  // toMessage() {
  //   this.props.navigation.navigate('MessageUser', {
  //     card: this.props.card,
  //     userMessaged: this.props.user_id,
  //   });
  // }
  toMessage() {
    // Auth.fetch('http://192.168.0.106:3000/api/v1.1/chat/', {
    Auth.fetch('https://api.narutoccg.com/api/v1.1/chat/', {
      mode: 'cors',
      method: 'GET',
    })
      .then(res => {
        // figure this out. it looks sloppy
        // if a chat already started, take them to that chat
        // else then take them to create a new chat.
        let hasChat = false;
        let chatID;
        res.forEach(chat => {
          // console.log("CHAT ITERATE....", chat);
          if (String(this.props.user_id) == String(chat.chatTo._id)) {
            hasChat = true;
            chatID = chat._id;
          }
        });
        if (hasChat) {
          this.props.navigation.navigate('Chat', {
            chat_id: chatID,
            card_url: `https://api.narutoccg.com/${this.props.card.image}`,
          });
          // console.log("THIS USER HAS CHAT");
        } else {
          this.props.navigation.navigate('StartChat', {
            messageTo: this.props.user_id,
            card_url: `https://api.narutoccg.com/${this.props.card.image}`,
          });
          // console.log("THIS USER DOES NOT HAVE CHAT");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  toProfile() {
    this.props.navigation.navigate('Profile', {
      user: this.props.user_id,
    });
  }
  render() { 
    
    return (
        <View style={styles.containerRow}>
          <TouchableOpacity onPress={() => this.toProfile()} style={styles.profileImage}>
            <Image
            source={{uri: `https://api.narutoccg.com/${this.props.profilePic}`}}
            style={styles.image}
            />
            <Text numberOfLines={1} style={styles.userInfo}>{this.props.username}</Text>
          </TouchableOpacity>
          <View style={styles.contentContainer}>
            <View style={styles.dataContainer}>
              <Text style={styles.demandFont}>{this.props.action + " " + this.props.amount}</Text>
              <Text style={styles.demandFont}>Values the card at ${Number(this.props.value).toFixed(2)}</Text>
            </View>
            <View style={styles.contactContainer}>
              {
                this.props.forSale ? 
                <TouchableOpacity onPress={() => this.toMessage()} style={styles.contactButton}>
                  <Text style={styles.contactFont}>Message</Text>
                </TouchableOpacity> :
                <View></View>
              }
              
            </View>
            
          </View>
        </View>
    );
  }
}
let containerRowHeight = resHeight('12%');
let containerContactHeight = resHeight('3%');
let contactFontSize = 16;
let marginRow = 5;
let demandFont = scaledSize(16);
if (PixelRatio.get() >= 2 &&  Dimensions.get('window').height > 736) {
  containerRowHeight = resHeight('10%');
}
if (Dimensions.get('window').width > 800) {
  containerRowHeight = resHeight('10%');
  marginRow = '15%';
  contactFontSize = 26;
}

if (PixelRatio.get() == 2 && Dimensions.get('window').width < 325) {
  demandFont = 13;
  contactFontSize = 12;
}
if (Platform.OS == 'android') {
  
  if(Dimensions.get('window').height < 641) {
    demandFont = 14;
  contactFontSize = 13
  }
  // Galaxy S10
  if(Dimensions.get('window').height > 1000) {
    demandFont = 18;
    contactFontSize = 19
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'column',
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    height: containerRowHeight,
    paddingLeft:10,
    paddingRight: 10,
    paddingBottom: 5,
    marginLeft: marginRow,
    marginRight: marginRow,
    shadowColor: '#0000009c', 
    elevation: 1, 
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2, 
    marginBottom:20,
},
  profileImage: {
      flex: 1/4,
      flexDirection: 'column', 
      justifyContent: 'center',
      textAlign: 'center',
      // backgroundColor: 'white',
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      paddingTop: 2
  },
  contentContainer: {
      flex: 3/4,
      flexDirection: 'row',
  },
  image: {
    flex: 1, 
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  userInfo: {
    fontSize: 16,
    paddingLeft: 20,
    fontWeight: "500" 
  },
  demandFont: {
    fontSize: demandFont,
    fontWeight: "400",
  },
  dataContainer: {
    flex: 2/3,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white', 
    paddingTop: 15,
  },
  contactContainer: {
    flex: 1/3,
    flexDirection: 'column',
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'white'
  },
  contactButton: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'transparent',
    flex: 1/2,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#2f95dc'
  },
  contactFont: {
    fontSize: contactFontSize,
    fontWeight: "500",
    color: 'white',
    textAlign: 'center'
  }
});
