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
    TouchableWithoutFeedback,
    View,
  } from 'react-native';
  import { NavigationEvents } from 'react-navigation';

import AuthService from '../auth/AuthService';

const Auth = new AuthService();
export default class DeckView extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          ninjasNumber: 0,
          missionsNumber: 0,
          jutsusNumber: 0,
          extraNumber: 0
      }
      
  }
  componentDidMount() {
    this.props.cards.map(card => {
      if (card.cardType === "Ninja") {
          // if (card.characteristic.includes("SQUAD")) {
          //     this.setState({ extraNumber: this.state.extraNumber + 1})
          // }
          if (card.characteristic.includes("REINFORCEMENT") || card.characteristic.includes("SQUAD") || card.characteristic.includes("Squad") || card.characteristic.includes("Reinforcement")) {
              this.setState({ extraNumber: this.state.extraNumber += 1})
          }
          else {
              this.setState({ ninjasNumber: this.state.ninjasNumber += 1})
          }
      }
      if (card.cardType === "Jutsu") {
          this.setState({ jutsusNumber: this.state.jutsusNumber += 1})
      }
      if (card.cardType === "Mission") {
          this.setState({ missionsNumber: this.state.missionsNumber += 1})
      }
  })
  }
  count() {
    this.props.cards.map(card => {
      if (card.cardType === "Ninja") {
          // if (card.characteristic.includes("SQUAD")) {
          //     this.setState({ extraNumber: this.state.extraNumber + 1})
          // }
          if (card.characteristic.includes("REINFORCEMENT") || card.characteristic.includes("SQUAD") || card.characteristic.includes("Squad") || card.characteristic.includes("Reinforcement")) {
              this.setState({ extraNumber: this.state.extraNumber += 1})
          }
          else {
              this.setState({ ninjasNumber: this.state.ninjasNumber += 1})
          }
      }
      if (card.cardType === "Jutsu") {
          this.setState({ jutsusNumber: this.state.jutsusNumber += 1})
      }
      if (card.cardType === "Mission") {
          this.setState({ missionsNumber: this.state.missionsNumber += 1})
      }
  })
  }
  resetCount() {
    this.setState({
      ninjasNumber: 0,
      missionsNumber: 0,
      jutsusNumber: 0,
      extraNumber: 0
    })
  }
  toDeckList() {
    this.props.navigation.navigate('DeckList', {
      deck: this.props._id
    })
  }
  render() { 
    let deckInfo = (<View><View style={styles.specificInfo}>
        <Text style={styles.deckText}>Ninjas: {this.state.ninjasNumber}</Text>
      </View>
      <View style={styles.specificInfo}>
        <Text style={styles.deckText}>Missions: {this.state.missionsNumber}</Text>
      </View>
      <View style={styles.specificInfo}>
        <Text style={styles.deckText}>Jutsus: {this.state.jutsusNumber}</Text>
      </View>
      <View style={styles.specificInfo}>
        <Text style={styles.deckText}>Extra Deck: {this.state.extraNumber}</Text>
      </View></View>);

    let userInfo = (<View style={styles.userCredit}>
      <Image 
        source={{uri: `https://api.narutoccg.com/${this.props.user.picture}`}}
        style={{ 
          flex: 1,
          aspectRatio: 1/1,
          borderWidth: 1,
          borderColor: 'transparent',
          borderRadius: 5, 
          }} 
        />
      <Text numberOfLines={1} style={styles.username}>{this.props.user.userName}</Text>
      </View>);
    return (
        <View style={styles.containerRow}>
        <NavigationEvents
          onWillFocus={() => this.resetCount()}
          onDidFocus={() => this.count()} // componentDidMount
          // onWillBlur={payload => console.log('will blur',payload)}
          onDidBlur={() => this.resetCount()}
        />
          <TouchableOpacity onPress={() => this.toDeckList()} style={styles.containerTouch}>
            <View style={styles.imageContainer}>
              <Image 
                source={{uri: `https://api.narutoccg.com/${this.props.image}`}}
                style={{ 
                flex: 1,
                aspectRatio: 5/7,
                borderWidth: 1,
                borderColor: 'transparent',
                borderRadius: 5, 
                
                }} 
              />
            </View>
            <View style={styles.deckInfo}>
              <View style={styles.headingInfo}>
              <Text style={styles.headingText}>{this.props.title}</Text>
              </View>
              {this.props.user.userName ? userInfo : deckInfo }
              
              <View style={styles.linkInfo}>
                <Text style={styles.linkDeck}>View Decklist</Text>  
              </View>
            </View>
          </TouchableOpacity>
        </View>
        
        
    );
  }
}

let titleFont = 22;
if (PixelRatio.get() == 2 && Dimensions.get('window').width < 325) {
  titleFont = 20;
}

const styles = StyleSheet.create({
  containerTouch: {
      flex: 1,
      flexDirection: 'row',
  },
  containerRow: {
    flex: 1/20,    
    flexDirection: 'row',
    // height: 220,
    backgroundColor: 'white',
    marginBottom: 10,
    marginRight: 5,
    marginLeft: 5,
    shadowColor: '#0000009c', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2, 
    elevation: 1,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 10,
  },
  imageContainer: {
    flex: 2/5,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  deckInfo: {
      flex: 3/5,
      padding: 10,
      flexDirection: 'column',
  },
  headingInfo: {
      // title/link container
    flex: 3/10,
    flexDirection: 'row',
    marginTop: 10,

  },
  headingText: {
    // font of title
    fontSize: titleFont,
    fontWeight: 'bold' 
  },
  specificInfo: {
    // container of deck specifics
    flex: 1/10,
    flexDirection: 'row'
  },
  deckText: {
    // font of deck specifics
    fontSize: 17,

  },
  linkInfo: {
    // title/link container
  flex: 2/10,
  flexDirection: 'row',
  justifyContent: 'flex-end',
  marginTop: 10,

},
  linkDeck: {
    // link to decklist font
    fontSize: 20,
    color: '#21ce99',
  },
  userCredit: {
    flex: 2/5,
    flexDirection: 'column',
    height: 75,
    width: 75,
    justifyContent: 'center'
  },
  username: {
    fontSize: 15,
    fontWeight: "500",
    // marginLeft: 20,
    textAlign: 'center'
  }
});
