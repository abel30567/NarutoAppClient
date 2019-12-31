import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions
  } from 'react-native';
import ProfileRow from '../components/ProfileRow';
import AuthService from '../auth/AuthService';

const Auth = new AuthService();
/**
 * TO DO: Change user pictures with the ones below based on choice
 * 
 * User picture on profile taken with JWT so change to fetch self user route for picture data
 * 
 * "uploads/2019-04-05T02:05:03.915ZnarutoPic.png" 
 * "uploads/Hokage1.png"
 * "uploads/sasuke1.png"
 * "uploads/shika1.png"
 * "uploads/2019-04-05T02:09:34.373ZhinataPic.png"
 * "uploads/2019-04-05T02:09:50.767ZinoPic.png"
 * "uploads/2019-04-05T02:10:27.568ZkakashiPic.png"
 * "uploads/2019-04-05T02:11:12.250ZkarinPic.png"
 * "uploads/2019-04-05T02:11:35.581ZorochiPic.png"
 * "uploads/2019-04-05T02:12:04.481ZpainPic.png"
 * "uploads/2019-04-05T02:12:41.738ZsakuraPic.png"
 * "uploads/2019-04-05T02:13:01.592ZtobiPic.png"
 */
export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };
  constructor(props) {
    super(props);
    this.state = {
      rowOne: ["uploads/2019-04-05T02:05:03.915ZnarutoPic.png", "uploads/Hokage1.png", "uploads/sasuke1.png"],
      rowTwo: ["uploads/shika1.png", "uploads/2019-04-05T02:09:34.373ZhinataPic.png", "uploads/2019-04-05T02:09:50.767ZinoPic.png"],
      rowThree: ["uploads/2019-04-05T02:10:27.568ZkakashiPic.png", "uploads/2019-04-05T02:11:12.250ZkarinPic.png", "uploads/2019-04-05T02:11:35.581ZorochiPic.png"],
      rowFour: ["uploads/2019-04-05T02:12:04.481ZpainPic.png", "uploads/2019-04-05T02:12:41.738ZsakuraPic.png", "uploads/2019-04-05T02:13:01.592ZtobiPic.png"],
      rowFive: ["uploads/2019-11-02T02:11:27.707Zzabuza.png", "uploads/2019-11-02T02:12:11.710Zyamato.png","uploads/2019-11-02T02:12:48.220Zneji.png"],
      rowSix: ["uploads/2019-11-02T02:13:21.611Zlee.png","uploads/2019-11-02T02:13:39.461Zkakuzu.png","uploads/2019-11-02T02:14:05.264Zitachi.png"],
      rowSeven: ["uploads/2019-11-02T02:33:34.729Zboruto.png", "uploads/2019-11-02T02:34:07.861Zflash.png","uploads/2019-11-02T02:34:36.057Zsarada.png"],
      rowEight:["uploads/2019-11-02T02:45:13.017Zjiraiya.png","uploads/2019-11-02T15:28:54.804ZsageMode.png","uploads/2019-11-02T02:47:09.749ZsageFirst.png"]
    }
  }
  async logout() {
    await Auth.logout();
    this.props.navigation.navigate('Auth'); 
  }
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column'}}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headContainer}>
            <Text style={styles.textHead}>
              Choose your profile ninja
            </Text>
          </View>
          <View style={styles.imageRow}>
            {this.state.rowOne.map((card, index) => (
              <ProfileRow
              key={`r1-${index}`}
              image={card}
              navigation={this.props.navigation}
              />
            ))}
          </View>
          <View style={styles.imageRow}>
            {this.state.rowTwo.map((card, index) => (
              <ProfileRow
              key={`r2-${index}`}
              image={card}
              navigation={this.props.navigation}
              />
            ))}
          </View>
          <View style={styles.imageRow}>
            {this.state.rowThree.map((card, index) => (
              <ProfileRow
              key={`r3-${index}`}
              image={card}
              navigation={this.props.navigation}
              />
            ))}
          </View>
          <View style={styles.imageRow}>
            {this.state.rowFour.map((card, index) => (
              <ProfileRow
              key={`r4-${index}`}
              image={card}
              navigation={this.props.navigation}
              />
            ))}
          </View>
          <View style={styles.imageRow}>
            {this.state.rowFive.map((card, index) => (
              <ProfileRow
              key={`r5-${index}`}
              image={card}
              navigation={this.props.navigation}
              />
            ))}
          </View>
          <View style={styles.imageRow}>
            {this.state.rowSix.map((card, index) => (
              <ProfileRow
              key={`r6-${index}`}
              image={card}
              navigation={this.props.navigation}
              />
            ))}
          </View>
          <View style={styles.imageRow}>
            {this.state.rowSeven.map((card, index) => (
              <ProfileRow
              key={`r7-${index}`}
              image={card}
              navigation={this.props.navigation}
              />
            ))}
          </View>
          <View style={styles.imageRow}>
            {this.state.rowEight.map((card, index) => (
              <ProfileRow
              key={`r8-${index}`}
              image={card}
              navigation={this.props.navigation}
              />
            ))}
          </View>
          <View style={styles.lowerContainer}>
            <TouchableOpacity onPress={() => this.logout()} style={styles.logout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{textAlign: 'center'}}>© All Rights Reserved, Dattebayo Labs LLC 2019</Text>
          </View>
          <View>
            <Text style={{textAlign: 'center'}}>Version 1.2.4</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
if (Platform.OS == 'android') {
  
  if(Dimensions.get('window').height < 641) {
    
  }
  // Galaxy S10
  if(Dimensions.get('window').height > 1000) {
    
  }
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  imageRow: {
    flex: 1,
    flexDirection: 'row',
  },
  headContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textHead: {
    fontSize: 26,
    fontWeight: "400"
  },
  lowerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  logout: {
    backgroundColor: '#e05d24',
    flex: 1/3,
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 8,
    borderRadius: 5,
    height: 50
  },
  logoutText: {
    fontSize: 20,
    fontWeight: "500",
    color: 'white'
  }
});
