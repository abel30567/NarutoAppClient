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

export default class CommunityDecksScreen extends React.Component {
  navigationOptions = {
    // title: this.state.pageName,
  };
  constructor(props) {
    super(props);
    this.state = { 
        pageName: '',
        decks: [],
        
        
    };
  }
  componentDidMount() {
    this.init();
  }
  init() {
    const { navigation } = this.props;
      // Type of card list, erratas, wanted, owned
      const _decks = navigation.getParam('decks');
      this.setState({ decks: _decks });
  }
  
  
  
  render() {
    
    return (
      <View style={{ flex: 1, flexDirection: 'column'}}>
        {/* <NavigationEvents
          onWillFocus={() => this.init()}
        /> */}
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.sectionHeading}>
                  <Text style={styles.headFontSize}>
                    {this.state.decks.length} Community Decks
                  </Text>
                </View>
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
  
});
