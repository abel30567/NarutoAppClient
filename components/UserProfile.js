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

export default class UserProfile extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          
      }
      
  }
  componentDidMount() {
    
  }
  toProfile() {
    
    // Change to user profile
    // Change settings button on profile
    // add to MainTabNavigator for profile route
    // style this correctly.
        this.props.navigation.navigate('Profile', {
            user: this.props._id,
        });
  }
  render() { 
    return (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.toProfile()} style={{ 
              flex: 1,
               }}>
            <FastImage 
                source={{
                  uri: `https://api.narutoccg.com/${this.props.picture}`,
                  priority: FastImage.priority.high,
              }}
                style={{ 
                    flex: 1,
                    aspectRatio: 1/1,
                    borderWidth: 1,
                    borderColor: 'transparent',
                    borderRadius: 5, 
                    // backgroundColor: 'gray'
                    }} 
                
            />
            <Text numberOfLines={1} style={styles.username}>{this.props.username}</Text>
          </TouchableOpacity>
        </View>
        
        
    );
  }
}
let collectCardView = resHeight('12.5%');
const verticalMarginCardView = resHeight('0.4%');
const horizontalMarginCardView = resHeight('1%');

if (PixelRatio.get() >= 2 &&  Dimensions.get('window').height > 736) {
  collectCardView = resHeight('10.5%');
}

if (Platform.OS == 'android') {
  // Alcatel
  if(Dimensions.get('window').height < 641) {
    
  }
  // Galaxy S10
  if(Dimensions.get('window').height > 1000) {
    collectCardView = resHeight('9.5%');
  }
}
// Platform.OS == 'android' ? collectCardView = resHeight('27%') : collectCardView;
const styles = StyleSheet.create({
  container: {
      flex: 1/5,
      height: collectCardView,
      flexDirection: 'row',
      justifyContent: 'center',
      marginRight: horizontalMarginCardView,
      marginLeft: horizontalMarginCardView,
      marginTop: verticalMarginCardView,
      marginBottom: verticalMarginCardView
  },
  username: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: 'center'
  }
});
