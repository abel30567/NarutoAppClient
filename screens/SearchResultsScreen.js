import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    View,
  } from 'react-native';

import CardQuery from '../components/CardQuery';
import MapCollectWant from '../components/MapCollectWant';
import CardCollectWant from '../components/CardCollectWant';

export default class SearchResultsScreen extends React.Component {
  static navigationOptions = {
    title: 'Search Results',
  };
  constructor(props) {
      super(props);
      this.state = {
        superRare: [],
        Rare: [],
        Uncommon: [],
        Promo: [],
        Common: [],
        Parallel: [],
        BnG: [],
        Starter: [],
        cards: []
      }
  }
  componentDidMount() {
    /**
     * Route the chat search to get the card url on the chat itself.
     */
      
      const { navigation } = this.props;
      const _cards = navigation.getParam('cards');
      const _noCard = navigation.getParam('result');
      // check if we are deck editing
      const search_type = navigation.getParam('searchType');
      const deck_id = navigation.getParam('deckId');
      const chat_id = navigation.getParam('chatId');
      let superRare = [];
      let rare = [];
      let uncommon = [];
      let common = [];
      let promo = [];
      let bng = [];
      let parallel = [];
      let starter = [];
      _cards.map(card => {
        if (card.rarity === " Super Rare") {
          superRare.push(card);
        }
        if (card.rarity === " STSR") {
          superRare.push(card);
        }
        if (card.rarity === " Rare") {
          rare.push(card);
        }
        if (card.rarity === " Uncommon") {
          uncommon.push(card);
        }
        if (card.rarity === " Promo") {
          promo.push(card);
        } 
        if (card.rarity === " Common") {
          common.push(card);
        }
        if (card.rarity === " Parallel") {
          parallel.push(card);
        }
        if (card.rarity === " B&G Super Rare") {
          bng.push(card);
        }
        if (card.rarity === " Starter") {
          starter.push(card);
        }
      });
      let SR = this.cardLayout(superRare);
      let R = this.cardLayout(rare);
      let U = this.cardLayout(uncommon);
      let P = this.cardLayout(promo);
      let C = this.cardLayout(common);
      let Start = this.cardLayout(starter);
      let BlacknGold = this.cardLayout(bng);
      let Para = this.cardLayout(parallel);
      // console.log("THIS IS SR", SR);
    this.setState({ 
      cards: _cards,
      superRare: SR,
      Rare: R,
      Uncommon: U,
      Promo: P,
      Common: C,
      Starter: Start,
      BnG: BlacknGold,
      Parallel: Para,
      noCard: _noCard,
      searchType: search_type,
      deckId: deck_id,
      chatId: chat_id,
    }); 
  }
  emptyFunction() {
   // Required for image on load to handle a Parent component event 
   // Tells us when the image is finished loading... 
  }
  cardLayout(collection) {
    let collection_ = [];
    let tempCollection = [];
    let collectionEnd = collection.length; // 7
    let remainingCollection = collectionEnd % 3; // 1, 2
    collection.map((card, index) => { // 6 is max
      tempCollection.push(card);
      if (tempCollection.length === 3) {
        collection_.push(tempCollection);
        tempCollection = [];
      }
    });
    if (remainingCollection === 2) {
      collection_.push([collection[collectionEnd - 2], collection[collectionEnd - 1]]);
    }
    if (remainingCollection === 1) {
      collection_.push([collection[collectionEnd - 1]]);
    }
    return collection_;
  }
  render() { 
    const { navigation } = this.props;
    return (
        <View style={{ flex: 1, flexDirection: 'column'}}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.searchErr}>
                    <Text style={styles.errMssg}>{this.state.noCard}</Text>
                </View>

                {/* TO DO
                ADD Text title.
                add decks to news tab.
                style this page and test.
                
                */}
                { this.state.superRare.length > 0 ? <Text style={styles.sectionHeadFont}>Super Rare</Text> : <View></View>}
                {this.state.superRare.map((cardSet,i) => (
                  <MapCollectWant
                    key={i + 'SR'}
                    handleLoad={() => this.emptyFunction()}
                    cardRow={cardSet}
                    navigation={navigation}
                    searchType={this.state.searchType}
                    deckId={this.state.deckId}
                    chatId={this.state.chatId}
                  />
                ))}
                { this.state.BnG.length > 0 ? <Text style={styles.sectionHeadFont}>Black & Gold</Text> : <View></View>}
                {this.state.BnG.map((cardSet,i) => (
                  <MapCollectWant
                    key={i + 'BnG'}
                    cardRow={cardSet}
                    handleLoad={() => this.emptyFunction()}
                    navigation={navigation}
                    searchType={this.state.searchType}
                    deckId={this.state.deckId}
                    chatId={this.state.chatId}
                  />
                ))}
                { this.state.Parallel.length > 0 ? <Text style={styles.sectionHeadFont}>Parallel</Text> : <View></View>}
                {this.state.Parallel.map((cardSet,i) => (
                  <MapCollectWant
                    key={i + 'Para'}
                    cardRow={cardSet}
                    navigation={navigation}
                    handleLoad={() => this.emptyFunction()}
                    searchType={this.state.searchType}
                    deckId={this.state.deckId}
                    chatId={this.state.chatId}
                  />
                ))}
                { this.state.Rare.length > 0 ? <Text style={styles.sectionHeadFont}>Rare</Text> : <View></View>}
                {this.state.Rare.map((cardSet,i) => (
                  <MapCollectWant
                    key={i + 'R'}
                    cardRow={cardSet}
                    handleLoad={() => this.emptyFunction()}
                    navigation={navigation}
                    searchType={this.state.searchType}
                    deckId={this.state.deckId}
                    chatId={this.state.chatId}
                  />
                ))}
                { this.state.Promo.length > 0 ? <Text style={styles.sectionHeadFont}>Promo</Text> : <View></View>}
                {this.state.Promo.map((cardSet,i) => (
                  <MapCollectWant
                    key={i + 'PR'}
                    cardRow={cardSet}
                    handleLoad={() => this.emptyFunction()}
                    navigation={navigation}
                    searchType={this.state.searchType}
                    deckId={this.state.deckId}
                    chatId={this.state.chatId}
                  />
                ))}
                { this.state.Uncommon.length > 0 ? <Text style={styles.sectionHeadFont}>Uncommon</Text> : <View></View>}
                {this.state.Uncommon.map((cardSet,i) => (
                  <MapCollectWant
                    key={i + 'U'}
                    cardRow={cardSet}
                    handleLoad={() => this.emptyFunction()}
                    navigation={navigation}
                    searchType={this.state.searchType}
                    deckId={this.state.deckId}
                    chatId={this.state.chatId}
                  />
                ))}
                { this.state.Starter.length > 0 ? <Text style={styles.sectionHeadFont}>Starter</Text> : <View></View>}
                {this.state.Starter.map((cardSet,i) => (
                  <MapCollectWant
                    key={i + 'Start'}
                    cardRow={cardSet}
                    handleLoad={() => this.emptyFunction()}
                    navigation={navigation}
                    searchType={this.state.searchType}
                    deckId={this.state.deckId}
                    chatId={this.state.chatId}
                  />
                ))}
                { this.state.Common.length > 0 ? <Text style={styles.sectionHeadFont}>Common</Text> : <View></View>}
                {this.state.Common.map((cardSet,i) => (
                  <MapCollectWant
                    key={i + 'C'}
                    cardRow={cardSet}
                    handleLoad={() => this.emptyFunction()}
                    navigation={navigation}
                    searchType={this.state.searchType}
                    deckId={this.state.deckId}
                    chatId={this.state.chatId}
                  />
                ))}
            </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    // paddingTop: 15,
    backgroundColor: '#fff',
  },
  searchErr: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center'
  },
  errMssg: {
      fontSize: 20,
  },
  sectionHeadFont: {
    fontSize: 22,
    fontWeight: '500',
    marginLeft: 10,
    marginTop: 15
  }
});
