import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    TouchableWithoutFeedback,
    View,
  } from 'react-native';
  import FastImage from 'react-native-fast-image';
import { StackActions } from 'react-navigation';

import AuthService from '../auth/AuthService';

const Auth = new AuthService();
export default class CardCollectWant extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          
      }
      
  }
  componentDidMount() {
    
  }

  // Choose this card
  async choosePicture() {
    const token = await Auth.getToken();
    let details = {
    'image': this.props.image,
    }
    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch('https://api.narutoccg.com/api/v1/users/picture', {
    method: 'PATCH',
    mode: 'cors',
    headers: {
        'Authorization': token,
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formBody
    }).then((response) => response.json())
    .then((responseData) => {
        this.props.navigation.dispatch(StackActions.popToTop());
    })
  }
  render() { 
    return (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.choosePicture()} style={{ flex: 1, alignItems: 'center' }}>
            <Image 
                source={{uri: `https://api.narutoccg.com/${this.props.image}`}}
                style={{ 
                    flex: 1,
                    aspectRatio: 1/1,
                    borderWidth: 1,
                    borderColor: 'transparent',
                    borderRadius: 10, 
                    }} 
            />
          </TouchableOpacity>
        </View>
        
        
    );
  }
}
let imageChoiceHeight = 80;
if (Platform.OS == 'android') {
  
  if(Dimensions.get('window').height < 641) {
    
  }
  // Galaxy S10
  if(Dimensions.get('window').height > 1000) {
    imageChoiceHeight = 120;
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1/3,
      height: imageChoiceHeight,
      flexDirection: 'row',
      justifyContent: 'center',
      marginRight: 5,
      marginLeft: 5,
      marginTop: 10
  },
  
});
