import React from 'react';
import {
  Image,
  Platform,
  Dimensions,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { NavigationEvents } from 'react-navigation';

import DeckView from '../components/DeckView';

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

export default class DecksScreen extends React.Component {
  static navigationOptions = {
    title: 'Decks',
  };
  constructor(props) {
    super(props);
    this.state = { 
        decks: []
    };
  }
  componentDidMount() {
    
  }
  getDecks() {
    Auth.fetch('https://api.narutoccg.com/api/v1/decks', {
      mode: 'cors',
      method: 'GET'
    })
      .then(res => {
        this.setState({ decks: res });
      })
      .catch(err => {
        console.log(err);
      })
  }
  createDeck() {
    this.props.navigation.navigate('CreateDeck', {
      card: {
        image: 'uploads/2019-02-25T04:59:56.476Z UNS3N-1685.jpg'
      },
      mode: 'create'
    });
  }
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column'}}>
        <NavigationEvents
          onWillFocus={() => this.getDecks()}
          onDidFocus={() => this.getDecks()} // componentDidMount
        />
        <ScrollView contentContainerStyle={styles.container}>
          {this.state.decks.map(deck => (
            <DeckView
              key={deck._id}
              _id={deck._id}
              user={deck.user}
              cards={deck.deck}
              image={deck.image}
              title={deck.name}
              navigation={this.props.navigation}
            />
          ))}
          <View style={styles.addToContainer}>
            <TouchableOpacity onPress={() => this.createDeck()} style={styles.addToButton}>
              <Ionicons 
                name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
                size={26} 
                style={{marginBottom: -2, marginRight: 5 }}
                color='white'
              />
              <Text style={styles.innerAdd}>Create New Deck</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
let addToContainerHeight = resHeight('7%');
if (PixelRatio.get() >= 2 && Dimensions.get('window').height > 736) {
  addToContainerHeight = resHeight('5.5%');
}
if (PixelRatio.get() == 2 && Dimensions.get('window').width < 325) {

  addToContainerHeight = resHeight('8%');
}

if (Platform.OS == 'android') {
  
  if(Dimensions.get('window').height < 641) {
    
  }
  // Galaxy S10
  if(Dimensions.get('window').height > 1000) {
    addToContainerHeight = resHeight('5.5%');
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  addToContainer: {
    height: addToContainerHeight,
    // flex: 1/10,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  addToButton: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#21ce99',
    shadowColor: '#0000009c', 
    elevation: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2, 
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  innerAdd: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
