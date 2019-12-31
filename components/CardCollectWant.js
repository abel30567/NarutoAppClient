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
import FastImage from 'react-native-fast-image';

const Auth = new AuthService();

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

export default class CardCollectWant extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          
      }
      
  }
  toCardView() {
    if (this.props.searchType == 'other') {

      Auth.fetch(`https://api.narutoccg.com/api/v1/posts/${this.props._id}`, {
        mode: 'cors',
        method: 'GET'
    })
      .then(res => {
          this.props.navigation.navigate('OtherCard', {
              card: res,
              cardView: this.props.cardView,
              deckId: this.props.deckId,
              chatId: this.props.chatId,
              searchType: this.props.searchType,
          });
      })
      .catch(err => {
          console.log(err);
      });
    } else {
      Auth.fetch(`https://api.narutoccg.com/api/v1/posts/${this.props._id}`, {
        mode: 'cors',
        method: 'GET'
    })
      .then(res => {
          this.props.navigation.navigate('Card', {
              card: res,
              cardView: this.props.cardView,
              deckId: this.props.deckId,
              chatId: this.props.chatId,
              searchType: this.props.searchType,
          });
      })
      .catch(err => {
          console.log(err);
      });
    }    
  }
  render() { 
    
    return (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.toCardView()} style={{ flex: 1 }}>
            <FastImage 
                // resizeMethod="resize"
                source={{
                  uri: `https://api.narutoccg.com/${this.props.image}`,
                  priority: FastImage.priority.high
                }}
                style={{ 
                    flex: 1,
                    aspectRatio: 5/7,
                    borderWidth: 1,
                    borderColor: 'transparent',
                    borderRadius: 5, 
                    backgroundColor: 'lightgrey',
                    
                    }} 
                onLoadEnd={() => this.props.handleLoad()}
                  
                // defaultSource={require('../assets/images/loading.gif')}
            />
            {/* <Image 
                resizeMethod="resize"
                source={{
                  uri: `https://api.narutoccg.com/${this.props.image}`
                }}
                style={{ 
                    flex: 1,
                    aspectRatio: 5/7,
                    borderWidth: 1,
                    borderColor: 'transparent',
                    borderRadius: 5, 
                    backgroundColor: 'lightgrey',
                    
                    }} 
                  
                // defaultSource={require('../assets/images/loading.gif')}
            /> */}
          </TouchableOpacity>
        </View>
        
        
    );
  }
}
// Pixel Ratio = 2 iphone 6s
let collectCardView = resHeight('25%');
const verticalMarginCardView = resHeight('0.4%');
const horizontalMarginCardView = resHeight('1%');
if (PixelRatio.get() == 2 && Dimensions.get('window').width > 800) {
  collectCardView = resHeight('34%');
}
// PixelRatio 3
if (PixelRatio.get() >= 2 &&  Dimensions.get('window').height > 736 && Dimensions.get('window').width < 800) {
  collectCardView = resHeight('20.5%');
}

if (Platform.OS == 'android') {
  collectCardView = resHeight('27%');
  if(Dimensions.get('window').height < 641) {
    collectCardView = resHeight('25%'); 
  }
  // Galaxy S10
  if(Dimensions.get('window').height > 1000) {
    collectCardView = resHeight('21%'); 
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1/3,
      height: collectCardView,
      flexDirection: 'row',
      justifyContent: 'center',
      marginRight: horizontalMarginCardView,
      marginLeft: horizontalMarginCardView,
      marginTop: verticalMarginCardView,
      marginBottom: verticalMarginCardView
  },
  
});
