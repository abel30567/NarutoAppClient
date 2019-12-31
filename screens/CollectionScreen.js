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
  TouchableHighlight,
  Modal,
  Picker,
  View,
} from 'react-native';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { NavigationEvents } from 'react-navigation';

import MapCollectWant from '../components/MapCollectWant';
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

export default class CollectionScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'Collection',
  // };
  constructor(props) {
    super(props);
    this.state = { 
        selectCollection: 'black',
        selectWantList: '#a9a9a9',
        viewChoice: 'Collection',
        collection: [],
        wantList: [],
        pickerDisplayed: false,
        filter: 'Choose Filter'

    };
  }
  componentDidMount() {
    
  }
  setPickerValue(newValue) {
    this.setState({
      filter: newValue
    })

    this.togglePicker();
  }

  togglePicker() {
    this.setState({
      pickerDisplayed: !this.state.pickerDisplayed
    })
  }
  async getCards(filter) {
    const user = await Auth.getProfile();
    let _id = user._id
    Auth.fetch(`https://api.narutoccg.com/api/v1/users/${_id}`, {
      mode: 'cors',
      method: 'GET'
    })
    .then(res => {
      let sortArr = [];
      let collection = res.collection;
      if (filter == 'Value (High to low)') {
        collection.forEach(card => {
          let ownIndex = card.owned.findIndex((ownership => String(ownership.user) === String(_id)));
          sortArr.push({
            "value": card.owned[ownIndex].value,
            "_id": card._id
          });
        });
        sortArr.sort((a, b) => {
          return b.value - a.value;
        });
        let filterCollection = [];
        sortArr.forEach(order => {
          collection.forEach(card => {
            if (String(card._id) === String(order._id)) {
              filterCollection.push(card);
            }
          });
        });
        collection = filterCollection
      }
      if (filter == 'Value (Low to High)') {
        collection.forEach(card => {
          let ownIndex = card.owned.findIndex((ownership => String(ownership.user) === String(_id)));
          sortArr.push({
            "value": card.owned[ownIndex].value,
            "_id": card._id
          });
        });
        sortArr.sort((a, b) => {
          return b.value - a.value;
        });
        let filterCollection = [];
        sortArr.forEach(order => {
          collection.forEach(card => {
            if (String(card._id) === String(order._id)) {
              filterCollection.push(card);
            }
          });
        });
        collection = filterCollection.reverse();
      }
      if (filter == 'Ninjas') {
        let filterCollection = [];
        collection.forEach(card => {
          if (card.cardType === "Ninja") {
            filterCollection.push(card);
          }
        });
        collection = filterCollection
      }
      if (filter == 'Missions') {
        let filterCollection = [];
        collection.forEach(card => {
          if (card.cardType === "Mission") {
            filterCollection.push(card);
          }
        });
        collection = filterCollection
        
      }
      if (filter == 'Jutsus') {
        let filterCollection = [];
        collection.forEach(card => {
          if (card.cardType === "Jutsu") {
            filterCollection.push(card);
          }
        });
        collection = filterCollection
      }
      if (filter == 'Clients') {
        let filterCollection = [];
        collection.forEach(card => {
          if (card.cardType === "Client") {
            filterCollection.push(card);
          }
        });
        collection = filterCollection
        
      }
      
      let collection_ = [];
      let tempCollection = [];

      let collectionEnd = collection.length; // 7
      let remainingCollection = collectionEnd % 3; // 1, 2
      collection.map((card, index) => { // 6 is max
        tempCollection.push(card);
        if (tempCollection.length === 3) {
          collection_.push(tempCollection);
          tempCollection = [];
        }
      });
      if (remainingCollection === 2) {
        collection_.push([collection[collectionEnd - 2], collection[collectionEnd - 1]]);
      }
      if (remainingCollection === 1) {
        collection_.push([collection[collectionEnd - 1]]);
      }
      /**
       * 
       * 
       * WANT LIST LOGIC
       * 
       */    
      let wantList = res.wantList;
      if (filter == 'Value (High to low)') {
        wantList.forEach(card => {
          let ownIndex = card.wanted.findIndex((ownership => String(ownership.user) === String(_id)));
          sortArr.push({
            "value": card.wanted[ownIndex].value,
            "_id": card._id
          });
        });
        sortArr.sort((a, b) => {
          return b.value - a.value;
        });
        let filterCollection = [];
        sortArr.forEach(order => {
          wantList.forEach(card => {
            if (String(card._id) === String(order._id)) {
              filterCollection.push(card);
            }
          });
        });
        wantList = filterCollection
      }
      if (filter == 'Value (Low to High)') {
        wantList.forEach(card => {
          let ownIndex = card.wanted.findIndex((ownership => String(ownership.user) === String(_id)));
          sortArr.push({
            "value": card.wanted[ownIndex].value,
            "_id": card._id
          });
        });
        sortArr.sort((a, b) => {
          return b.value - a.value;
        });
        let filterCollection = [];
        sortArr.forEach(order => {
          wantList.forEach(card => {
            if (String(card._id) === String(order._id)) {
              filterCollection.push(card);
            }
          });
        });
        wantList = filterCollection.reverse();
      }
      if (filter == 'Ninjas') {
        let filterCollection = [];
        wantList.forEach(card => {
          if (card.cardType === "Ninja") {
            filterCollection.push(card);
          }
        });
        wantList = filterCollection
      }
      if (filter == 'Missions') {
        let filterCollection = [];
        wantList.forEach(card => {
          if (card.cardType === "Mission") {
            filterCollection.push(card);
          }
        });
        wantList = filterCollection
      }
      if (filter == 'Jutsus') {
        let filterCollection = [];
        wantList.forEach(card => {
          if (card.cardType === "Jutsu") {
            filterCollection.push(card);
          }
        });
        wantList = filterCollection
      }
      if (filter == 'Clients') {
        let filterCollection = [];
        wantList.forEach(card => {
          if (card.cardType === "Client") {
            filterCollection.push(card);
          }
        });
        wantList = filterCollection
      }
      let wantList_ = [];
      let tempWant = [];
      let wantListEnd = wantList.length; // 7
      let remainingWant = wantListEnd % 3; // 1, 2
      wantList.map((card, index) => { // 6 is max
        tempWant.push(card);
        if (tempWant.length === 3) {
          wantList_.push(tempWant);
          tempWant = [];
        }
      });
      if (remainingWant === 2) {
        wantList_.push([wantList[wantListEnd - 2], wantList[wantListEnd - 1]]);
      }
      if (remainingWant === 1) {
        wantList_.push([wantList[wantListEnd - 1]]);
      }
      this.setState({
        collection: collection_,
        wantList: wantList_
      })
    })
    .catch(err => {
      console.log(err);
    })
  } 
  toWantList() {
    this.setState({
      selectCollection: '#a9a9a9',
      selectWantList: 'black',
      viewChoice: 'Want List'
    });
  }
  toCollection() {
    this.setState({
      selectCollection: 'black',
      selectWantList: '#a9a9a9',
      viewChoice: 'Collection'
    })
  }
  emptyFunction() {
    // Required for image on load to handle a Parent component event 
   }
  toAdd() {
    this.props.navigation.navigate('Search');
  }
  render() {
    let iosPicker = (<Modal visible={this.state.pickerDisplayed} animationType={"slide"} transparent={true}>
        <TouchableWithoutFeedback
          onPressOut={() => this.togglePicker()}
        >
        <View style={{ margin: 0, padding: 20,
          backgroundColor: '#efefef',
          bottom: 0,
          left: 5,
          right: 5,
          alignItems: 'center',
          position: 'absolute' }}>
          <Text>Please pick a value</Text>
          <Picker
        style={{ backgroundColor: '#fafafa', position: 'absolute', bottom: 0, left: 0, right: 0 }}
        selectedValue={ this.state.filter }
        onValueChange={(itemValue, itemIndex) => this.setState({ filter: itemValue}, () => {
          this.togglePicker();
          this.getCards(this.state.filter)
        })}>
        <Picker.Item label="Choose Filter" value="Choose Filter" />
        <Picker.Item label="Value (High to low)" value="Value (High to low)" />
        <Picker.Item label="Value (Low to High)" value="Value (Low to High)" />
        <Picker.Item label="Ninjas" value="Ninjas" />
        <Picker.Item label="Missions" value="Missions" />
        <Picker.Item label="Jutsus" value="Jutsus" />
        <Picker.Item label="Clients" value="Clients" />
      </Picker> 
          
          <TouchableHighlight onPress={() => this.togglePicker()} style={{ paddingTop: 4, paddingBottom: 4, }}>
            <Text style={{ color: '#999' }}>Cancel</Text>
          </TouchableHighlight>
        </View>
        </TouchableWithoutFeedback>
      </Modal>);

    let iosPickButton = (<TouchableOpacity
      onPress={() => this.togglePicker()}
      style={styles.filterButton}>
        <Text style={styles.filterButtonText}>{this.state.filter}</Text>
      </TouchableOpacity>);

    let androidPicker = (<Picker
      style={{flex: 2/3, backgroundColor: '#fafafa', height: 35, marginRight: 20, borderRadius: 5 }}
      selectedValue={ this.state.filter }
      onValueChange={(itemValue, itemIndex) => this.setState({ filter: itemValue}, () => {
        this.togglePicker();
        this.getCards(this.state.filter)
      })}>
      <Picker.Item label="Choose Filter" value="Choose Filter" />
      <Picker.Item label="Value (High to low)" value="Value (High to low)" />
      <Picker.Item label="Value (Low to High)" value="Value (Low to High)" />
      <Picker.Item label="Ninjas" value="Ninjas" />
      <Picker.Item label="Missions" value="Missions" />
      <Picker.Item label="Jutsus" value="Jutsus" />
      <Picker.Item label="Clients" value="Clients" />
    </Picker>);
    let wantList = this.state.wantList.map((cardSet, index) => (
      <MapCollectWant
        key={index}
        cardRow={cardSet}
        handleLoad={() => this.emptyFunction()}
        navigation={this.props.navigation}
      />
    ))
    let collection = this.state.collection.map((cardSet, index) => (
      <MapCollectWant
        key={index}
        cardRow={cardSet}
        handleLoad={() => this.emptyFunction()}
        navigation={this.props.navigation}
      />
    ))
    return (
      <View style={{ flex: 1, flexDirection: 'column'}}>
        <NavigationEvents
          onWillFocus={() => this.getCards()}
        />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.addToContainer}>
            <TouchableOpacity onPress={() => this.toAdd()} style={styles.addToButton}>
              <Ionicons 
                name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
                size={26} 
                style={{marginBottom: -2, marginRight: 5 }}
                color='white'
              />
              <Text style={styles.innerAdd}>Add to {this.state.viewChoice}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filterContainer}>
            <View style={styles.filterTitleContainer}>
              <Text style={styles.filterTitle}>Sort By: </Text>
            </View>
            {Platform.OS == 'android' ? androidPicker : iosPickButton}
          </View>
          <View style={styles.selectContainer}>
            <TouchableOpacity 
              onPress={() => this.toCollection()}
              style={{
                flex: 1/2,
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 10,
                borderBottomWidth: 2,
                borderColor: this.state.selectCollection,
              }}>
              <Text 
              style={{
                color: this.state.selectCollection,
                fontSize: 22,
              }}>
              Collection
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => this.toWantList()}
              style={{
                flex: 1/2,
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 10,
                borderBottomWidth: 2,
                borderColor: this.state.selectWantList
              }}>  
              <Text 
              style={{
                color: this.state.selectWantList,
                fontSize: 22,
              }}>
              Want List
              </Text>
            </TouchableOpacity>
          </View>
          {this.state.viewChoice === 'Collection' ? collection : wantList}
        
        </ScrollView>
        {Platform.OS == 'android' ? <View></View> : iosPicker}
      </View>
    );
  }
}
let addToContainerHeight = resHeight('7%'); 
let selectontainerHeight = resHeight('7%');
let topMarginHeight = resHeight('2%');
let bottomMarginHeight = resHeight('0.2%');

if (PixelRatio.get() >= 2 && Dimensions.get('window').height > 736) {
  addToContainerHeight = resHeight('5.5%');
}
// iphone 5s
if (PixelRatio.get() == 2 && Dimensions.get('window').width < 325) {

  addToContainerHeight = resHeight('8%');
  selectontainerHeight = resHeight('8%');
}
if (Platform.OS == 'android') {
  // Alcatel one touch
  if(Dimensions.get('window').height < 641) {
    addToContainerHeight = resHeight('8%');
    selectontainerHeight = resHeight('8%');
  }
  // Galaxy S10
  if(Dimensions.get('window').height > 1000) {
    addToContainerHeight = resHeight('5%');
    selectontainerHeight = resHeight('5%');
  }
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    paddingTop: 5,
    backgroundColor: '#fff',
  },
  addToContainer: {
    height: addToContainerHeight,
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2, 
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  innerAdd: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  selectContainer: {
    height: selectontainerHeight,
    
    marginTop: topMarginHeight,
    marginBottom: bottomMarginHeight,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  filterContainer: {
    // flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    // backgroundColor: 'red',
    height: 35,
  },
  filterTitleContainer: {
    flex: 1/3,
    height: 35,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  filterTitle: {
    fontSize: 22,
    fontWeight: "400",
    textAlign: 'center'
  },
  filterButton: {
    flex: 2/3,
    height: 35,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#2f95dc',
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5
  },
  filterButtonText: {
    fontSize: 22,
    fontWeight: "500",
    color: 'white',
    textAlign: 'center'
  },
  filterText: {
    fontSize: 22,
    fontWeight: "500",
    color: 'black',
    textAlign: 'center'
  },
});
