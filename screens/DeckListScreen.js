import React from 'react';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  Dimensions,
  PixelRatio,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { NavigationEvents } from 'react-navigation';

import MapCollectWant from '../components/MapCollectWant';
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

export default class DeckListScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'Collection',
  // };
  constructor(props) {
    super(props);
    this.state = { 
      deckName: '',
      deckImage: '',
      ninjaCards: [],
      missionCards: [],
      jutsuCards: [],
      clientCards: [],
      extraDeck: [],
      owner: '',
      ninjaCount: ' ',
      missionCount: ' ',
      jutsuCount: ' ',
      clientCount: ' ',
      extraCount: ' '
    };
  }
  componentDidMount() {
    // const { navigation } = this.props;
    // const deckId = navigation.getParam('deck');
    // this.setState({ _id: deckId})
    // this.getDeck(deckId)
  }
  init() {
    const { navigation } = this.props;
    const deckId = navigation.getParam('deck');
    this.setState({ _id: deckId})
    this.getDeck(deckId)
  }
  async getUser() {
    let user =  await Auth.getProfile();
    let _id = user._id;
    this.setState({ user: _id });
  }
  get2dArray(arr) {
    let collection = [];
    let temp = [];
    let collectionEnd = arr.length;
    let remainder = collectionEnd % 3;
    arr.map(card => {
      temp.push(card);
      if (temp.length === 3) {
        collection.push(temp);
        temp = [];
      }
    });
    if (remainder === 2) {
      collection.push([arr[collectionEnd - 2], arr[collectionEnd - 1]]);
    }
    if (remainder === 1) {
      collection.push([arr[collectionEnd - 1]]);
    }
    return collection;
  }
  getDeck(_id) {
    Auth.fetch(`https://api.narutoccg.com/api/v1/decks/${_id}`, {
      mode: 'cors',
      method: 'GET'
    })
      .then(res => {
        let deck = res.deck.sort((a, b) => {
          return a.entranceCost - b.entranceCost
        });
        let ninjas = [];
        let missions = [];
        let jutsus = [];
        let clients = []
        let extra = [];
        deck.map(card => {
          if (card.cardType === "Ninja") {
            if (card.characteristic.includes("REINFORCEMENT") || card.characteristic.includes("SQUAD") || card.characteristic.includes("Squad") || card.characteristic.includes("Reinforcement")) {
                extra.push(card);
            }
            else {
                ninjas.push(card)
            }
          }
          if (card.cardType === "Jutsu") {
              jutsus.push(card)
          }
          if (card.cardType === "Mission") {
              missions.push(card)
          }
          if (card.cardType === "Client") {
            clients.push(card)
        }
        });
        let ninjaState = this.get2dArray(ninjas);
        let missionState = this.get2dArray(missions);
        let jutsuState = this.get2dArray(jutsus);
        let clientState = this.get2dArray(clients)
        let extraState = this.get2dArray(extra);
        this.setState({ 
          deckName: res.name,
          deckImage: res.image,
          ninjaCards: ninjaState,
          owner: res.user,
          missionCards: missionState,
          jutsuCards: jutsuState,
          clientCards: clientState,
          extraDeck: extraState,
          deckName: res.name,
          ninjaCount: ninjas.length,
          missionCount: missions.length,
          jutsuCount: jutsus.length,
          clientCount: clients.length,
          extraCount: extra.length
        }, () => this.getUser());
      })
      .catch(err => {
        console.log(err);
      })
  }
  addToDeck() {
    this.props.navigation.navigate('Search', {
      searchType: 'Deck Edit',
      deckId: this.state._id
    });
  }
  editDeck() {
    this.props.navigation.navigate('CreateDeck', {
      mode: 'edit',
      deckName: this.state.deckName,
      card: {
        image: this.state.deckImage
      },
      deckId: this.state._id
    });
  }
  confirmDelete() {
    Alert.alert(
      `Delete ${this.state.deckName}`,
      'Are you sure?',
      [
        {text: 'Delete', onPress: () => this.deleteDeck()},
        {
          text: 'Cancel',
          style: 'cancel',
        }
      ],
      {cancelable: true},
    );
  }
  deleteDeck() {
    Auth.fetch(`https://api.narutoccg.com/api/v1/decks/${this.state._id}`, {
      mode: 'cors',
      method: 'DELETE'
    })
      .then(res => {
        this.props.navigation.navigate('Decks');
      })
      .catch(err => {
        alert('Please try again.')
      })
  }
  emptyFunction() {
    // Required for image on load to handle a Parent component event 
   }
  render() {
    let clientRender = this.state.clientCards.map((cardSet, index) => (
      <MapCollectWant
        key={`client-${index}`}
        handleLoad={() => this.emptyFunction()}
        cardRow={cardSet}
        navigation={this.props.navigation}
        cardView={String(this.state.owner) === String(this.state.user) ? 'Deck Edit' : 'Guest View'}
        deckId={this.state._id}
      />
    ));
    let addClient = (<View style={styles.addToContainer}>
      <TouchableOpacity onPress={() => this.addToDeck()}  style={styles.addToButton}>
        <Ionicons 
          name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
          size={21} 
          style={{marginBottom: -2, marginRight: 5 }}
          color='white'
        />
        <Text style={styles.innerAdd}>Add Clients</Text>
      </TouchableOpacity>
    </View>); 

    let ninjaRender = this.state.ninjaCards.map((cardSet, index) => (
      <MapCollectWant
        key={`ninja-${index}`}
        cardRow={cardSet}
        handleLoad={() => this.emptyFunction()}
        navigation={this.props.navigation}
        cardView={String(this.state.owner) === String(this.state.user) ? 'Deck Edit' : 'Guest View'}
        deckId={this.state._id}
      />
    ));
    let addNinja = (<View style={styles.addToContainer}>
      <TouchableOpacity onPress={() => this.addToDeck()}  style={styles.addToButton}>
        <Ionicons 
          name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
          size={21} 
          style={{marginBottom: -2, marginRight: 5 }}
          color='white'
        />
        <Text style={styles.innerAdd}>Add Ninjas</Text>
      </TouchableOpacity>
    </View>); 


    let missionRender = this.state.missionCards.map((cardSet, index) => (
      <MapCollectWant
        key={`mission-${index}`}
        cardRow={cardSet}
        handleLoad={() => this.emptyFunction()}
        navigation={this.props.navigation}
        cardView={String(this.state.owner) === String(this.state.user) ? 'Deck Edit' : 'Guest View'}
        deckId={this.state._id}
      />
    ));
    let addMission = (<View style={styles.addToContainer}>
      <TouchableOpacity onPress={() => this.addToDeck()} style={styles.addToButton}>
        <Ionicons 
          name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
          size={21} 
          style={{marginBottom: -2, marginRight: 5 }}
          color='white'
        />
        <Text style={styles.innerAdd}>Add Missions</Text>
      </TouchableOpacity>
    </View>); 
    let jutsuRender = this.state.jutsuCards.map((cardSet, index) => (
      <MapCollectWant
        key={`jutsu-${index}`}
        cardRow={cardSet}
        handleLoad={() => this.emptyFunction()}
        navigation={this.props.navigation}
        cardView={String(this.state.owner) === String(this.state.user) ? 'Deck Edit' : 'Guest View'}
        deckId={this.state._id}
      />
    ));
    let addJutsu = (<View style={styles.addToContainer}>
      <TouchableOpacity onPress={() => this.addToDeck()} style={styles.addToButton}>
        <Ionicons 
          name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
          size={21} 
          style={{marginBottom: -2, marginRight: 5 }}
          color='white'
        />
        <Text style={styles.innerAdd}>Add Jutsus</Text>
      </TouchableOpacity>
    </View>); 
    let extraRender = this.state.extraDeck.map((cardSet, index) => (
      <MapCollectWant
        key={`extra-${index}`}
        cardRow={cardSet}
        handleLoad={() => this.emptyFunction()}
        navigation={this.props.navigation}
        cardView={String(this.state.owner) === String(this.state.user) ? 'Deck Edit' : 'Guest View'}
        deckId={this.state._id}
      />
    ));
    let addExtra = (<View style={styles.addToContainer}>
      <TouchableOpacity onPress={() => this.addToDeck()} style={styles.addToButton}>
        <Ionicons 
          name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
          size={21} 
          style={{marginBottom: -2, marginRight: 5 }}
          color='white'
        />
        <Text style={styles.innerAdd}>Add Squads/Reinforcements</Text>
      </TouchableOpacity>
    </View>); 

let editDeck = (<View style={styles.controlDeckContainer}>
  <TouchableOpacity onPress={() => this.editDeck()} style={styles.editDeckButton}>
    <Ionicons 
      name={Platform.OS === 'ios' ? 'ios-create' : 'md-create'}
      size={21} 
      style={{marginBottom: -5, marginRight: 5 }}
      color='white'
    />
    <Text style={styles.innerAdd}>Edit Deck</Text>
  </TouchableOpacity>
</View>); 

let deleteDeck = (<View style={styles.controlDeckContainer}>
  <TouchableOpacity onPress={() => this.confirmDelete()} style={styles.deleteDeckButton}>
    <Ionicons 
      name={Platform.OS === 'ios' ? 'ios-remove-circle' : 'md-remove-circle'}
      size={21} 
      style={{marginBottom: -2, marginRight: 5 }}
      color='white'
    />
    <Text style={styles.innerAdd}>Delete Deck</Text>
  </TouchableOpacity>
</View>); 
    return (
      <View style={{ flex: 1, flexDirection: 'column'}}>
        <NavigationEvents
          onWillFocus={() => this.init()}
        
        />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.cardTypeHead}>
            <Text style={styles.cardTypeText}>Ninjas ({this.state.ninjaCount})</Text>
          </View>
          {ninjaRender}
          {String(this.state.owner) === String(this.state.user) ? addNinja : <View></View>}
          <View style={styles.cardTypeHead}>
            <Text style={styles.cardTypeText}>Missions ({this.state.missionCount})</Text>
          </View>
          {missionRender}
          {String(this.state.owner) === String(this.state.user) ? addMission : <View></View>}
          <View style={styles.cardTypeHead}>
            <Text style={styles.cardTypeText}>Jutsus ({this.state.jutsuCount})</Text>
          </View>
          {jutsuRender}
          {String(this.state.owner) === String(this.state.user) ? addJutsu : <View></View>}
          <View style={styles.cardTypeHead}>
            <Text style={styles.cardTypeText}>Clients ({this.state.clientCount})</Text>
          </View>
          {clientRender}
          {String(this.state.owner) === String(this.state.user) ? addClient : <View></View>}
          <View style={styles.cardTypeHead}>
            <Text style={styles.cardTypeText}>Extra Deck ({this.state.extraCount})</Text>
          </View>
          {extraRender}
          {String(this.state.owner) === String(this.state.user) ? addExtra : <View></View>}
          <View style={styles.deckControlSection}>
            {String(this.state.owner) === String(this.state.user) ? editDeck : <View></View>}
            {String(this.state.owner) === String(this.state.user) ? deleteDeck : <View></View>}
          </View>
        </ScrollView>
      </View>
    );
  }
}
let addToContainerHeight = resHeight('6%');
// iphone 8, x, xsmax
if (PixelRatio.get() >= 2 && Dimensions.get('window').height > 736) {
  addToContainerHeight = resHeight('6%');
}
// iphone 5s
if (PixelRatio.get() === 2 && Dimensions.get('window').width < 325) {
  addToContainerHeight = resHeight('8%');
}
if (Platform.OS == 'android') {
  
  if(Dimensions.get('window').height < 641) {
    addToContainerHeight = resHeight('8.5%');
  }
  if(Dimensions.get('window').height < 999) {
    addToContainerHeight = resHeight('9%');
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
    paddingTop: 5,
    backgroundColor: '#fff',
  },  
  cardTypeHead: {
    flex: 1/10,
    flexDirection: 'row',
    paddingLeft: 5,
  },
  cardTypeText: {
    fontSize: 25,
  },
  addToContainer: {
    marginTop: 10,
    marginBottom: 10,
    height: addToContainerHeight,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addToButton: {
    padding: 10,
    flex: 1,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#21ce99',
    elevation: 2,
    shadowColor: '#0000009c', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2, 
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  innerAdd: {
    color: 'white',
    marginTop: 2,
    fontSize: 16,
    fontWeight: 'bold',
  },
  editDeckButton: {
    padding: 10,
    flex: 1/2,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#2f95dc',
    elevation: 2,
    shadowColor: '#0000009c', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2, 
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  deleteDeckButton: {
    padding: 10,
    flex: 1/2,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#e05d24',
    elevation: 2,
    shadowColor: '#0000009c', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2, 
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  deckControlSection: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
    // height: addToContainerHeight, 
  },
  controlDeckContainer: {
    flex: 1/2
  }
});
