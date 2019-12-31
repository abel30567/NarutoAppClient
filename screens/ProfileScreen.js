/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationEvents} from 'react-navigation';

import MapCollectWant from '../components/MapCollectWant';
import AuthService from '../auth/AuthService';

const Auth = new AuthService();

const resWidth = widthPercent => {
  const screenWidth = Dimensions.get('window').width;
  // Convert string input to decimal number
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};
const resHeight = heightPercent => {
  const screenHeight = Dimensions.get('window').height;
  // Convert string input to decimal number
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

export default class ProfileScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'Collection',
  // };
  constructor(props) {
    super(props);
    this.state = {
      selectCollection: 'black',
      selectWantList: '#a9a9a9',
      viewChoice: 'Collection',
      settingsButton: (
        <TouchableOpacity
          onPress={() => this.toMessage()}
          style={styles.buttonAction}>
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-mail' : 'md-mail'}
            size={20}
            style={{marginBottom: -5, marginRight: 5}}
            color="white"
          />
          <Text style={styles.innerButton}>Message</Text>
        </TouchableOpacity>
      ),
      searchType: 'other',
      collection: [],
      wantList: [],
      User: {
        userName: '',
        picture: '',
      },
      location: '',
      _id: '',
      lastActive: '',
    };
  }
  componentDidMount() {}
  toSettings() {
    this.props.navigation.navigate('Setting');
  }
  timeSince(timeStamp) {
    var now = new Date(),
      secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
    if(secondsPast < 60){
      return parseInt(secondsPast) + 's ago';
    }
    if(secondsPast < 3600){
      return parseInt(secondsPast/60) + 'm ago';
    }
    if(secondsPast <= 86400){
      return parseInt(secondsPast/3600) + 'h ago';
    }
    if(secondsPast > 86400){
        day = timeStamp.getDate();
        month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ","");
        year = timeStamp.getFullYear() == now.getFullYear() ? "" :  " "+timeStamp.getFullYear();
        return day + " " + month + year;
    }
  }
  toMessage() {
    Auth.fetch('https://api.narutoccg.com/api/v1.1/chat/', {
    // Auth.fetch('http://192.168.0.106:3000/api/v1.1/chat/', {
      mode: 'cors',
      method: 'GET',
    })
      .then(res => {
        // figure this out. it looks sloppy
        // if a chat already started, take them to that chat
        // else then take them to create a new chat.
        let hasChat = false;
        let chatID;
        res.forEach(chat => {
          if (String(this.state._id) == String(chat.chatTo._id)) {
            hasChat = true;
            chatID = chat._id;
          }
        });
        if (hasChat) {
          this.props.navigation.navigate('Chat', {
            chat_id: chatID,
          });
        } else {
          this.props.navigation.navigate('StartChat', {
            messageTo: this.state._id,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  async getSelf() {
    const user = await Auth.getProfile();
    let _id = user._id;
    this.setState(
      {
        _id: _id,
        searchType: '',
        settingsButton: (
          <TouchableOpacity
            onPress={() => this.toSettings()}
            style={styles.buttonAction}>
            <Ionicons
              name={
                Platform.OS === 'ios'
                  ? 'ios-add-circle-outline'
                  : 'md-add-circle-outline'
              }
              size={20}
              style={{marginBottom: -5, marginRight: 5}}
              color="white"
            />
            <Text style={styles.innerButton}>Settings</Text>
          </TouchableOpacity>
        ),
      },
      () => this.getCards(),
    );
  }
  identity() {
    const {navigation} = this.props;
    // Get user info
    const _user = navigation.getParam('user');
    if (_user === 'self') {
      this.getSelf();
    } else {
      this.setState({_id: _user}, () => this.getCards());
    }
  }
  getCards() {
    Auth.fetch(
      `https://api.narutoccg.com/api/v1/users/${this.state._id}`,
      // `http://192.168.0.106:3000/api/v1/users/${this.state._id}`,
      {
        mode: 'cors',
        method: 'GET',
      },
    )
      .then(res => {
        // console.log('RESPONSE', res.profile)
        let collection_ = [];
        let tempCollection = [];
        let collectionEnd = res.collection.length; // 7
        let remainingCollection = collectionEnd % 3; // 1, 2
        res.collection.map((card, index) => {
          // 6 is max
          tempCollection.push(card);
          if (tempCollection.length === 3) {
            collection_.push(tempCollection);
            tempCollection = [];
          }
        });
        if (remainingCollection === 2) {
          collection_.push([
            res.collection[collectionEnd - 2],
            res.collection[collectionEnd - 1],
          ]);
        }
        if (remainingCollection === 1) {
          collection_.push([res.collection[collectionEnd - 1]]);
        }
        let wantList_ = [];
        let tempWant = [];
        let wantListEnd = res.wantList.length; // 7
        let remainingWant = wantListEnd % 3; // 1, 2
        res.wantList.map((card, index) => {
          // 6 is max
          tempWant.push(card);
          if (tempWant.length === 3) {
            wantList_.push(tempWant);
            tempWant = [];
          }
        });
        if (remainingWant === 2) {
          wantList_.push([
            res.wantList[wantListEnd - 2],
            res.wantList[wantListEnd - 1],
          ]);
        }
        if (remainingWant === 1) {
          wantList_.push([res.wantList[wantListEnd - 1]]);
        }
        let activity = res.profile.lastActive;
        // console.log("ACTIVITY STATE", activity);
        if (activity === '' || activity === null || activity === undefined) {
          // console.log("CHANGING TO CREATE AT")
          activity = res.profile.createdAt;
        }
        this.setState({
          collection: collection_,
          wantList: wantList_,
          lastActive: activity,
          User: res.profile,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  toWantList() {
    this.setState({
      selectCollection: '#a9a9a9',
      selectWantList: 'black',
      viewChoice: 'Want List',
    });
  }
  toCollection() {
    this.setState({
      selectCollection: 'black',
      selectWantList: '#a9a9a9',
      viewChoice: 'Collection',
    });
  }
  emptyFunction() {
    // Required for image on load to handle a Parent component event
  }
  toAdd() {
    this.props.navigation.navigate('Search');
  }
  render() {
    let time = this.timeSince(new Date(String(this.state.lastActive)));

    let wantList = this.state.wantList.map((cardSet, index) => (
      <MapCollectWant
        key={index}
        handleLoad={() => this.emptyFunction()}
        cardRow={cardSet}
        searchType={this.state.searchType}
        navigation={this.props.navigation}
      />
    ));
    let collection = this.state.collection.map((cardSet, index) => (
      <MapCollectWant
        key={index}
        handleLoad={() => this.emptyFunction()}
        cardRow={cardSet}
        searchType={this.state.searchType}
        navigation={this.props.navigation}
      />
    ));

    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <NavigationEvents onWillFocus={() => this.identity()} />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.profilePicContainer}>
            <View style={styles.profilePic}>
              <Image
                source={{
                  uri: `https://api.narutoccg.com/${
                    this.state.User.picture
                  }`,
                }}
                style={styles.profileImage}
              />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userText}>{this.state.User.userName}</Text>
              <Text style={styles.userText}>{this.state.User.location}</Text>
              {this.state.settingsButton}
            </View>
          </View>
          <View style={styles.onlineContainer}>
            <View style={styles.onlineDot}></View>
            <Text style={styles.userActiveText}>Last Login: {time}</Text>
          </View>
          

          <View style={styles.selectContainer}>
            <TouchableOpacity
              onPress={() => this.toCollection()}
              style={{
                flex: 1 / 2,
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 10,
                borderBottomWidth: 2,
                borderColor: this.state.selectCollection,
              }}>
              <Text
                style={{
                  color: this.state.selectCollection,
                  fontSize: 25,
                }}>
                Collection
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.toWantList()}
              style={{
                flex: 1 / 2,
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 10,
                borderBottomWidth: 2,
                borderColor: this.state.selectWantList,
              }}>
              <Text
                style={{
                  color: this.state.selectWantList,
                  fontSize: 25,
                }}>
                Want List
              </Text>
            </TouchableOpacity>
          </View>
          {this.state.viewChoice === 'Collection' ? collection : wantList}
        </ScrollView>
      </View>
    );
  }
}
let profilePicHeight = resHeight('18%');
let profilePicContainer = resHeight('16%');
let settingsButtonHeight = resHeight('12%');
let userInfoHeight = resHeight('14%');
let selectRowHeigh = resHeight('7%');
let userActiveTextMarginTop = 5;
let userActiveTextflex = 38/100;
let onlineDotMarginTop = 8;

if (PixelRatio.get() >= 2 && Dimensions.get('window').height > 736) {
  profilePicHeight = resHeight('12%');
  profilePicContainer = resHeight('13%');
  userInfoHeight = resHeight('12%');
  selectRowHeigh = resHeight('6%');
}
// iphone 5s
if (PixelRatio.get() == 2 && Dimensions.get('window').width < 325) {
  // profilePicHeight = resHeight('15%');
  // profilePicContainer = resHeight('13%');
  userInfoHeight = resHeight('15%');
  selectRowHeigh = resHeight('8.2%');
}

if (Platform.OS == 'android') {
  if (Dimensions.get('window').height < 641) {
    userInfoHeight = resHeight('15%');
    selectRowHeigh = resHeight('8.2%');
    userActiveTextMarginTop = 20;
    userActiveTextflex = 40/100;
    onlineDotMarginTop = 28;
  }
  if (Dimensions.get('window').height < 999) {
    userInfoHeight = resHeight('18%');
    selectRowHeigh = resHeight('8.2%');
    userActiveTextMarginTop = 20;
    userActiveTextflex = 40/100;
    onlineDotMarginTop = 28; 
  }
  if (Dimensions.get('window').height > 1000) {
    // userInfoHeight = resHeight('18%');
    // selectRowHeigh = resHeight('8.2%');
    userActiveTextMarginTop = 10;
    userActiveTextflex = 32/100;
    onlineDotMarginTop = 18; 
  }
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    paddingTop: 5,
    backgroundColor: '#fff',
  },
  onlineContainer: {
    // flex: 1,
    flexDirection: 'row',
    // height: 20,
    justifyContent: 'flex-end',
  },
  addToContainer: {
    height: settingsButtonHeight,
    // flex: 1/10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addToButton: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#21ce99',
    shadowColor: '#0000009c',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  innerAdd: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  selectContainer: {
    height: selectRowHeigh,
    marginTop: 20,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonActionContainer: {
    // height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    shadowColor: '#0000009c',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  buttonAction: {
    flex: 1 / 4,
    padding: 10,
    // flex: 1,
    height: 25,
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
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5, 
  },
  innerButton: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
  },
  userInfoContainer: {
    // height: 6,
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  userInfo: {
    flex: 1 / 2,
    height: userInfoHeight,
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    // padding: 10,
  },
  userText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    flex: 1 / 3,
  },
  userActiveText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    marginRight: 45,
    marginTop: userActiveTextMarginTop,
    flex: userActiveTextflex,
  },
  onlineDot: {
    height: 7,
    width: 7,
    marginTop: onlineDotMarginTop,
    borderRadius: 100,
    backgroundColor: '#49F901',
  },
  profilePicContainer: {
    marginTop: 20,
    height: profilePicContainer,
    // flex: 1/2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  profilePic: {
    flex: 1 / 2,
    height: profilePicHeight,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  profileImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
});
