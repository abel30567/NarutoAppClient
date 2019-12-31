import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';


export default class FollowingListScreen extends React.Component {
  static navigationOptions = {
    title: 'FollowingList',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>FollowingList</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
