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
import UserProfile from './UserProfile';
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
export default class UserMap extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          
      }
      
  }
  componentDidMount() {
    
  }
  render() { 
    return (
        <View style={styles.containerRow}>
          {this.props.userRow.map((user, index) => (
            <UserProfile
              key={`${user.user}-${index}` }
              _id={user.user}
              picture={user.picture}
              navigation={this.props.navigation}
              username={user.userName}
            />
          ))}
        </View>
        
        
    );
  }
}
let rowHeight = 95;
if (Dimensions.get('window').width > 800) {
  rowHeight = 150;
}
const paddingRowRight = resWidth('1%');
const paddingRowLeft = resWidth('-1%');
const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'column',
  },
  containerRow: {
    flex: 1/5,
    height: rowHeight,
    // height: 110,
    flexDirection: 'row',
    marginRight: paddingRowRight,
    marginLeft: paddingRowLeft
},
});
