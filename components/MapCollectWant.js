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

import AuthService from '../auth/AuthService';
import CardCollectWant from './CardCollectWant';
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
export default class MapCollectWant extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          
      }
  }
  
  render() { 
    return (
        <View style={styles.containerRow}>
          {this.props.cardRow.map((card, index) => (
            <CardCollectWant
              key={`${card._id}-${index}` }
              rowIndex={this.props.rowIndex}
              _id={card._id}
              image={card.image}
              navigation={this.props.navigation}
              cardView={this.props.cardView}
              deckId={this.props.deckId}
              chatId={this.props.chatId}
              searchType={this.props.searchType}
              handleLoad={() => this.props.handleLoad()}
            />
          ))}
        </View>
        
        
    );
  }
}
const paddingRowRight = resWidth('1%');
const paddingRowLeft = resWidth('-1%');
const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'column',
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    marginRight: paddingRowRight,
    marginLeft: paddingRowLeft
},
});
