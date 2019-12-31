import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    PixelRatio,
    Dimensions,
    TouchableWithoutFeedback,
    View,
  } from 'react-native';

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

export default class CardQuery extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          
      }
      // this.toCardView = this.toCardView.bind(this);
  }
  componentDidMount() {
    
  }
  toCardView() {
      Auth.fetch(`https://api.narutoccg.com/api/v1/posts/${this.props._id}`, {
          mode: 'cors',
          method: 'GET'
      })
        .then(res => {
            this.props.navigation.navigate('CardSearch', {
                card: res,
                searchType: this.props.searchType,
                deckId: this.props.deckId
            });
        })
        .catch(err => {
            console.log(err);
        });
      
  }
  render() { 
    return (
        <View style={styles.wrappedContainer}>
                <TouchableWithoutFeedback onPress={() => this.toCardView()} style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image 
                            source={{ uri: `https://api.narutoccg.com/${this.props.image}`}} 
                            style={{ 
                            flex: 1,
                            
                            aspectRatio: 5/7,
                            borderWidth: 1,
                            borderColor: 'transparent',
                            borderRadius: 5, 
                            // marginBottom: 15
                            }} 
                            
                        />
                    </View>    
                </TouchableWithoutFeedback>
                <TouchableOpacity onPress={() => this.toCardView()} style={styles.containerRow}>
                  <View style={styles.rarityContainer}>
                    <Text style={styles.rarityText}>{this.props.rarity}</Text>
                  </View>
                  <View style={styles.actionContainer}>
                    <Text style={styles.actionText}>Select</Text>
                  </View>
                </TouchableOpacity>
        </View>
        
        
    );
  }
}
let imageContainerHeight = resHeight('75%');
const wrappedContainerMargin = resHeight('5%');
const actionContainerHeight = resHeight('7%');

PixelRatio.get() == 3 ? imageContainerHeight = resHeight('61.5%') : imageContainerHeight;

Platform.OS == 'android' ? imageContainerHeight = resHeight('81%') : imageContainerHeight;
const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'column',
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
},
  wrappedContainer: {
    flex: 1,
    marginRight: 8,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 10,
    flexDirection: 'column',
    shadowColor: '#0000009c', 
    elevation: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2, 
    marginBottom: wrappedContainerMargin
}, 
  imageContainer: {
    height: imageContainerHeight,
    flexDirection: 'row',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingTop: 0,
    paddingLeft: 0, 
    paddingRight: 0, 
    backgroundColor: 'white'
  },
  actionContainer: {
    flex: 1/2,
    height: actionContainerHeight,
    flexDirection: 'row', 
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderColor: '#a9a9a9',
    paddingTop: 10,
    paddingRight: 5, 
    backgroundColor: 'white',
    borderBottomRightRadius: 10,
  },
  rarityContainer: {
    flex: 1/2,
    height: actionContainerHeight,
    flexDirection: 'row', 
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: '#a9a9a9',
    paddingTop: 10,
    paddingLeft: 5,
    backgroundColor: 'white',
    borderBottomLeftRadius: 10
  },
  actionText: {
    color: '#2f95dc',
    fontSize: 22, 
  },
  rarityText: {
    color: 'black',
    fontSize: 22,
  }
});
