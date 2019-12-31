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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationEvents} from 'react-navigation';
import UserMap from '../components/UserMap';
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

export default class CommunityMembersScreen extends React.Component {
  navigationOptions = {
    // title: this.state.pageName,
  };
  constructor(props) {
    super(props);
    this.state = {
      pageName: '',
      users: [],
      userList: [],
      query: 'Search by Username',
    };
  }
  componentDidMount() {
    this.init();
  }
  init() {
    const {navigation} = this.props;
    // Type of card list, erratas, wanted, owned
    const _users = navigation.getParam('users');
    const userListRaw = navigation.getParam('userList');
    const userCount = navigation.getParam('count');
    this.setState({users: _users, count: userCount, userList: userListRaw});
  }
  filterUsers(query) {
    this.setState({query: query});
    let upperQuery = query.toUpperCase();
    let searchedUsers = this.state.userList.filter(user => {
      return user.userName.toUpperCase().indexOf(upperQuery) > -1;
    });
    this.renderUsers(searchedUsers);
  }
  renderUsers(queryArr) {
    let users_ = [];
    let tempUsers = [];
    let usersEnd = queryArr.length; // 7
    let remainingUsers = usersEnd % 5; // 1, 2
    queryArr.map((user, index) => {
      // 6 is max
      tempUsers.push(user);
      if (tempUsers.length === 5) {
        users_.push(tempUsers);
        tempUsers = [];
      }
    });
    if (remainingUsers === 4) {
      users_.push([
        queryArr[usersEnd - 4],
        queryArr[usersEnd - 3],
        queryArr[usersEnd - 2],
        queryArr[usersEnd - 1],
      ]);
    }
    if (remainingUsers === 3) {
      users_.push([
        queryArr[usersEnd - 3],
        queryArr[usersEnd - 2],
        queryArr[usersEnd - 1],
      ]);
    }
    if (remainingUsers === 2) {
      users_.push([queryArr[usersEnd - 2], queryArr[usersEnd - 1]]);
    }
    if (remainingUsers === 1) {
      users_.push([queryArr[usersEnd - 1]]);
    }

    this.setState({users: users_});
  }
  render() {
    let members = this.state.users.map((user, index) => (
      <UserMap key={index} userRow={user} navigation={this.props.navigation} />
    ));
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        {/* <NavigationEvents
          onWillFocus={() => this.init()}
        /> */}
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.sectionHeading}>
            <Text style={styles.headFontSize}>
              {this.state.count} Community Members
            </Text>
          </View>
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              onChangeText={query => this.filterUsers(query)}
              value={this.state.query}
              returnKeyType="done"
              onFocus={() => this.setState({query: ''})}
            />
          </View>
          {members}
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
    justifyContent: 'center',
  },
  sectionText: {
    fontSize: 16,
    fontWeight: '500',
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
  searchInputContainer: {
    flex: 1 / 10,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 15,
  },
  searchInput: {
    height: 40,
    borderColor: '#a9a9a9',
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    flex: 1,
    textAlign: 'left',
    marginRight: 10,
    fontSize: 17,
    // paddingTop: 20,
    paddingLeft: 2,
  },
});
