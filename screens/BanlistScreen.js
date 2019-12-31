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

export default class BanlistScreen extends React.Component {
  static navigationOptions = {
    title: 'Rogue List',
  };
  constructor(props) {
    super(props);
    this.state = { 
        banned: [],
        limited: [],
        semiLim: []
    };
  }
  componentDidMount() {
    this.getCards()
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
  emptyFunction() {
    // Required for image on load to handle a Parent component event 
   }
  async getCards() {
    const user = await Auth.getProfile();
    let _id = user._id
    Auth.fetch('https://api.narutoccg.com/api/v1/posts/list/view', {
      mode: 'cors',
      method: 'GET'
    })
    .then(res => {
        let _banned = this.cardLayout(res.banned);
        let _limited = this.cardLayout(res.limited);
        let _semiLim = this.cardLayout(res.semiLim);
      this.setState({
        banned: _banned,
        limited: _limited,
        semiLim: _semiLim
      })
    })
    .catch(err => {
      console.log(err);
    })
  } 
  render() {
    let banned = this.state.banned.map((cardSet, index) => (
      <MapCollectWant
        key={index}
        handleLoad={() => this.emptyFunction()}
        cardRow={cardSet}
        navigation={this.props.navigation}
      />
    ));
    let limited = this.state.limited.map((cardSet, index) => (
        <MapCollectWant
          key={index}
          handleLoad={() => this.emptyFunction()}
          cardRow={cardSet}
          navigation={this.props.navigation}
        />
      ));
    let semiLim = this.state.semiLim.map((cardSet, index) => (
        <MapCollectWant
          key={index}
          handleLoad={() => this.emptyFunction()}
          cardRow={cardSet}
          navigation={this.props.navigation}
        />
      ));
    return (
      <View style={{ flex: 1, flexDirection: 'column'}}>
        <NavigationEvents
        //   onWillFocus={() => this.getCards()}
        />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionText}>Banned</Text>
          </View>
          {banned}
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionText}>Limited</Text>
          </View>
          {limited}
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionText}>Semi-Limited</Text>
          </View>
          {semiLim}
        </ScrollView>
      </View>
    );
  }
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
      fontSize: 22,
      fontWeight: '500',
      marginLeft: 10,
    },
  
  
});
