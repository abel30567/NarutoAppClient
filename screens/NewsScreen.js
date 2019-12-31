import React from 'react';
import {
  Image,
  Platform,
  Dimensions,
  ScrollView,
  StyleSheet,
  Button,
  PixelRatio,
  Alert,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
} from 'react-native';
import firebase from 'react-native-firebase';
import {NavigationEvents} from 'react-navigation';

import AuthService from '../auth/AuthService';
import UserMap from '../components/UserMap';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import DeckView from '../components/DeckView';
const Auth = new AuthService();

const {width, height} = Dimensions.get('window');

// Use iPhone6 as base size which is 375 x 667
const baseWidth = 375;
const baseHeight = 667;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

export const scaledSize = size => Math.ceil(size * scale);

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

export default class NewsScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'News',
      headerRight: (
        <TouchableOpacity
          // style={styles.msgButtonContainer}
          // style={{backgroundColor:'red'}}
          onPress={() => navigation.navigate('ChatList')}>
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-chatboxes' : 'md-chatboxes'}
            size={27}
            style={{marginRight: 15}}
            color="#2f95dc"
          />
          <Text
            style={{
              color: '#2f95dc',
              fontSize: 10,
              textAlign: 'left',
              marginLeft: 5,
            }}>
            Chat
          </Text>
        </TouchableOpacity>
      ),
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      username: '',
      users: [],
      decks: [],
      userLoad: 'Loading ...',
    };
  }
  async componentDidMount() {
    // this will run only once
    this.getUsers();
    this.fetchDecks();
    this.getAnnouncements();
    // push notifications
    this.checkPermission();
    this.createNotificationListeners(); //add this line
    // this.getToken();
  }
  refresh() {
    this.getUsers();
    this.fetchDecks();
  }

  componentWillUnmount() {
    this.notificationListener;
    this.notificationOpenedListener;
  }
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      // console.log('HAS PERMISSION');
      this.getToken();
    } else {
      this.requestPermission();
    }
  }
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        // console.log('fcmToken:', fcmToken);
        // console.log('REGISTER TOKEN', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
        this.tokenRegister(fcmToken);
      }
    }
    // console.log('fcmToken:', fcmToken);
    // console.log('REGISTER TOKEN', fcmToken);
    this.tokenRegister(fcmToken);
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      // console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    //  this.notificationListener = firebase.notifications().onNotification((notification) => {
    //   const { title, body } = notification;
    //   Alert.alert(title, body)
    //  });

    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const {title, body} = notification;
        // console.log('onNotification:');

        const localNotification = new firebase.notifications.Notification({
          // sound: 'sampleaudio',
          show_in_foreground: true,
        })
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setBody(notification.body)
          .android.setChannelId('fcm_FirebaseNotifiction_default_channel') // e.g. the id you chose above
          .android.setSmallIcon('@mipmap/ic_stat_n') // create this icon in Android Studio
          .android.setPriority(firebase.notifications.Android.Priority.High);
        // console.log(localNotification);
        firebase
          .notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err));
      });

    const channel = new firebase.notifications.Android.Channel(
      'fcm_FirebaseNotifiction_default_channel',
      'Demo app name',
      firebase.notifications.Android.Importance.High,
    ).setDescription('Demo app description');
    // .setSound('sampleaudio.wav');
    firebase.notifications().android.createChannel(channel);

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        let content = notificationOpen.notification._data;
        // Check if from foreground
        if (Object.entries(content).length === 0) {
          // Opened from foreground. Received notification while on app.
          content = notificationOpen.notification;
        }
        const {title, body} = content;
        if (content.route) {
          if (content.type === 'User') {
            // console.log('ran');
            this.props.navigation.navigate('Profile', {
              user: content.route,
            });
            Alert.alert(title, body);
          }
          if (content.type === 'Chat') {
            this.props.navigation.navigate('Chat', {
              chat_id: content.route,
            });
          }
        } else {
          Alert.alert(title, body);
        }
        // console.log('onNotificationOpened:');
        // console.log(notificationOpen.notification._data);
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const {title, body} = notificationOpen.notification;
      // console.log('getInitialNotification:');
      Alert.alert(title, body);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      //process data message
      // console.log('JSON.stringify:', JSON.stringify(message));
    });
  }

  async tokenRegister(token) {
    const usrToken = await Auth.getToken();
    let details = {
      token: token,
    };
    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    fetch('https://api.narutoccg.com/api/v1/users/registerpush', {
    // fetch('http://192.168.0.106:3000/api/v1/users/registerpush', {
       
      method: 'PATCH',
      mode: 'cors',
      headers: {
        Authorization: usrToken,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    })
      .then(response => response.json())
      .then(responseData => {
        // this.props.navigation.dispatch(StackActions.popToTop());
      });
  }

  getAnnouncements() {
    Auth.fetch(
      'https://api.narutoccg.com/api/v1.1/market/announcements',
      {
        mode: 'cors',
        method: 'GET',
      },
    )
      .then(res => {
        this.setState({
          announcementTitle: res.title,
          announcementMessage: res.message,
          announcementImage: res.image,
        });
      })
      .catch(err => {
        alert('Problem getting announcements');
      });
  }
  getUsers() {
    // console.log("FETCH USER METHOD 1 (FETCH)", new Date());
    Auth.fetch('https://api.narutoccg.com/api/v1/users/list/top', {
      mode: 'cors',
      method: 'GET',
    })
      .then(res => {
        // console.log("FETCHED USER DATA 2 (FETCH)", new Date());
        let users_ = [];
        let tempUsers = [];
        let usersEnd = res.users.length; // 7
        res.users.map(user => {
          // 6 is max
          // console.log("ITERATING USER DATA 3 (FETCH)", new Date());
          tempUsers.push(user);
          if (tempUsers.length === 5) {
            users_.push(tempUsers);
            tempUsers = [];
          }
        });
        // console.log("LOADING  USER DATA 4 (FETCH)", new Date());
        this.setState({
            users: users_, // array within array to create visual rows
            userCount: usersEnd,
            userList: res.users, // array with raw user data
            userLoad: 'See All Members',
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
  fetchDecks() {
    Auth.fetch('https://api.narutoccg.com/api/v1/decks/list/all', {
      mode: 'cors',
      method: 'GET',
    })
      .then(res => {
        this.setState({decks: res});
      })
      .catch(err => {
        console.log(err);
      });
  }
  toCharacteristics() {
    this.props.navigation.navigate('Characteristics');
  }
  toBanlist() {
    this.props.navigation.navigate('Banlist');
  }
  toErratas() {
    this.props.navigation.navigate('CardList', {
      type: 'erratas',
    });
  }
  toMemberlist() {
    this.props.navigation.navigate('CommunityMembers', {
      users: this.state.users,
      count: this.state.userCount,
      userList: this.state.userList,
    });
  }
  toMemberDecks() {
    this.props.navigation.navigate('CommunityDecks', {
      decks: this.state.decks,
    });
  }
  toWantedCards() {
    this.props.navigation.navigate('CardList', {
      type: 'wanted',
    });
  }
  toOwnedCards() {
    this.props.navigation.navigate('CardList', {
      type: 'owned',
    });
  }
  render() {
    // let this.state.users.slice(0, 4).map((user, index) => (
    //               <UserMap
    //                 key={index}
    //                 userRow={user}
    //                 navigation={this.props.navigation}
    //               />
    //             )) = this.state.users.slice(0, 4).map((user, index) => (
    //   <UserMap
    //     key={index}
    //     userRow={user}
    //     navigation={this.props.navigation}
    //   />
    // ));
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <NavigationEvents onWillFocus={() => this.refresh()} />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.sectionHeading}>
            <Text style={styles.headFontSize}>Community Announcements</Text>
          </View>
          <View>
            <FastImage
              source={{
                uri: this.state.announcementImage,
              }}
              resizeMode="contain"
              style={styles.annoucementImg}
            />
            <Text style={styles.titleFontSize}>
              {this.state.announcementTitle}
            </Text>
            <Text style={styles.messageFont}>
              {this.state.announcementMessage}
            </Text>
          </View>
          <View style={styles.containButtons}>
            <TouchableOpacity
              onPress={() => this.toWantedCards()}
              style={styles.newsButton}>
              <Text style={styles.buttonText}>Wanted Cards</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.toOwnedCards()}
              style={styles.newsButton}>
              <Text style={styles.buttonText}>Owned Cards</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containButtons}>
            <TouchableOpacity
              onPress={() => this.toCharacteristics()}
              style={styles.newsButton}>
              <Text style={styles.buttonText}>Rulebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.toErratas()}
              style={styles.newsButton}>
              <Text style={styles.buttonText}>Erratas</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containButtons}>
            <TouchableOpacity
              onPress={() => this.toBanlist()}
              style={styles.broadButton}>
              <Text style={styles.buttonText}>Rogue List</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionHeading}>
            <Text style={styles.headFontSize}>Top Users</Text>
          </View>
          {this.state.users.slice(0, 4).map((user, index) => (
            <UserMap
              key={index}
              userRow={user}
              navigation={this.props.navigation}
            />
          ))}
          <View style={styles.containButtons}>
            <TouchableOpacity
              onPress={() => this.toMemberlist()}
              style={styles.broadButton}>
              <Text style={styles.buttonText}>{this.state.userLoad}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionHeading}>
            <Text style={styles.headFontSize}>Community Decks</Text>
          </View>

          {this.state.decks.slice(0, 10).map(deck => (
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
          <View style={styles.containButtons}>
            <TouchableOpacity
              onPress={() => this.toMemberDecks()}
              style={styles.broadButton}>
              <Text style={styles.buttonText}>See More Decks</Text>
            </TouchableOpacity>
          </View>
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
let buttonText = 22;

if (PixelRatio.get() >= 2 && Dimensions.get('window').height > 736) {
  imageContainerHeight = resHeight('65%');
}

if (PixelRatio.get() == 2 && Dimensions.get('window').width < 325) {
  buttonText = 18;
}
if (Platform.OS == 'android') {
  headFontSize -= 5;
  imageContainerHeight = resHeight('80%');
  if (Dimensions.get('window').height < 641) {
    buttonText = 18;
  }
}
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
    backgroundColor: 'white',
  },

  detailedDesc: {
    fontSize: 16,
  },
  containButtons: {
    flex: 1 / 5,
    flexDirection: 'row',
    height: 55,
  },
  newsButton: {
    flex: 1 / 2,
    height: 50,
    paddingTop: 13,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5,
    backgroundColor: '#2f95dc',
  },
  buttonText: {
    fontSize: buttonText,
    color: 'white',
    fontWeight: '500',
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
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
  titleFontSize: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 15,
  },
  messageFont: {
    fontSize: 14,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    marginTop: 5,
  },
  annoucementImg: {
    height: 250,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
  },
});
