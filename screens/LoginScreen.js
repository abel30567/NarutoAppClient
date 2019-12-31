/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  findNodeHandle,
  Dimensions,
  PixelRatio,
  Button,
  View,
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {StackActions} from 'react-navigation';

import AuthService from '../auth/AuthService';
import logo from '../assets/images/narutoLogo.jpeg';

const Auth = new AuthService();

const BiometryTypes = {
  TouchID: 'TouchID',
  FaceID: 'FaceID',
  Fingerprint: 'Fingerprint',
};
const resWidth = widthPercent => {
  const screenWidth = Dimensions.get('window').width;
  // Convert string input to decimal number
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};
const resHeight = heightPercent => {
  const screenHeight = Dimensions.get('window').height;
  // Convert string input to decimal number
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };
  constructor(props) {
    super(props);
    this.state = {
      email: 'alex@gmail.com',
      password: '',
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  initKeychain() {
    Keychain.getSupportedBiometryType().then(biometryType => {
      switch (biometryType) {
        case BiometryTypes.TouchID:
        // Touch ID is supported on iOS
        case BiometryTypes.FaceID:
        // Face ID is supported on iOS
        case BiometryTypes.Fingerprint:
        // Fingerprint is supported on Android
        default:
        /**
         * biometryType is null when no biomentrics authentication
         * is supported. Null is also returned if users have not
         * enabled/enrolled biometrics on their device.
         * */
      }
    });
  }
  async setCredentials(username, password) {
    try {
      await Keychain.setGenericPassword(username, password, {
        service: 'narutoccg',
      });
    } catch (error) {
      console.log('Could not set credentials due to ', error);
    }
  }
  async getCredentials() {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: 'narutoccg',
      });
      if (credentials) {
        // Credentials loaded
        // Username: credentials.username
        // Password: credentials.password
      } else {
        // No Credentials
        this.setCredentials();
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
  }
  async handleLogin() {
    let details = {
      email: this.state.email,
      password: this.state.password,
    };
    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    fetch('https://api.narutoccg.com/api/v1/users/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    })
      .then(response => response.json())
      .then(responseData => {
        // console.log(responseData);
        Auth.setToken(responseData.token);
        this.props.navigation.navigate('Main');
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <KeyboardAvoidingView
          behavior={'padding'}
          enabled={Platform.OS === 'ios' ? true : false}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                style={{
                  flex: 1,
                  width: null,
                  height: null,
                  resizeMode: 'contain',
                }}
                source={logo}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email:</Text>
              <TextInput
                style={styles.inputField}
                onChangeText={email => this.setState({email})}
                value={this.state.email}
                returnKeyType="done"
                onFocus={() => this.setState({email: ''})}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password:</Text>
              <TextInput
                style={styles.inputField}
                onChangeText={password => this.setState({password})}
                secureTextEntry={true}
                ref={textInputRef => {
                  this.textInputRef = textInputRef;
                }}
                placeholder="Enter Password"
                // keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
                returnKeyType="done"
              />
            </View>

            <View style={styles.helpContainer}>
              <TouchableOpacity
                onPress={this.handleLogin}
                style={styles.helpLink}>
                <Text style={styles.helpLinkText}>Login</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
const imageContainerHeight = resHeight('20%');
let inputContainerHeight = resHeight('10%');
let inputFieldHeight = resHeight('6%');
let submitButtonHeight = resHeight('7%');

if (PixelRatio.get() >= 2 && Dimensions.get('window').height > 736) {
  submitButtonHeight = resHeight('5%');
  inputFieldHeight = resHeight('5%');
  inputContainerHeight = resHeight('9%');
}

if (Platform.OS == 'android') {
  if (Dimensions.get('window').height < 641) {
    submitButtonHeight = resHeight('6.2%');
    inputContainerHeight = resHeight('8%');
  }
  if (Dimensions.get('window').height > 1000) {
    submitButtonHeight = resHeight('4.5%');
  }
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    // paddingTop: 15,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  helpContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 10,
    // flex: 1/10,
    height: submitButtonHeight,
    width: 90,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#2f95dc',
    backgroundColor: '#2f95dc',
  },
  helpLinkText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  inputLabel: {
    flex: 1 / 4,
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 5,
  },
  imageContainer: {
    flex: 1 / 3,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 15,
    height: imageContainerHeight,
  },
  inputField: {
    height: inputFieldHeight,
    borderColor: 'gray',
    borderRadius: 5,
    fontSize: 17,
    borderWidth: 1,
    flex: 1 / 2,
    textAlign: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    // marginTop: 10,
    justifyContent: 'space-evenly',
    height: inputContainerHeight,
  },
});
