import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Dimensions,
    PixelRatio,
    View,
  } from 'react-native';

import { StackActions } from 'react-navigation';

import Ionicons  from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';
import AuthService from '../auth/AuthService';

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

export default class AddToDeckScreen extends React.Component {
  
  // static navigationOptions = {
  //   title: this.state.title,
  // };
  constructor(props) {
      super(props);
      this.state = {
          card: '',
          buttonBackgroundColorOne: 'white',
          buttonBackgroundColorTwo: 'white',
          buttonBackgroundColorThree: 'white',
          fontColorOne: '#21ce99',
          fontColorTwo: '#21ce99',
          fontColorThree: '#21ce99',
          quantityChoice: '',
          value: ''
      }
      // this.oneQuantity = this.oneQuantity.bind(this);
      // this.twoQuantity = this.twoQuantity.bind(this);
      // this.threeQuantity = this.threeQuantity.bind(this);
  }
  componentDidMount() {
    // navigation
    // post request
      
      const { navigation } = this.props;
      const _card = navigation.getParam('card');
      const deck_id = navigation.getParam('deckId');
    this.setState({ card: _card, title: _card.name, deckId: deck_id });
  }
  oneQuantity() {
    this.setState({
      buttonBackgroundColorOne: '#21ce99',
      buttonBackgroundColorTwo: 'white',
      buttonBackgroundColorThree: 'white',
      fontColorOne: 'white',
      fontColorTwo: '#21ce99',
      fontColorThree: '#21ce99',
      quantityChoice: 1
    })
  }
  twoQuantity() {
    this.setState({
      buttonBackgroundColorOne: 'white',
      buttonBackgroundColorTwo: '#21ce99',
      buttonBackgroundColorThree: 'white',
      fontColorOne: '#21ce99',
      fontColorTwo: 'white',
      fontColorThree: '#21ce99',
      quantityChoice: 2
    })
  }
  threeQuantity() {
    this.setState({
      buttonBackgroundColorOne: 'white',
      buttonBackgroundColorTwo: 'white',
      buttonBackgroundColorThree: '#21ce99',
      fontColorOne: '#21ce99',
      fontColorTwo: '#21ce99',
      fontColorThree: 'white',
      quantityChoice: 3
    })
  }
  
  async addToDeck() {
    if (this.state.quantityChoice !== '') {
      const token = await Auth.getToken();
      let details = {
        'times': this.state.quantityChoice,
        'card' : this.state.card._id
      }
      let formBody = [];
      for (let property in details) {
          let encodedKey = encodeURIComponent(property);
          let encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      fetch(`https://api.narutoccg.com/api/v1/decks/${this.state.deckId}/add`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
      }).then((response) => response.json())
        .then((responseData) => {
          
          this.props.navigation.dispatch(StackActions.pop({
            n: 4,
            deck: this.state.deckId
          }));
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  render() { 
    return (
        <View style={{ flex: 1, flexDirection: 'column'}}>
        
            <ScrollView contentContainerStyle={styles.container}>
              
                <View style={styles.imageContainer}>
                  <Image
                    source={{uri: `https://api.narutoccg.com/${this.state.card.image}`}}
                    style={{ 
                      flex: 1,
                      aspectRatio: 5/7,
                      borderWidth: 1,
                      borderColor: 'transparent',
                      borderRadius: 5, 
                      }} 
                  />
                </View>
                <View style={styles.headingContainer}>
                  <Text style={styles.quantityHeading}>How Many Do You Want?</Text>
                </View>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => this.oneQuantity()} style={ {
                      flex: 1/3,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      padding: 10,
                      borderWidth: 1,
                      borderColor: 'transparent',
                      backgroundColor: this.state.buttonBackgroundColorOne,
                      shadowColor: '#0000009c', 
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.8,
                      elevation: 1,
                      shadowRadius: 2, 
                      borderRadius: 5,
                      marginLeft: 5,
                      marginRight: 5,
                    }}>
                      <Text style={{
                        color: this.state.fontColorOne,
                        fontSize: 18,
                        marginTop: 1,
                        fontWeight: 'bold'
                      }}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.twoQuantity()} style={ {
                      flex: 1/3,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      padding: 10,
                      borderWidth: 1,
                      borderColor: 'transparent',
                      backgroundColor: this.state.buttonBackgroundColorTwo,
                      shadowColor: '#0000009c', 
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.8,
                      elevation: 1,
                      shadowRadius: 2, 
                      borderRadius: 5,
                      marginLeft: 5,
                      marginRight: 5,
                    }}>
                      <Text style={{
                        color: this.state.fontColorTwo,
                        fontSize: 18,
                        marginTop: 1,
                        fontWeight: 'bold'
                      }}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.threeQuantity()} style={ {
                      flex: 1/3,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      padding: 10,
                      borderWidth: 1,
                      borderColor: 'transparent',
                      backgroundColor: this.state.buttonBackgroundColorThree,
                      shadowColor: '#0000009c', 
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.8,
                      elevation: 1,
                      shadowRadius: 2, 
                      borderRadius: 5,
                      marginLeft: 5,
                      marginRight: 5,
                    }}>
                      <Text style={{
                        color: this.state.fontColorThree,
                        fontSize: 18,
                        marginTop: 1,
                        fontWeight: 'bold'
                      }}>3</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.submitContainer}>
                  <TouchableOpacity onPress={() => this.addToDeck()} style={styles.submitButton}>
                    <Ionicons 
                      name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
                      size={30} 
                      style={{marginBottom: -5, marginRight: 5 }}
                      color='white'
                    />
                    <Text style={styles.submitButtonText}>Add to Deck</Text>
                  </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
  }
}
let imageContainerHeight = resHeight('75%');
let headingContainerHeight = resHeight('6%');
let quantityContainerHeight = resHeight('9%');
let submitContainerHeight = resHeight('7%');

if (PixelRatio.get() >= 2 && Dimensions.get('window').height > 736) {
  imageContainerHeight = resHeight('62%');
  quantityContainerHeight = resHeight('8%');
}
// iphone 5s
if (PixelRatio.get() == 2 && Dimensions.get('window').width < 325) {
  headingContainerHeight = resHeight('8%');
  quantityContainerHeight = resHeight('11%');
  submitContainerHeight = resHeight('8.5%');
}
if (Platform.OS == 'android') {
  
  if(Dimensions.get('window').height < 641) {
    headingContainerHeight = resHeight('10%');
    quantityContainerHeight = resHeight('11%');
    submitContainerHeight = resHeight('8.5%');
  }
  if(Dimensions.get('window').height < 999) {
    imageContainerHeight = resHeight('80%');
    headingContainerHeight = resHeight('10%');
    quantityContainerHeight = resHeight('11%');
    submitContainerHeight = resHeight('8.5%');
  }
  // Galaxy S10
  if(Dimensions.get('window').height > 1000) {
    imageContainerHeight = resHeight('65%');
    headingContainerHeight = resHeight('5%');
    quantityContainerHeight = resHeight('7%');
    submitContainerHeight = resHeight('5%');
  }
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    paddingTop: 5,
    backgroundColor: '#fff',
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
    height: headingContainerHeight,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center'
  },
  quantityContainer: {
    flex: 1,
    height: quantityContainerHeight,
    flexDirection: 'row',
    padding: 10,
  },
  submitContainer: {
    flex: 1,
    height: 65,
    flexDirection: 'row',
    padding: 10,
    marginBottom: 50
  },
  quantityHeading: {
    fontSize: 25
  },  
  valueHeading: {
    fontSize: 22
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
    height: submitContainerHeight,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
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
    fontSize: 26
  }
});
