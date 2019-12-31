import React from 'react';
import {
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

export default class CardListScreen extends React.Component {
  navigationOptions = {
    // title: this.state.pageName,
  };
  constructor(props) {
    super(props);
    this.state = { 
        pageName: '',
        cardLayout: [],
        showCards: 10,
        buttonText: "Loading...",
        cardListButton: () => this.handleShowMore(),
        
    };
  }
  componentDidMount() {
    this.init();
  }
  init() {
    const { navigation } = this.props;
      // Type of card list, erratas, wanted, owned
      const _type = navigation.getParam('type');
      if (_type == 'erratas') {
        this.getErratas();
      }
      if (_type == 'wanted') {
        this.getWanted();
      }
      if (_type == 'owned') {
        this.getOwned();
      }
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
  getOwned() {
    Auth.fetch('https://api.narutoccg.com/api/v1/posts/list/owned', {
      mode: 'cors',
      method: 'GET'
    })
    .then(res => {
        let _cardLayout = this.cardLayout(res);
        
      this.setState({
        cardLayout: _cardLayout,
        pageName: 'Owned Cards'
      })
    })
    .catch(err => {
      console.log(err);
    })
  } 
  getWanted() {
    Auth.fetch('https://api.narutoccg.com/api/v1/posts/list/wanted', {
      mode: 'cors',
      method: 'GET'
    })
    .then(res => {
      let _cardLayout = this.cardLayout(res);
      
    this.setState({
      cardLayout: _cardLayout,
      pageName: 'Wanted Cards'
    })
  })
    .catch(err => {
      console.log(err);
    })
  } 
  getErratas() {
    Auth.fetch('https://api.narutoccg.com/api/v1/posts/list/erratas', {
      mode: 'cors',
      method: 'GET'
    })
    .then(res => {
      let _cardLayout = this.cardLayout(res.erratas);
      
    this.setState({
      cardLayout: _cardLayout,
      pageName: 'Card Erratas '
    })
  })
    .catch(err => {
      console.log(err);
    })
  } 
  handleShowMore() {
    this.setState({
      showCards: 
        this.state.showCards >= this.state.cardLayout.length ?
          this.state.showCards : this.state.showCards + 20
    }, () => {
      if (this.state.showCards >= this.state.cardLayout.length) {
        this.setState({ buttonText: "Scroll To Top", cardListButton: () => this.scrollToTop() })
      }
    });
  }
  handleButtonText() {
    if (this.state.buttonText == "Loading...") {
      this.setState({ buttonText: "Show More Cards"});
    }
  }
  scrollToTop() {
    this.scroll.scrollTo({x: 0, y: 0, animated: true});
  }
  render() {
    let cardList = this.state.cardLayout.slice(0, this.state.showCards).map((cardSet, index) => (
      <MapCollectWant
        key={index}
        rowIndex={index}
        cardRow={cardSet}
        navigation={this.props.navigation}
        handleLoad={() => this.handleButtonText()}
      />
    ));
    return (
      <View style={{ flex: 1, flexDirection: 'column'}}>
        {/* <NavigationEvents
          onWillFocus={() => this.init()}
        /> */}
        <ScrollView ref={(c) => {this.scroll = c}} contentContainerStyle={styles.container}>
        <View style={styles.sectionHeading}>
                  <Text style={styles.headFontSize}>
                    {this.state.pageName}
                  </Text>
                </View>
          {cardList}
          {/* Control amount of cards shown */}
          <View style={styles.containButtons}>
                  <TouchableOpacity onPress={() => this.state.cardListButton()} style={styles.broadButton}>
                    
                      <Text style={styles.buttonText}>
                        {this.state.buttonText}
                      </Text>
                     
                  </TouchableOpacity>
                </View>
        </ScrollView>
      </View>
    );
  }
}
let buttonText = 22;
if (PixelRatio.get() == 2 && Dimensions.get('window').width < 325) {
  buttonText= 18;
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    paddingTop: 5,
    backgroundColor: '#fff',
  },
  sectionHeading: {
      height: 40,
      flex: 1,
      justifyContent: 'center'
  },
  sectionText: {
      fontSize: 16,
      fontWeight: "500"
  },
  sectionHeading: {
    height: 25, 
    marginTop: 15,
  },
  headFontSize: {
    fontSize: 22,
    fontWeight: '500',
    marginLeft: 10,
  },
  containButtons: {
    flex: 1/5,
    flexDirection: 'row',
    height: 55,
    marginBottom: 10
  },
  buttonText: {
    fontSize: buttonText,
    color: 'white',
    fontWeight: '500'
  }, 
  broadButton: {
    paddingTop: 13,
    height: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#21ce99',
    elevation: 1,
    shadowColor: '#0000009c', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2, 
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
});
