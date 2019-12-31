import React from 'react';
import {
  Image,
  Platform,
  Dimensions,
  ScrollView,
  StyleSheet,
  Button,
  PixelRatio,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { NavigationEvents } from 'react-navigation';
import FastImage from 'react-native-fast-image';
import AuthService from '../auth/AuthService';

import pg1 from '../assets/images/rulebook/pg1.jpg';
import pg2 from '../assets/images/rulebook/pg2.jpg';
import pg3 from '../assets/images/rulebook/pg3.jpg';
import pg4 from '../assets/images/rulebook/pg4.jpg';
import pg5 from '../assets/images/rulebook/pg5.jpg';
import pg6 from '../assets/images/rulebook/pg6.jpg';
import pg7 from '../assets/images/rulebook/pg7.jpg';
import pg8 from '../assets/images/rulebook/pg8.jpg';
import pg9 from '../assets/images/rulebook/pg9.jpg';
import pg10 from '../assets/images/rulebook/pg10.jpg';
import pg11 from '../assets/images/rulebook/pg11.jpg';
import pg12 from '../assets/images/rulebook/pg12.jpg';
import pg13 from '../assets/images/rulebook/pg13.jpg';
import pg14 from '../assets/images/rulebook/pg14.jpg';
import pg15 from '../assets/images/rulebook/pg15.jpg';
import pg16 from '../assets/images/rulebook/pg16.jpg';
import pg17 from '../assets/images/rulebook/pg17.jpg';
import pg18 from '../assets/images/rulebook/pg18.jpg';
import pg19 from '../assets/images/rulebook/pg19.jpg';
import pg20 from '../assets/images/rulebook/pg20.jpg';
import pg21 from '../assets/images/rulebook/pg21.jpg';
import pg22 from '../assets/images/rulebook/pg22.jpg';
import pg23 from '../assets/images/rulebook/pg23.jpg';
import pg24 from '../assets/images/rulebook/pg24.jpg';
import pg25 from '../assets/images/rulebook/pg25.jpg';
import pg26 from '../assets/images/rulebook/pg26.jpg';
import pg27 from '../assets/images/rulebook/pg27.jpg';
import pg28 from '../assets/images/rulebook/pg28.jpg';
import pg29 from '../assets/images/rulebook/pg29.jpg';
import pg30 from '../assets/images/rulebook/pg30.jpg';
import pg31 from '../assets/images/rulebook/pg31.jpg';
import pg32 from '../assets/images/rulebook/pg32.jpg';
import pg33 from '../assets/images/rulebook/pg33.jpg';

let imageArr = [pg1,pg2,pg3,pg4,pg5,pg6,pg7,pg8,pg9,pg10,pg11,pg12,pg13,pg14,pg15,pg16,pg17,pg18,pg19,pg20,pg21,pg22,pg23,pg24,pg25,pg26,pg27,pg28,pg29,pg30,pg31,pg32,pg33]
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


export default class CharacteristicsScreen extends React.Component {
  static navigationOptions = {
    title: 'Rulebook'
  };
  constructor(props) {
    super(props);
    this.state = { 
     
    };
  }
  componentDidMount() {
    // this will run only once
    
  }

  render() {
    
    return (
      <View style={{ flex: 1, flexDirection: 'column'}}>
            <ScrollView contentContainerStyle={styles.container}>
              {imageArr.map((page, index) => (
                <FastImage
                key={index}
                source={page}
                style={{ 
                  flex: 1,
                  aspectRatio: 7/10,
                  backgroundColor: 'lightgrey',
                  marginBottom: 5
                  }}
                />
              ))}
            </ScrollView>
        </View>
    );
  }
}
let imageContainerHeight = resHeight('75%');
const paddingTopScreen = resHeight('1%');
const listVerticalMargin = resHeight('1%');
const listHorizontalMargin = resWidth('2.5%');
let headFontSize = scaledSize(30);

PixelRatio.get() == 3 ? imageContainerHeight = resHeight('65%') : imageContainerHeight;

Platform.OS == 'android' ? headFontSize -= 5 : headFontSize;
Platform.OS == 'android' ? imageContainerHeight = resHeight('80%') : imageContainerHeight;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    paddingTop: paddingTopScreen,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: imageContainerHeight,
    flexDirection: 'row',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingTop: 0,
    paddingLeft: listHorizontalMargin, 
    paddingRight: listHorizontalMargin, 
    marginBottom: 20,
    backgroundColor: 'white'
  },
  Section: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 30,
    marginBottom: 20,
    borderBottomWidth: 4,
    borderColor: 'black'
  },
  listHead: {
    fontSize: headFontSize,
    marginBottom: listVerticalMargin,
    marginLeft: listHorizontalMargin
  },
  detailedDesc: {
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10
  },
  
});
