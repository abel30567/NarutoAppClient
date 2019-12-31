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
    View,
    Switch
  } from 'react-native';

import Ionicons  from 'react-native-vector-icons/Ionicons';
import { StackActions } from 'react-navigation';

import AuthService from '../auth/AuthService';
import CardDemand from '../components/CardDemand';

const Auth = new AuthService();

const { width, height } = Dimensions.get('window');

// Use iPhone6 as base size which is 375 x 667
const baseWidth = 375;
const baseHeight = 667;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

export const scaledSize =
    (size) => Math.ceil((size * scale));

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

export default class CardScreen extends React.Component {
  
  // TODO: add list of those who own/want this card
  constructor(props) {
      super(props);
      this.state = {
        // For card functionality for owners
        // With this we control if the card is for sale or not
          user_id: '',
          forSale: '',
          amount: '',
          value: '',
        // Required to be able to do everything on page
          card: '',
          collected: false,
          wanted: false,
          wantedBy: [],
          ownedBy: [],
      }
      // this.addToWant = this.addToWant.bind(this);
  }
  async componentDidMount() {
      await this.getUserId();
      const { navigation } = this.props;
      // Normal search of card and from collection
      const _card = navigation.getParam('card');
      // Deck search card (to add card to deck) "Deck Edit changes buttons" also used in deck creation for image
      let search_type = navigation.getParam('searchType');
      // View card from Deck List, to remove the card from the deck in question
      const card_view = navigation.getParam('cardView');
      // Deck handling for adding and removing cards
      const deck_id = navigation.getParam('deckId');
      const chat_id = navigation.getParam('chatId');
      // console.log("CHAT ID", chat_id);
      if (chat_id !== '' && chat_id !== null && chat_id !== undefined) {
        search_type = 'Add to Chat';
      }
      const _wantArr = [];
      const _ownArr = [];
      _card.wanted.forEach(card => {
        // If a card is greater than $0.25 of value show it.
        if (Number(card.value) > 0.25) {
          _wantArr.push(card);
        }
      });
      _card.owned.forEach(card => {
        if (Number(card.value) > 0.25) {
          _ownArr.push(card);
          
          
          if (String(card.user._id) == String(this.state.user_id)) {
          // if the user owns the card then set its sale state because 
            this.setState({ 
              forSale: card.forSale,
              amount: card.amount,
              value: card.value
            });
          }
        }
      });
    this.setState({ 
      card: _card,
      searchType: search_type,
      deckId: deck_id,
      chatId: chat_id,
      cardView: card_view,
      wantedBy: _wantArr,
      ownedBy: _ownArr
    }, () => {
      this.getCards();
    });
  }
  async getCards() {
    const user = await Auth.getProfile();
    let _id = user._id
    Auth.fetch(`https://api.narutoccg.com/api/v1/users/${this.state.user_id}`, {
      mode: 'cors',
      method: 'GET'
    })
    .then(res => {
      this.setState({
        collection: res.collection,
        wantList: res.wantList
      }, () => {
        this.state.collection.map(card => {
          if (String(card._id) === String(this.state.card._id)) {
            this.setState({ collected: true });
          }
        })
        this.state.wantList.map(card => {
          if (String(card._id) === String(this.state.card._id)) {
            this.setState({ wanted: true });
          }
        })
      })
    })
    .catch(err => {
      console.log(err);
    })
  } 
  async getUserId() {
    const user = await Auth.getProfile();
    this.setState({ user_id: user._id });
  }
  addToWant() {
    this.props.navigation.navigate('AddtoWantList', {
      card: this.state.card,
    })
  }
  addToCollection() {
    this.props.navigation.navigate('AddtoCollection', {
      card: this.state.card,
    })
  }
  removeFromWant(){
    Auth.fetch(`https://api.narutoccg.com/api/v1/posts/${this.state.card._id}/unwant`, {
      mode: 'cors',
      method: 'GET'
    })
      .then(res => {
        this.props.navigation.dispatch(StackActions.pop({n: 1}));
      })
      .catch(err => {
        console.log(err);
      })
  }
  removeFromCollection() {
    Auth.fetch(`https://api.narutoccg.com/api/v1/posts/${this.state.card._id}/uncollect`, {
      mode: 'cors',
      method: 'GET'
    })
      .then(res => {
        this.props.navigation.dispatch(StackActions.pop({n: 1}));
      })
      .catch(err => {
        console.log(err);
      })
  }
  addToDeck() {
    this.props.navigation.navigate('AddToDeck', {
      deckId: this.state.deckId,
      card: this.state.card,
    })
  }
  async removeFromDeck() {
    const token = await Auth.getToken();
    let details = {
      'card' : this.state.card._id
    }
    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch(`https://api.narutoccg.com/api/v1/decks/${this.state.deckId}/remove`, {
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
          n: 1,
          deck: this.state.deckId
        }));
      })
      .catch(err => {
        console.log(err);
      })
  
  }
  chooseMainCard() {
    // Selects what card is a Deck Image main card from DeckView Component 
    // Selects what card to send to a chat



    /**
     * 
     * Add the card image on message or send  it on choice. Route back to chat and handle message
     * delivery.
     */
    if (
      this.state.chatId !== '' &&
      this.state.chatId !== null &&
      this.state.chatId !== undefined
    ) {
      this.props.navigation.navigate('Chat', {
        chat_id: this.state.chatId,
        card_url: `https://api.narutoccg.com/${this.state.card.image}`,
      });
    } else {
      this.props.navigation.navigate('CreateDeck', {
        card: this.state.card,
      });
    }
  }

  switchSaleState() {
    Auth.fetch(`https://api.narutoccg.com/api/v1/posts/${this.state.card._id}/sale`, {
      mode: 'cors',
      method: 'GET'
    })
      .then(res => {
        this.setState({forSale: res.forSale})
        // this.props.navigation.dispatch(StackActions.pop({n: 1}));
      })
      .catch(err => {
        alert("An error occurred. Try again");
      })
  }
  render() { 
    // Deck edit search
    // LOGIC ON CONDITIONAL. IF THIS SEARCH TYPE IS A DECK EDIT SEARCH THEN SHOW THE ADD TO DECK BUTTON. ELSE SHOW THE OTHER TWO BUTTON TO ADD
    // TO COLLECTION OR TO ADD TO WANT LIST.

    const ioniconSize = scaledSize(20);
    const addToDeck = (<TouchableOpacity onPress={() => this.addToDeck()} style={styles.buttonActionDeck}>
    <Ionicons 
      name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
      size={ioniconSize} 
      style={{marginBottom: -5, marginRight: 5 }}
      color='#21ce99'
    />
    <Text style={styles.innerButton}>Add to Deck</Text>
  </TouchableOpacity>);

    const chooseCard = (<TouchableOpacity onPress={() => this.chooseMainCard()} style={styles.buttonActionDeck}>
    <Ionicons 
    name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
    size={ioniconSize} 
    style={{marginBottom: -5, marginRight: 5 }}
    color='#21ce99'
    />
    <Text style={styles.innerButton}>Choose this card</Text>
    </TouchableOpacity>);



    const removeFromDeck = (<TouchableOpacity onPress={() => this.removeFromDeck()} style={styles.buttonActionDeck}>
    <Ionicons 
      name={Platform.OS === 'ios' ? 'ios-remove-circle' : 'md-remove-circle'}
      size={ioniconSize} 
      style={{marginBottom: -5, marginRight: 5 }}
      color='#e05d24'
    />
    <Text style={styles.innerButtonRemove}>Remove from Deck</Text>
    </TouchableOpacity>);


    // Button Actions
    const want = (<TouchableOpacity onPress={() => this.addToWant()} style={styles.buttonAction}>
    <Ionicons 
      name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
      size={ioniconSize} 
      style={{marginBottom: -5, marginRight: 5 }}
      color='#21ce99'
    />
    <Text style={styles.innerButton}>Add to Want List</Text>
  </TouchableOpacity>);




    const unwant = (<TouchableOpacity onPress={() => this.removeFromWant()} style={styles.buttonAction}>
    <Ionicons 
      name={Platform.OS === 'ios' ? 'ios-remove-circle' : 'md-remove-circle'}
      size={ioniconSize} 
      style={{marginBottom: -5, marginRight: 5 }}
      color='#e05d24'
    />
    <Text style={styles.innerButtonRemove}>Cut from Want List</Text>
  </TouchableOpacity>);
     
    


    const collect = (<TouchableOpacity onPress={() => this.addToCollection()} style={styles.buttonAction}>
    <Ionicons 
      name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
      size={ioniconSize} 
      style={{marginBottom: -5, marginRight: 5 }}
      color='#21ce99'
    />
    <Text style={styles.innerButton}>Add to Collection</Text>
    </TouchableOpacity>);




    const uncollect = (<TouchableOpacity onPress={() => this.removeFromCollection()} style={styles.buttonAction}>
    <Ionicons 
      name={Platform.OS === 'ios' ? 'ios-remove-circle' : 'md-remove-circle'}
      size={ioniconSize} 
      style={{marginBottom: -5, marginRight: 5 }}
      color='#e05d24'
    />
    <Text style={styles.innerButtonRemove}>Cut from Collection</Text>
    </TouchableOpacity>);

    //
    //
    // Here is the code for the individual valuation of card
    //
    const wantedBy = this.state.wantedBy.map(want => (
        <CardDemand 
          key= {want._id}
          card= {this.state.card}
          user_id = {want.user._id}
          profilePic = {want.user.picture}
          action= "Wants"
          forSale={want.forSale}
          amount = {want.amount}
          value = {want.value}
          navigation={this.props.navigation}
          username = {want.user.userName}
        />
    ));
    const ownedBy = this.state.ownedBy.map(own => (
      <CardDemand 
        key= {own._id}
        card= {this.state.card}
        user_id = {own.user._id}
        profilePic = {own.user.picture}
        action= "Owns"
        forSale={own.forSale}
        amount = {own.amount}
        value = {own.value}
        navigation={this.props.navigation}
        username = {own.user.userName}
      />
  ));
      /**
       * Show switch in right state
       * make sure that on switch of states it will trigger API
       * 
       * 
       */
  const forSaleSwitch = (<View style={styles.switchRow}>
    <View style={styles.forSaleContainer}>
      <Text style={styles.switchDemandHeading}>For Sale/Trade: </Text>
    </View>
    <View style={styles.switchContainer}>
      <Switch
        style={styles.switchContainer}
        onValueChange={() => this.switchSaleState()}
        value={this.state.forSale}
      />
    </View>
  </View>)
    return (
        <View style={{ flex: 1, flexDirection: 'column'}}>
            <ScrollView contentContainerStyle={styles.container}>
              <View style={styles.imageContainer}>
                <Image
                  source={{uri: `https://api.narutoccg.com/${this.state.card.image}`}}
                  style={styles.imageStyle} 
                />
              </View>
              <View style={styles.buttonActionContainer}>
                { // show the add to deck button
                  this.state.searchType === 'Deck Edit'  && this.state.cardView !== 'Deck Edit' ? 
                  addToDeck : <View></View>
                }
                { // show the add/remove from want list button
                  this.state.searchType !== 'Deck Edit' && this.state.searchType !== 'Create Deck' && this.state.searchType !== 'Add to Chat' && this.state.cardView !== 'Deck Edit' ?
                  this.state.wanted ? unwant : want  : <View></View>
                }
                { // show the collect/uncollect button
                  this.state.searchType !== 'Deck Edit' && this.state.searchType !== 'Create Deck' && this.state.searchType !== 'Add to Chat' && this.state.cardView !== 'Deck Edit' ?
                  this.state.collected ? uncollect : collect : <View></View>
                }
                { // show remove from deck this is pressed from decklist
                  this.state.cardView === 'Deck Edit' ?
                  removeFromDeck : <View></View>
                }
                { // from deck list, maybe I wanna add another
                  this.state.cardView === 'Deck Edit' ?
                  addToDeck : <View></View>
                }
                { // from deck list, maybe I wanna add another
                  (this.state.searchType === 'Create Deck' || this.state.searchType === 'Add to Chat') ?
                  chooseCard : <View></View>
                }
              </View>
              {
                this.state.collected ? forSaleSwitch : <View></View> 
              }
              { this.state.wantedBy.length > 0 ? 
                  <View style={styles.demandHeadContainer}>
                    <Text style={styles.demandHeading}>Wanted By</Text>
                  </View> :
                  <View></View>
              }
              {wantedBy}
              {this.state.ownedBy.length > 0 ?
                <View style={styles.demandHeadContainer}>
                  <Text style={styles.demandHeading}>Owned By</Text>
                </View> :
                <View></View>
              }
              {ownedBy}
            </ScrollView>
        </View>
    );
  }
}
let imageContainerHeight = resHeight('75%');
let actionContainerHeight = resHeight('7%');
const demandContainerHeight = resHeight('5%');

let actionButtonFont = scaledSize(16);
let imageFlex = 1;
if (PixelRatio.get() == 2 && Dimensions.get('window').width > 800) {
  // iPad
  imageContainerHeight = resHeight('75%');
  imageFlex = 70/100;
}

if (PixelRatio.get() >= 2 &&  Dimensions.get('window').height > 736 && Dimensions.get('window').width < 800) {
  imageContainerHeight = resHeight('62%');
  actionContainerHeight = resHeight('6%');
}


if (Platform.OS == 'android') {
  imageContainerHeight = resHeight('80%');
  actionContainerHeight = resHeight('7%');
  actionButtonFont = 15;
  if(Dimensions.get('window').height < 641) {
    
  }
  // Galaxy S10
  if(Dimensions.get('window').height > 1000) {
    imageContainerHeight = resHeight('65%');
  actionContainerHeight = resHeight('5%');
  actionButtonFont = 17;
  }
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    paddingTop: 5,
    backgroundColor: '#fff',
  },
  imageStyle: { 
    flex: imageFlex,
    aspectRatio: 5/7,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'lightgrey',
    borderRadius: 5, 
    },
  imageContainer: {
    height: imageContainerHeight, 
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 10, 
    paddingRight: 10, 
    backgroundColor: 'white'
  },
  demandHeadContainer: {
    paddingTop: 5,
    height: demandContainerHeight,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  demandHeading: {
    fontSize: 22,
    fontWeight: "600"
  },
  buttonActionContainer: {
    flex: 1,
    height: actionContainerHeight,
    flexDirection: 'row',
    padding: 10,
    marginBottom: 20,
    shadowColor: '#0000009c', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2, 
  },
  buttonAction: {
    flex: 1/2,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'white',
    height: actionContainerHeight, 
    elevation: 1,
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    
  },
  buttonActionDeck: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    elevation: 1,
    height: actionContainerHeight, 
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'white',
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  innerButton: {
    color: '#21ce99',
    fontSize: actionButtonFont,
    marginTop: 1,
  },
  innerButtonRemove: {
    color: '#e05d24',
    fontSize: actionButtonFont,
    marginTop: 1,
  },
  switchRow: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
    marginTop: 10,
    marginBottom: 5,
  },
  forSaleContainer: {
    flex: 3/5,
    flexDirection:'row',
    justifyContent: 'flex-end'
  },
  switchContainer: {
    flex: 2/5,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  switchDemandHeading: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 3
  },
});
