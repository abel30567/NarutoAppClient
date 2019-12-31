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


export default class FollowerListScreen extends React.Component {
  static navigationOptions = {
    title: 'FollowerList',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>FollowerList</Text>
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
