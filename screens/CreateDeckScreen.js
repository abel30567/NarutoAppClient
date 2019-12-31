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


import { NavigationEvents, StackActions } from 'react-navigation';

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

export default class CreateDeckScreen extends React.Component {
  
  // static navigationOptions = {
  //   title: this.state.title,
  // };
  constructor(props) {
      super(props);
      this.state = {
          card: 'uploads/2019-02-25T04:59:56.476Z UNS3N-1685.jpg',
          deckName: 'Rasengan Deck',
          mode: 'create'
      }
      
  }
  componentDidMount() {
    
    
  }
  
  init() {
      
      /**
       * Get the type of screen we will use. 
       * Since this screen is the same as create deck/edit deck
       * then we pass of a mode to this screen from the 
       * DeckScreen: Create
       * DeckListScreen: Edit
       */
        const { navigation } = this.props;
        const _card = navigation.getParam('card');
        const _mode = navigation.getParam('mode');
        const deckName = navigation.getParam('deckName');
        const deckImage = navigation.getParam('deckImage');
        const deckId = navigation.getParam('deckId');
        if (_mode == 'edit') {
          this.setState({ 
            mode: 'edit',
            deckName: deckName,
            card: _card.image,
            deckId: deckId
          }); 
        } 
        if (_mode == 'create') {
          this.setState({ card: _card.image }); 
        }
  }
  changeCard() {
      
      this.props.navigation.navigate('Search', {
        searchType: 'Create Deck',
      })
  }
  async createDeck() {
    const token = await Auth.getToken();
    let details = {
      'image' : this.state.card,
      'name' : this.state.deckName
    }
    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch('https://api.narutoccg.com/api/v1/decks/', {
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
          n: 1
        }));
      })
      .catch(err => {
        console.log(err);
      })
  }
  async editDeck() {
    const token = await Auth.getToken();
    let details = {
      'image' : this.state.card,
      'name' : this.state.deckName
    }
    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch(`https://api.narutoccg.com/api/v1/decks/${this.state.deckId}`, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formBody
    }).then((response) => response.json())
      .then((responseData) => {  
        this.props.navigation.dispatch(StackActions.pop({
          n: 1
        }));
      })
      .catch(err => {
        console.log(err);
      })
  }
  render() { 

    let submitBtn = (<TouchableOpacity onPress={() => this.createDeck()} style={styles.submitButton}>
    <Ionicons 
      name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
      size={23} 
      style={{marginBottom: -5, marginRight: 5 }}
      color='white'
    />
    <Text style={styles.submitButtonText}>Create Deck</Text>
  </TouchableOpacity>);

  let editBtn = (<TouchableOpacity onPress={() => this.editDeck()} style={styles.editButton}>
  <Ionicons 
    name={Platform.OS === 'ios' ? 'ios-create' : 'md-create'}
    size={23} 
    style={{marginBottom: -5, marginRight: 5 }}
    color='white'
  />
  <Text style={styles.submitButtonText}>Edit Deck</Text>
</TouchableOpacity>);
    return (
        <View style={{ flex: 1, flexDirection: 'column'}}>
        <NavigationEvents
          onWillFocus={() => this.init()}
          
        
        />
            <ScrollView contentContainerStyle={styles.container}> 
                <View style={styles.valueContainer}>
                  <Text style={styles.valueHeading}>Deck Name</Text>
                </View>
                <View style={styles.valueContainer}>
                  <TextInput
                    style={styles.valueInput}
                    onChangeText={(deckName) => this.setState({deckName})}
                    value={this.state.deckName}
                    returnKeyType="done"
                    onFocus={() => this.setState({ deckName: ''})}
                  ></TextInput>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.valueHeading}>Main Card</Text>
                </View>
                <View style={styles.imageContainer}>
                  <Image
                    source={{uri: `https://api.narutoccg.com/${this.state.card}`}}
                    style={{ 
                      flex: 1,
                      aspectRatio: 5/7,
                      borderWidth: 1,
                      borderColor: 'transparent',
                      borderRadius: 5, 
                      }} 
                  />
                </View>
                <View style={styles.buttonActionContainer}>
                    <TouchableOpacity onPress={() => this.changeCard()} style={styles.buttonActionDeck}>
                        <Ionicons 
                        name={Platform.OS === 'ios' ? 'ios-albums' : 'md-albums'}
                        size={20} 
                        style={{marginBottom: -5, marginRight: 5 }}
                        color='#21ce99'
                        />
                        <Text style={styles.innerButton}>Change Main Card</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.submitContainer}>
                  {this.state.mode == 'create' ? submitBtn : editBtn}
                </View>
            </ScrollView>
        </View>
    );
  }
}
let imageContainerHeight = resHeight('75%');
let headingContainerHeight = resHeight('6%');
let submitContainerHeight = resHeight('8%');
let cardContainerHeight = resHeight('10%');

if (PixelRatio.get() >= 2 && Dimensions.get('window').height > 736) {
  imageContainerHeight = resHeight('62%');
  headingContainerHeight = resHeight('4%');
  cardContainerHeight = resHeight('7.5%');
}
if (Platform.OS == 'android') {
  
  // if(Dimensions.get('window').height < 641) {
    
  // }
  // Galaxy S10
  if(Dimensions.get('window').height < 999) {
    imageContainerHeight = resHeight('80%');
    submitContainerHeight = resHeight('10%');
    cardContainerHeight = resHeight('10%');
  }
  if(Dimensions.get('window').height > 1000) {
    imageContainerHeight = resHeight('65%');
    submitContainerHeight = resHeight('6.5%');
    cardContainerHeight = resHeight('7%');
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
    // marginTop: 50,
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
  submitContainer: {
    flex: 1,
    height: submitContainerHeight,
    flexDirection: 'row',
    padding: 10,
    marginTop: 10,
    marginBottom: 50,
  },
  valueHeading: {
    fontSize: 24,
  },
  valueContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    marginBottom: 5,
  },
  valueInput: {
    height: headingContainerHeight,
    flex: 1,
    borderColor: '#a9a9a9', 
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 18,
    marginBottom: 25,
  },
  submitButton: {
    backgroundColor: '#21ce99',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 12,
    shadowColor: '#0000009c', 
    elevation: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2, 
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent'
  },
  submitButtonText: {
    color: 'white',
    fontSize: 19,
    fontWeight: '500',
  },
  buttonActionContainer: {
    flex: 1,
    height: cardContainerHeight,
    flexDirection: 'row',
    padding: 10,
    shadowColor: '#0000009c',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2, 
  },
  buttonActionDeck: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    borderWidth: 1,
    elevation: 1,
    borderColor: 'transparent',
    backgroundColor: 'white',
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  innerButton: {
    color: '#21ce99',
    fontSize: 18,
    marginTop: 1,
  },
  editButton: {
    backgroundColor: '#2f95dc',
    flex: 1,
    height: submitContainerHeight,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 12,
    shadowColor: '#0000009c', 
    elevation: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2, 
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent'
  },
});
