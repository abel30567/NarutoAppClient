/* eslint-disable react-native/no-inline-styles */
/* eslint-disable handle-callback-err */
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  findNodeHandle,
  KeyboardAvoidingView,
  Dimensions,
  PixelRatio,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {StackActions} from 'react-navigation';

import AuthService from '../auth/AuthService';
import logo from '../assets/images/narutoLogo.jpeg';

const Auth = new AuthService();

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

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign Up',
  };
  constructor(props) {
    super(props);
    this.state = {
      name: 'Jane Doe',
      email: 'alex@gmail.com',
      location: 'Miami, FL',
      username: 'ajake1',
      password: '',
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleSignUp() {
    this.setState({
      nameError: '',
      emailError: '',
      locationError: '',
      usernameError: '',
      passwordError: '',
      countryError: '',
      ageError: '',
      termsError: '',
    });
    if (this.state.username !== 'ajake1') {
      Auth.signup(
        this.state.name,
        this.state.username,
        this.state.location,
        this.state.email,
        this.state.password,
      )
        .then(res => {
          this.props.navigation.navigate('Main');
        })
        .catch(err => {
          alert('Please set an appropriate password.');
        });
    }
  }
  handleLogin() {
    this.props.navigation.navigate('Login');
  }

  render() {
    // console.log(Dimensions.get('window').height);
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <KeyboardAvoidingView
          behavior={'padding'}
          enabled={Platform.OS === 'ios' ? true : false}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imageLogo}>
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
              <Text style={styles.inputLabel}>Location:</Text>
              <TextInput
                style={styles.inputField}
                onChangeText={location => this.setState({location})}
                onFocus={() => this.setState({location: ''})}
                returnKeyType="done"
                value={this.state.location}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Name:</Text>
              <TextInput
                style={styles.inputField}
                onChangeText={name => this.setState({name})}
                onFocus={() => this.setState({name: ''})}
                returnKeyType="done"
                value={this.state.name}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Username:</Text>
              <TextInput
                style={styles.inputField}
                onChangeText={username => this.setState({username})}
                onFocus={() => this.setState({username: ''})}
                returnKeyType="done"
                value={this.state.username}
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
                // keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
                returnKeyType="done"
                placeholder="Enter Password"
              />
            </View>
            <View style={styles.passwordWarnContainer}>
              <Text style={styles.passwordWarn}>
                Password must contain at least one capital letter, one number
                and longer than 8 characters
              </Text>
            </View>

            <View style={styles.helpContainer}>
              <TouchableOpacity
                onPress={this.handleSignUp}
                style={styles.helpLink}>
                <Text style={styles.helpLinkText}>Sign Up</Text>
              </TouchableOpacity>
              <Text>OR</Text>
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
let imageContainerHeight = resHeight('15%');
let inputContainerHeight = resHeight('10%');
let inputFieldHeight = resHeight('6%');
let submitButtonHeight = resHeight('7%');

if (PixelRatio.get() >= 2 && Dimensions.get('window').height > 736) {
  submitButtonHeight = resHeight('6%');
  inputFieldHeight = resHeight('5%');
  inputContainerHeight = resHeight('8%');
}
if (Platform.OS == 'android') {
  if (Dimensions.get('window').height < 641) {
    submitButtonHeight = resHeight('6.2%');
    imageContainerHeight = resHeight('15%');
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
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  helpContainer: {
    flex: 1 / 2,
    alignItems: 'center',
    flexDirection: 'column',
    height: 200,
  },
  helpLink: {
    paddingVertical: 10,
    flex: 1 / 6,
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
  imageLogo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: imageContainerHeight,
    marginBottom: 5,
  },
  inputContainer: {
    flex: 1 / 6,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: inputContainerHeight,
  },
  inputLabel: {flex: 1 / 4, fontWeight: 'bold', marginTop: 5},
  inputField: {
    height: inputFieldHeight,
    fontSize: 17,
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    flex: 1 / 2,
    textAlign: 'center',
  },
  passwordWarnContainer: {
    flex: 1 / 10,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  passwordWarn: {
    fontSize: 12,
    color: 'red',
  },
});
